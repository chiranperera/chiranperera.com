import { randomBytes } from "node:crypto";
import { and, eq, gte, lt, or, sql as dsql } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { availability, bookings } from "@/db/schema";

/**
 * Booking domain rules
 *
 * - Discovery calls are 30 minutes long.
 * - Slots are offered weekdays 10:00–16:00 in Asia/Colombo (UTC+05:30) —
 *   six slots per day: 10:00, 11:00, 13:00, 14:00, 15:00, 15:30.
 * - A slot is unavailable if any booking with status in (held, pending,
 *   confirmed) overlaps it, OR if any availability row marks the day as
 *   blocked.
 * - When a user picks a slot we create a `held` booking for 5 minutes
 *   while they fill in details. If they don't submit in time the hold
 *   expires (we just ignore it on subsequent availability checks).
 */
const TIMEZONE_OFFSET_MIN = 330; // Asia/Colombo: UTC+5:30
const SLOT_HOURS = [10, 11, 13, 14, 15] as const;
const SLOT_MINUTES_PAST = [0, 30] as const;
const HOLD_TTL_MS = 5 * 60 * 1000;

export const bookingSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  slotStart: z.string().datetime(),
  projectBrief: z.string().max(2000).optional(),
  turnstileToken: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export type AvailableSlot = { iso: string; hour: number; minute: number; label: string };
export type AvailableDay = { date: string; weekday: number; slots: AvailableSlot[] };

function toColombo(date: Date): { y: number; m: number; d: number; weekday: number } {
  const utcMs = date.getTime();
  const local = new Date(utcMs + TIMEZONE_OFFSET_MIN * 60_000);
  return {
    y: local.getUTCFullYear(),
    m: local.getUTCMonth(),
    d: local.getUTCDate(),
    weekday: local.getUTCDay(),
  };
}

function buildSlotDate(year: number, month: number, day: number, hour: number, minute: number): Date {
  // Construct the UTC instant that corresponds to a local Colombo wall-clock time.
  const utcMs = Date.UTC(year, month, day, hour, minute) - TIMEZONE_OFFSET_MIN * 60_000;
  return new Date(utcMs);
}

function fmtSlotLabel(hour: number, minute: number): string {
  const ampm = hour < 12 ? "am" : "pm";
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:${String(minute).padStart(2, "0")}${ampm}`;
}

function generateRawSlots(year: number, month: number): AvailableSlot[][] {
  // For each day in the month, return the raw candidate slot list (without availability check).
  const last = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const out: AvailableSlot[][] = [];
  for (let d = 1; d <= last; d++) {
    const probe = new Date(Date.UTC(year, month, d, 12));
    const local = toColombo(probe);
    if (local.weekday === 0 || local.weekday === 6) {
      out.push([]);
      continue;
    }
    const slots: AvailableSlot[] = [];
    for (const h of SLOT_HOURS) {
      for (const m of SLOT_MINUTES_PAST) {
        if (h === 15 && m === 0) continue; // 15:30 only
        const start = buildSlotDate(year, month, d, h, m);
        slots.push({ iso: start.toISOString(), hour: h, minute: m, label: fmtSlotLabel(h, m) });
      }
    }
    out.push(slots);
  }
  return out;
}

export async function getAvailableMonth(year: number, month: number): Promise<AvailableDay[]> {
  const days = generateRawSlots(year, month);
  const db = getDb();
  const monthStart = new Date(Date.UTC(year, month, 1));
  const monthEnd = new Date(Date.UTC(year, month + 1, 1));
  const now = new Date();

  let booked: Array<{ slotStart: Date; slotEnd: Date }> = [];
  let blocks: Array<{ dateStart: Date; dateEnd: Date }> = [];

  if (db) {
    const rows = await db
      .select({ slotStart: bookings.slotStart, slotEnd: bookings.slotEnd, status: bookings.status, holdExpiresAt: bookings.holdExpiresAt })
      .from(bookings)
      .where(
        and(
          gte(bookings.slotStart, monthStart),
          lt(bookings.slotStart, monthEnd),
          or(eq(bookings.status, "pending"), eq(bookings.status, "confirmed"), and(eq(bookings.status, "held"), dsql`${bookings.holdExpiresAt} > now()`)),
        ),
      );
    booked = rows.map((r) => ({ slotStart: new Date(r.slotStart), slotEnd: new Date(r.slotEnd) }));

    const blockRows = await db
      .select({ dateStart: availability.dateStart, dateEnd: availability.dateEnd })
      .from(availability)
      .where(and(gte(availability.dateStart, monthStart), lt(availability.dateStart, monthEnd)));
    blocks = blockRows.map((r) => ({ dateStart: new Date(r.dateStart), dateEnd: new Date(r.dateEnd) }));
  }

  const isBooked = (start: Date) =>
    booked.some((b) => b.slotStart <= start && b.slotEnd > start) ||
    blocks.some((b) => b.dateStart <= start && b.dateEnd > start);

  return days.map((slots, dayIdx) => {
    const dateMid = new Date(Date.UTC(year, month, dayIdx + 1, 12));
    const local = toColombo(dateMid);
    const filtered = slots.filter((s) => {
      const start = new Date(s.iso);
      if (start <= now) return false;
      return !isBooked(start);
    });
    return {
      date: `${local.y}-${String(local.m + 1).padStart(2, "0")}-${String(local.d).padStart(2, "0")}`,
      weekday: local.weekday,
      slots: filtered,
    };
  });
}

export type CreateBookingResult =
  | { ok: true; bookingId: number; icsToken: string }
  | { ok: false; status: number; message: string };

export async function createBooking(input: BookingInput): Promise<CreateBookingResult> {
  const db = getDb();
  if (!db) {
    console.info("[booking] DB skipped — no DATABASE_URL", { input });
    return { ok: false, status: 503, message: "Booking is temporarily unavailable. Please email hello@chiranperera.com." };
  }

  const slotStart = new Date(input.slotStart);
  if (Number.isNaN(slotStart.getTime())) {
    return { ok: false, status: 400, message: "Invalid slot." };
  }
  if (slotStart < new Date()) {
    return { ok: false, status: 400, message: "That slot has already passed." };
  }
  const slotEnd = new Date(slotStart.getTime() + 30 * 60_000);

  // Check the slot is still free.
  const conflict = await db
    .select({ id: bookings.id })
    .from(bookings)
    .where(
      and(
        eq(bookings.slotStart, slotStart),
        or(eq(bookings.status, "pending"), eq(bookings.status, "confirmed"), and(eq(bookings.status, "held"), dsql`${bookings.holdExpiresAt} > now()`)),
      ),
    )
    .limit(1);
  if (conflict.length) {
    return { ok: false, status: 409, message: "That slot was just taken — please pick another." };
  }

  const icsToken = randomBytes(24).toString("hex");

  const [row] = await db
    .insert(bookings)
    .values({
      name: input.name,
      email: input.email,
      slotStart,
      slotEnd,
      projectBrief: input.projectBrief ?? null,
      icsToken,
      status: "pending",
      holdExpiresAt: new Date(Date.now() + HOLD_TTL_MS),
    })
    .returning({ id: bookings.id });

  return { ok: true, bookingId: row.id, icsToken };
}
