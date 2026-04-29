import { NextResponse } from "next/server";
import { getAvailableMonth } from "@/lib/booking";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const yearStr = url.searchParams.get("year");
  const monthStr = url.searchParams.get("month"); // 1-indexed for caller convenience

  const now = new Date();
  const year = yearStr ? Number.parseInt(yearStr, 10) : now.getUTCFullYear();
  const month = monthStr ? Number.parseInt(monthStr, 10) - 1 : now.getUTCMonth();

  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 0 || month > 11) {
    return NextResponse.json({ message: "Invalid year/month." }, { status: 400 });
  }

  try {
    const days = await getAvailableMonth(year, month);
    return NextResponse.json({ year, month: month + 1, days });
  } catch (err) {
    console.error("[booking/availability] error", err);
    return NextResponse.json({ message: "Could not load availability." }, { status: 500 });
  }
}
