import { NextResponse } from "next/server";

/**
 * Inquiry intake (Phase 1 stub).
 *
 * Phase 3 replaces this with: validate → Turnstile check → insert into
 * `inquiries` + `audits` tables → trigger Resend admin notification.
 * For now we accept the payload, log to the server console so submissions
 * are visible during preview, and return success so the form UI works.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
  }

  const { url, name, email, industry, source } = body as Record<string, unknown>;

  if (
    typeof url !== "string" ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof industry !== "string"
  ) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json(
      { message: "URL must start with http:// or https://" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
  }

  console.info("[inquiry] received", {
    source: typeof source === "string" ? source : "unknown",
    url,
    name,
    email,
    industry,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
