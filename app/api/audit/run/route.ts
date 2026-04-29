import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit/runner";

export const maxDuration = 60;

export async function POST(req: Request) {
  let body: { auditId?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
  const auditId = Number(body.auditId);
  if (!Number.isFinite(auditId) || auditId <= 0) {
    return NextResponse.json({ message: "auditId is required" }, { status: 400 });
  }
  const result = await runAudit(auditId);
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }
  return NextResponse.json({ ok: true, score: result.score });
}
