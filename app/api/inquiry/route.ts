import { NextResponse } from "next/server";
import { createInquiry, inquirySchema } from "@/lib/inquiry";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { message: first?.message || "Invalid input.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;

  try {
    const result = await createInquiry(parsed.data, { ipAddress, userAgent });
    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }
    return NextResponse.json({
      ok: true,
      inquiryId: result.inquiryId,
      auditId: result.auditId,
    });
  } catch (err) {
    console.error("[inquiry] handler error", err);
    return NextResponse.json(
      { message: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }
}
