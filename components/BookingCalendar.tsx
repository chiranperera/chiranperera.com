"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

type Slot = { iso: string; hour: number; minute: number; label: string };
type Day = { date: string; weekday: number; slots: Slot[] };

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

function startOfMonth(year: number, month: number): { firstWeekday: number; daysInMonth: number } {
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return { firstWeekday, daysInMonth };
}

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; when: string };

export function BookingCalendar({ initialYear, initialMonth }: { initialYear: number; initialMonth: number }) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth); // 0-indexed
  const [days, setDays] = useState<Day[] | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [submit, setSubmit] = useState<SubmitState>({ kind: "idle" });

  const wantedKey = `${year}-${month}`;
  const loading = loadedKey !== wantedKey;

  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api/booking/availability?year=${year}&month=${month + 1}`, { signal: ac.signal })
      .then((r) => r.json())
      .then((data) => {
        startTransition(() => {
          setDays(data.days ?? []);
          setLoadedKey(`${year}-${month}`);
        });
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => ac.abort();
  }, [year, month]);

  const dayMap = useMemo(() => {
    const m = new Map<string, Day>();
    days?.forEach((d) => m.set(d.date, d));
    return m;
  }, [days]);

  const { firstWeekday, daysInMonth } = startOfMonth(year, month);
  const cells: Array<{ key: string; day?: number; date?: string; isOpen?: boolean; isPast?: boolean; isWeekend?: boolean; selected?: boolean }> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ key: `pad-${i}` });
  const todayIso = new Date().toISOString().slice(0, 10);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const day = dayMap.get(date);
    const probe = new Date(Date.UTC(year, month, d, 12));
    const weekday = probe.getUTCDay();
    cells.push({
      key: `d-${d}`,
      day: d,
      date,
      isOpen: (day?.slots?.length ?? 0) > 0,
      isPast: date < todayIso,
      isWeekend: weekday === 0 || weekday === 6,
      selected: date === selectedDate,
    });
  }

  const slots = selectedDate ? dayMap.get(selectedDate)?.slots ?? [] : [];

  function navigate(delta: number) {
    const next = new Date(Date.UTC(year, month + delta, 1));
    setYear(next.getUTCFullYear());
    setMonth(next.getUTCMonth());
    setSelectedDate(null);
    setSelectedSlot(null);
    setSubmit({ kind: "idle" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSlot) return;
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const projectBrief = String(data.get("brief") || "").trim();

    if (!name || !email) {
      setSubmit({ kind: "error", message: "Name and email are required." });
      return;
    }

    setSubmit({ kind: "submitting" });
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, projectBrief, slotStart: selectedSlot.iso }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Booking failed.");
      const when = new Date(selectedSlot.iso).toLocaleString("en-US", {
        timeZone: "Asia/Colombo",
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      });
      setSubmit({ kind: "success", when });
    } catch (err) {
      setSubmit({
        kind: "error",
        message: err instanceof Error ? err.message : "Booking failed — please try again.",
      });
    }
  }

  return (
    <div className="bcal">
      <div className="bcal-grid">
        <div className="bcal-cal">
          <div className="bcal-head">
            <button type="button" className="bcal-nav" onClick={() => navigate(-1)} aria-label="Previous month">
              ←
            </button>
            <div className="bcal-title">
              <strong>{MONTH_NAMES[month]}</strong> {year}
            </div>
            <button type="button" className="bcal-nav" onClick={() => navigate(1)} aria-label="Next month">
              →
            </button>
          </div>
          <div className="bcal-grid-days">
            {DAY_INITIALS.map((n, i) => (
              <div key={`hdr-${i}`} className="d-name">{n}</div>
            ))}
            {cells.map((c) =>
              c.day ? (
                <button
                  key={c.key}
                  type="button"
                  disabled={!c.isOpen || c.isPast || c.isWeekend}
                  onClick={() => {
                    setSelectedDate(c.date!);
                    setSelectedSlot(null);
                    setSubmit({ kind: "idle" });
                  }}
                  className={`bcal-day${c.selected ? " selected" : ""}${c.isOpen ? " open" : ""}${c.isPast ? " past" : ""}${c.isWeekend ? " weekend" : ""}`}
                >
                  {c.day}
                </button>
              ) : (
                <div key={c.key} className="d empty" aria-hidden="true">
                  ·
                </div>
              ),
            )}
          </div>
          {loading && <div className="bcal-loading">Loading availability…</div>}
        </div>

        <div className="bcal-side">
          {!selectedDate && <p className="bcal-hint">Pick a date with open slots (highlighted) to see times.</p>}
          {selectedDate && slots.length === 0 && (
            <p className="bcal-hint">No open slots on {selectedDate}. Pick another day.</p>
          )}
          {selectedDate && slots.length > 0 && !selectedSlot && (
            <>
              <h4 className="bcal-side-h">{new Date(selectedDate + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h4>
              <div className="bcal-slots">
                {slots.map((s) => (
                  <button key={s.iso} type="button" className="bcal-slot" onClick={() => setSelectedSlot(s)}>
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}
          {selectedSlot && submit.kind !== "success" && (
            <form className="bcal-form" onSubmit={onSubmit}>
              <h4 className="bcal-side-h">
                {new Date(selectedSlot.iso).toLocaleString("en-US", {
                  timeZone: "Asia/Colombo",
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </h4>
              <div className="field">
                <label htmlFor="bcal-name">Your name</label>
                <input id="bcal-name" name="name" type="text" required disabled={submit.kind === "submitting"} />
              </div>
              <div className="field">
                <label htmlFor="bcal-email">Your email</label>
                <input id="bcal-email" name="email" type="email" required disabled={submit.kind === "submitting"} />
              </div>
              <div className="field">
                <label htmlFor="bcal-brief">A line on the project (optional)</label>
                <textarea id="bcal-brief" name="brief" rows={3} disabled={submit.kind === "submitting"} />
              </div>
              {submit.kind === "error" && (
                <div className="bcal-error" role="alert">{submit.message}</div>
              )}
              <div className="bcal-form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedSlot(null)} disabled={submit.kind === "submitting"}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary glow" disabled={submit.kind === "submitting"}>
                  {submit.kind === "submitting" ? "Booking…" : "Book this slot"}
                </button>
              </div>
            </form>
          )}
          {submit.kind === "success" && (
            <div className="bcal-success">
              <div className="bcal-success-icon" aria-hidden="true">✓</div>
              <h4 className="bcal-side-h">Booking request received.</h4>
              <p>Your request for <strong>{submit.when}</strong> is in. I&apos;ll confirm by email within one business day. You&apos;ll find a tentative invite waiting in your inbox.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
