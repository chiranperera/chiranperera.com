import { createEvent, type EventAttributes } from "ics";
import { site } from "./site";

export type IcsArgs = {
  bookingId: number;
  name: string;
  email: string;
  slotStart: Date;
  projectBrief?: string | null;
};

/**
 * Generates an .ics calendar invite for a confirmed discovery call.
 * Returns null if the ics library fails (logged) so the booking flow
 * can still complete without the attachment.
 */
export function generateBookingIcs(args: IcsArgs): string | null {
  const start = args.slotStart;
  const end = new Date(start.getTime() + 30 * 60_000);

  const event: EventAttributes = {
    title: `Discovery call · ${args.name} ↔ ${site.name}`,
    description: [
      `Discovery call with ${args.name} (${args.email}).`,
      "",
      args.projectBrief ? `Brief: ${args.projectBrief}` : "No brief provided.",
      "",
      `Booking #${args.bookingId} · chiranperera.com`,
    ].join("\n"),
    start: [
      start.getUTCFullYear(),
      start.getUTCMonth() + 1,
      start.getUTCDate(),
      start.getUTCHours(),
      start.getUTCMinutes(),
    ],
    startInputType: "utc",
    end: [
      end.getUTCFullYear(),
      end.getUTCMonth() + 1,
      end.getUTCDate(),
      end.getUTCHours(),
      end.getUTCMinutes(),
    ],
    endInputType: "utc",
    organizer: { name: site.name, email: site.email },
    attendees: [
      { name: args.name, email: args.email, rsvp: true, partstat: "ACCEPTED", role: "REQ-PARTICIPANT" },
    ],
    location: "Online (link to follow)",
    status: "TENTATIVE",
    productId: "chiranperera.com/booking",
    uid: `booking-${args.bookingId}@chiranperera.com`,
  };

  const { error, value } = createEvent(event);
  if (error || !value) {
    console.error("[ics] failed to build invite", error);
    return null;
  }
  return value;
}
