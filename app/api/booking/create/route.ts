import { NextResponse } from "next/server";
import { adminBookingNotification, sendEmail, userBookingPending } from "@/lib/email";
import { bookingSchema, createBooking } from "@/lib/booking";
import { generateBookingIcs } from "@/lib/ics";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ message: first?.message || "Invalid input." }, { status: 400 });
  }

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const turnstile = await verifyTurnstile(parsed.data.turnstileToken, ipAddress);
  if (!turnstile.ok) {
    return NextResponse.json({ message: `Spam check failed: ${turnstile.reason}` }, { status: 400 });
  }

  const result = await createBooking(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  const slotStart = new Date(parsed.data.slotStart);
  const ics = generateBookingIcs({
    bookingId: result.bookingId,
    name: parsed.data.name,
    email: parsed.data.email,
    slotStart,
    projectBrief: parsed.data.projectBrief,
  });

  const adminMail = adminBookingNotification({
    bookingId: result.bookingId,
    name: parsed.data.name,
    email: parsed.data.email,
    slotStart,
    projectBrief: parsed.data.projectBrief,
  });
  const userMail = userBookingPending({
    name: parsed.data.name,
    slotStart,
    ics,
  });

  await Promise.allSettled([
    sendEmail({
      to: process.env.ADMIN_EMAIL ?? "chiran887@gmail.com",
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
      replyTo: parsed.data.email,
    }),
    sendEmail({
      to: parsed.data.email,
      subject: userMail.subject,
      html: userMail.html,
      text: userMail.text,
      attachments: ics
        ? [
            {
              filename: `discovery-call.ics`,
              content: Buffer.from(ics, "utf8").toString("base64"),
              contentType: "text/calendar",
            },
          ]
        : undefined,
    }),
  ]);

  return NextResponse.json({ ok: true, bookingId: result.bookingId });
}
