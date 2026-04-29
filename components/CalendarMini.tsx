type CalendarMiniProps = {
  year: number;
  month: number; // 0-indexed (Jan = 0)
  monthName: string;
  today: number; // day-of-month considered "today" for highlight; 0 = none
  booked: number[];
};

const DAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * Server-rendered marketing calendar matching the original `.cal-mini` design.
 * Phase 4 will replace this with an interactive booking calendar wired to
 * the `availability` table, but the visual stays identical.
 */
export function CalendarMini({ year, month, monthName, today, booked }: CalendarMiniProps) {
  const firstDay = new Date(year, month, 1).getDay();
  const last = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ key: string; text: string; cls: string }> = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push({ key: `pad-${i}`, text: "·", cls: "d empty" });
  }
  for (let d = 1; d <= last; d++) {
    const cls = ["d"];
    if (booked.includes(d)) cls.push("booked");
    else if (d >= today && today > 0) cls.push("open");
    if (today > 0 && d === today) cls.push("today");
    cells.push({ key: `d-${d}`, text: String(d), cls: cls.join(" ") });
  }

  return (
    <div className="cal">
      <div className="cal-head">
        <div className="cal-month">{monthName}</div>
        <div className="cal-year">{year}</div>
      </div>
      <div className="cal-days">
        {DAY_INITIALS.map((n, i) => (
          <div key={`hdr-${i}`} className="d-name">
            {n}
          </div>
        ))}
        {cells.map((c) =>
          c.cls.includes("empty") ? (
            <div key={c.key} className="d" style={{ color: "transparent" }}>
              ·
            </div>
          ) : (
            <div key={c.key} className={c.cls}>
              {c.text}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
