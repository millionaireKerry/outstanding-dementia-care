import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, Users, CheckCircle } from "lucide-react";

export type CourseOption = {
  key: string;
  label: string;
  price: string;
  stripeUrl: string;
  sessions: string[];
  people: string;
  description: string;
};

type Props = {
  courses: CourseOption[];
  /** Pre-select a course key (optional) */
  defaultCourse?: string;
};

// Dates that are available — stored as "YYYY-MM-DD"
// Kerry will update these; for now we seed a realistic set of future dates.
const AVAILABLE_DATES: string[] = [
  "2026-04-22", "2026-04-23",
  "2026-05-07", "2026-05-12", "2026-05-19", "2026-05-20",
  "2026-06-03", "2026-06-09", "2026-06-10", "2026-06-16", "2026-06-17", "2026-06-23",
  "2026-07-01", "2026-07-07", "2026-07-08", "2026-07-14", "2026-07-15",
  "2026-08-04", "2026-08-05", "2026-08-11", "2026-08-18",
  "2026-09-01", "2026-09-08", "2026-09-09", "2026-09-15", "2026-09-22",
];

function pad(n: number) { return n.toString().padStart(2, "0"); }
function toKey(y: number, m: number, d: number) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export default function BookingCalendar({ courses, defaultCourse }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>(defaultCourse ?? courses[0]?.key ?? "");

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const isAvailable = (d: number) => AVAILABLE_DATES.includes(toKey(viewYear, viewMonth, d));
  const isPast = (d: number) => {
    const dt = new Date(viewYear, viewMonth, d);
    dt.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return dt < t;
  };

  const activeCourse = courses.find(c => c.key === selectedCourse) ?? courses[0];

  const handleBook = () => {
    if (!activeCourse) return;
    window.open(activeCourse.stripeUrl, "_blank");
  };

  // Build calendar grid (leading empty cells + day cells)
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

      {/* ── Calendar ── */}
      <div className="bg-card border-4 border-charcoal rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-muted inline-block border border-border" /> Available</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary inline-block" /> Selected</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-muted/30 inline-block border border-muted" /> Unavailable</span>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 mb-2">
          {DAY_NAMES.map(d => (
            <div key={d} className="text-center text-xs font-bold text-muted-foreground py-1">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} />;
            const key = toKey(viewYear, viewMonth, day);
            const avail = isAvailable(day) && !isPast(day);
            const past = isPast(day);
            const selected = selectedDate === key;
            return (
              <button
                key={key}
                disabled={!avail}
                onClick={() => setSelectedDate(key)}
                className={[
                  "aspect-square rounded-lg text-sm font-semibold transition-all",
                  avail && !selected
                    ? "bg-muted hover:bg-primary/20 text-foreground border-2 border-border cursor-pointer"
                    : "",
                  selected
                    ? "bg-primary text-primary-foreground border-2 border-primary scale-105 shadow-md"
                    : "",
                  !avail
                    ? past
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : "bg-muted/20 text-muted-foreground/40 cursor-not-allowed"
                    : "",
                ].join(" ")}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Booking Panel ── */}
      <div className="flex flex-col gap-6">
        {/* Course selector */}
        <div className="bg-card border-4 border-charcoal rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Select Your Course
          </h3>
          <div className="space-y-3">
            {courses.map(course => (
              <button
                key={course.key}
                onClick={() => setSelectedCourse(course.key)}
                className={[
                  "w-full text-left rounded-xl border-2 p-4 transition-all",
                  selectedCourse === course.key
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 bg-background",
                ].join(" ")}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {course.label}
                  </span>
                  <span className="text-xl font-bold text-primary">{course.price}</span>
                </div>
                <p className="text-xs text-muted-foreground">{course.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Session times */}
        {activeCourse && (
          <div className="bg-card border-4 border-charcoal rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Session Times
            </h3>
            <div className="space-y-2 mb-4">
              {activeCourse.sessions.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Users className="h-4 w-4 text-primary shrink-0" />
                <span>{activeCourse.people}</span>
              </div>
            </div>

            {selectedDate ? (
              <div className="mb-4 p-3 bg-primary/10 border-2 border-primary rounded-xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <CheckCircle className="h-4 w-4" />
                  <span>
                    {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-GB", {
                      weekday: "long", day: "numeric", month: "long", year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-4 italic">← Select an available date from the calendar</p>
            )}

            <Button
              size="lg"
              className="w-full retro-button bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold"
              disabled={!selectedDate}
              onClick={handleBook}
            >
              Book & Pay — {activeCourse.price}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Secure payment via Stripe · Travel included · No hidden extras
            </p>
          </div>
        )}

        {/* Legend note */}
        <div className="text-xs text-muted-foreground bg-muted/30 rounded-xl p-3 border border-border">
          <strong>Note:</strong> Dates shown are indicative availability. Once payment is confirmed, Kerry will contact you within 24 hours to confirm your booking details and send your joining instructions.
        </div>
      </div>
    </div>
  );
}
