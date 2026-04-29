import { Resend } from "resend";
import { site } from "./site";

export type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

let client: Resend | null = null;

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

function getClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export async function sendEmail(args: SendArgs): Promise<{ id: string } | null> {
  const c = getClient();
  if (!c) {
    console.info("[email] skipped — RESEND_API_KEY not configured", { to: args.to, subject: args.subject });
    return null;
  }
  const from = process.env.RESEND_FROM_EMAIL ?? `noreply@${site.domain}`;
  const { data, error } = await c.emails.send({
    from: `${site.name} <${from}>`,
    to: args.to,
    subject: args.subject,
    html: args.html,
    text: args.text,
    replyTo: args.replyTo,
  });
  if (error) {
    console.error("[email] send failed", error);
    throw new Error(error.message || "Failed to send email");
  }
  return data ? { id: data.id } : null;
}

/* ────────── Templates ────────── */

export function adminInquiryNotification(payload: {
  name: string;
  email: string;
  url: string;
  industry: string;
  message?: string | null;
  inquiryId: number | string;
}) {
  const { name, email, url, industry, message, inquiryId } = payload;
  const subject = `New audit request — ${name} (${industry})`;
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 8px">New audit request</h2>
      <p style="margin:0 0 16px;color:#475569">Inquiry <strong>#${inquiryId}</strong></p>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:6px 0;color:#475569">Name</td><td style="padding:6px 0"><strong>${escape(name)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#475569">Email</td><td style="padding:6px 0"><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#475569">URL</td><td style="padding:6px 0"><a href="${escape(url)}" target="_blank" rel="noreferrer">${escape(url)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#475569">Industry</td><td style="padding:6px 0">${escape(industry)}</td></tr>
        ${message ? `<tr><td style="padding:6px 0;color:#475569;vertical-align:top">Message</td><td style="padding:6px 0;white-space:pre-wrap">${escape(message)}</td></tr>` : ""}
      </table>
      <p style="margin-top:24px"><a href="${site.url}/admin/inquiries/${inquiryId}" style="color:#7700ff;text-decoration:none;font-weight:600">Open in admin →</a></p>
    </div>
  `;
  return { subject, html, text: `New audit request from ${name} (${email}) for ${url}. Industry: ${industry}.` };
}

export function userInquiryConfirmation(payload: { name: string; url: string }) {
  const firstName = payload.name.split(" ")[0] || payload.name;
  const subject = `Your AI search audit is queued — ${payload.url}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 8px">Audit on the way, ${escape(firstName)}.</h2>
      <p>Thanks for the request. Your audit for <strong>${escape(payload.url)}</strong> is in the queue.</p>
      <p>Expect a branded PDF in your inbox within <strong>48 hours</strong>. No follow-up sales call, no newsletter — just the audit and the prioritized fixes.</p>
      <p style="color:#475569;margin-top:24px">— Chiran<br/><a href="${site.url}" style="color:#7700ff;text-decoration:none">${site.url}</a></p>
    </div>
  `;
  return { subject, html, text: `Audit on the way, ${firstName}. Your audit for ${payload.url} is queued. Expect a branded PDF within 48 hours.` };
}

function escape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
