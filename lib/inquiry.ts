import { z } from "zod";
import { getDb } from "@/db";
import { audits, inquiries } from "@/db/schema";
import { adminInquiryNotification, sendEmail, userInquiryConfirmation } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

export const inquirySchema = z.object({
  url: z.string().url("URL must be a valid http(s) URL"),
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address").max(320),
  industry: z.string().min(1, "Industry is required").max(80),
  message: z.string().max(2000).optional().nullable(),
  source: z.string().max(32).default("audit"),
  turnstileToken: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryResult =
  | { ok: true; inquiryId: number | null; auditId: number | null }
  | { ok: false; status: number; message: string };

/**
 * Create an inquiry + paired audit row, then notify Chiran and ack the user.
 *
 * Each external system (DB, email, Turnstile) is optional and degrades to
 * a no-op when its env vars aren't set. That keeps preview environments
 * working before Phase 7 plumbs all the credentials.
 */
export async function createInquiry(
  input: InquiryInput,
  meta: { ipAddress?: string | null; userAgent?: string | null } = {},
): Promise<InquiryResult> {
  const turnstile = await verifyTurnstile(input.turnstileToken, meta.ipAddress);
  if (!turnstile.ok) {
    return { ok: false, status: 400, message: `Spam check failed: ${turnstile.reason}` };
  }

  const db = getDb();
  let inquiryId: number | null = null;
  let auditId: number | null = null;

  if (db) {
    const [inquiry] = await db
      .insert(inquiries)
      .values({
        source: input.source,
        name: input.name,
        email: input.email,
        url: input.url,
        industry: input.industry,
        message: input.message ?? null,
        ipAddress: meta.ipAddress ?? null,
        userAgent: meta.userAgent ?? null,
      })
      .returning({ id: inquiries.id });
    inquiryId = inquiry.id;

    if (input.source === "audit") {
      const [audit] = await db
        .insert(audits)
        .values({ inquiryId: inquiry.id, targetUrl: input.url })
        .returning({ id: audits.id });
      auditId = audit.id;
    }
  } else {
    console.info("[inquiry] DB skipped (no DATABASE_URL)", { input: { ...input, turnstileToken: undefined } });
  }

  // Fire-and-forget the two emails. Errors are logged but don't fail the request,
  // so the user always sees a success state if their data was captured.
  const adminMail = adminInquiryNotification({
    name: input.name,
    email: input.email,
    url: input.url,
    industry: input.industry,
    message: input.message,
    inquiryId: inquiryId ?? "(no DB)",
  });
  const userMail = userInquiryConfirmation({ name: input.name, url: input.url });

  await Promise.allSettled([
    sendEmail({
      to: process.env.ADMIN_EMAIL ?? "chiran887@gmail.com",
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
      replyTo: input.email,
    }),
    sendEmail({
      to: input.email,
      subject: userMail.subject,
      html: userMail.html,
      text: userMail.text,
    }),
  ]);

  return { ok: true, inquiryId, auditId };
}
