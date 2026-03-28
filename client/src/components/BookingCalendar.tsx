import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, Users, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export type CourseOption = {
  key: string;
  label: string;
  price: string;
  /** Stripe product key matching the enum in routers.ts */
  productKey: "familyWorkshop" | "dementiaExperience" | "excellenceProgramme";
  sessions: string[];
  people: string;
  description: string;
};

type Props = {
  courses: CourseOption[];
  /** Pre-select a course key (optional) */
  defaultCourse?: string;
};

// ─── Static availability ──────────────────────────────────────────────────────
// April 2026: Mon–Sat. Sold out (static): 3rd, 6th, 11th.
// May 2026:   Mon–Sat. Bank holidays unavailable: 4th, 25th.
// DB-booked dates are merged in at runtime via trpc.booking.getBookedDates.

const STATIC_AVAILABLE_DATES: string[] = [
  // April
  "2026-04-01", "2026-04-02",
  "2026-04-04",
  "2026-04-07", "2026-04-08", "2026-04-09", "2026-04-10",
  "2026-04-13", "2026-04-14", "2026-04-15", "2026-04-16", "2026-04-17", "2026-04-18",
  "2026-04-20", "2026-04-21", "2026-04-22", "2026-04-23", "2026-04-24", "2026-04-25",
  "2026-04-27", "2026-04-28", "2026-04-29", "2026-04-30",
  // May
  "2026-05-01", "2026-05-02",
  "2026-05-05", "2026-05-06", "2026-05-07", "2026-05-08", "2026-05-09",
  "2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15", "2026-05-16",
  "2026-05-18", "2026-05-19", "2026-05-20", "2026-05-21", "2026-05-22", "2026-05-23",
  "2026-05-26", "2026-05-27", "2026-05-28", "2026-05-29", "2026-05-30",
];

// Pre-sold dates (static — Kerry confirmed these are already taken)
const STATIC_SOLD_OUT: string[] = [
  "2026-04-03", "2026-04-06", "2026-04-11",
];

// Bank holidays — unavailable
const UNAVAILABLE_DATES: string[] = [
  "2026-05-04", "2026-05-25",
];

// Family webinar dates — shown with a gold dot
const WEBINAR_DATES: string[] = [
  "2026-04-11", "2026-05-09",
];

function pad(n: number) { return n.toString().padStart(2, "0"); }
function toKey(y: number, m: number, d: number) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export default function BookingCalendar({ courses, defaultCourse }: Props) {
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(3); // April = index 3
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>(defaultCourse ?? courses[0]?.key ?? "");

  // Fetch live booked dates from DB
  const { data: dbBookedDates = [] } = trpc.booking.getBookedDates.useQuery(undefined, {
    staleTime: 60_000, // re-fetch every 60s
  });

  // Merge static sold-out + DB-booked dates
  const allSoldOut = [...STATIC_SOLD_OUT, ...dbBookedDates];

  const createCheckout = trpc.payments.createCheckout.useMutation({
    onSuccess: (data) => {
      window.open(data.url, "_blank");
    },
    onError: (err) => {
      toast.error(`Booking error: ${err.message}`);
    },
  });

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

  const isPast = (d: number) => {
    const dt = new Date(viewYear, viewMonth, d);
    dt.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return dt < t;
  };
  const isAvailable = (d: number) => {
    const key = toKey(viewYear, viewMonth, d);
    return STATIC_AVAILABLE_DATES.includes(key) && !allSoldOut.includes(key) && !isPast(d);
  };
  const isSoldOut = (d: number) => allSoldOut.includes(toKey(viewYear, viewMonth, d));
  const isUnavailable = (d: number) => UNAVAILABLE_DATES.includes(toKey(viewYear, viewMonth, d));
  const isWebinar = (d: number) => WEBINAR_DATES.includes(toKey(viewYear, viewMonth, d));

  const activeCourse = courses.find(c => c.key === selectedCourse) ?? courses[0];

  const handleBook = () => {
    if (!activeCourse || !selectedDate) return;
    createCheckout.mutate({
      productKey: activeCourse.productKey,
      origin: window.location.origin,
      bookingDate: selectedDate,
      courseKey: activeCourse.key,
    });
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

      {/* ── Calendar ── */}
      <div className="bg-card border-4 border-charcoal rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Previous month">
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Next month">
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-muted inline-block border border-border" /> Available</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary inline-block" /> Selected</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-200 inline-block border border-red-300" /> Sold out</span>
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
            const avail = isAvailable(day);
            const soldOut = isSoldOut(day);
            const unavail = isUnavailable(day);
            const past = isPast(day);
            const webinar = isWebinar(day);
            const selected = selectedDate === key;

            let cellClass = "aspect-square rounded-lg text-sm font-semibold transition-all flex flex-col items-center justify-center relative";

            if (selected) {
              cellClass += " bg-primary text-primary-foreground border-2 border-primary scale-105 shadow-md";
            } else if (avail) {
              cellClass += " bg-muted hover:bg-primary/20 text-foreground border-2 border-border cursor-pointer";
            } else if (soldOut) {
              cellClass += " bg-red-100 text-red-400 border border-red-200 cursor-not-allowed";
            } else if (unavail) {
              cellClass += " bg-amber-50 text-amber-400 border border-amber-200 cursor-not-allowed";
            } else if (past) {
              cellClass += " text-muted-foreground/30 cursor-not-allowed";
            } else {
              cellClass += " bg-muted/20 text-muted-foreground/40 cursor-not-allowed";
            }

            return (
              <button
                key={key}
                disabled={!avail}
                onClick={() => setSelectedDate(key)}
                className={cellClass}
                title={
                  soldOut ? "Sold out" :
                  unavail ? "Bank holiday — unavailable" :
                  avail ? "Available — click to select" : ""
                }
              >
                <span>{day}</span>
                {soldOut && <span className="text-[8px] leading-none text-red-400 font-bold">FULL</span>}
                {unavail && <span className="text-[8px] leading-none text-amber-500 font-bold">B/H</span>}
                {webinar && avail && (
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#bc9c2f]" title="Family webinar day" />
                )}
              </button>
            );
          })}
        </div>

        {(viewMonth === 3 || viewMonth === 4) && (
          <p className="text-xs text-muted-foreground mt-3 text-center">
            <span className="inline-block w-2 h-2 rounded-full bg-[#bc9c2f] mr-1 align-middle" />
            Gold dot = Family Webinar day (book separately at £25)
          </p>
        )}
      </div>

      {/* ── Booking Panel ── */}
      <div className="flex flex-col gap-6">
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
              disabled={!selectedDate || createCheckout.isPending}
              onClick={handleBook}
            >
              {createCheckout.isPending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting to payment…</>
              ) : (
                <>Book & Pay — {activeCourse.price}</>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Secure payment via Stripe · Travel included · No hidden extras
            </p>
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-muted/30 rounded-xl p-3 border border-border space-y-1">
          <p><strong>One booking per day</strong> — any course can be booked on any available date.</p>
          <p>Once payment is confirmed, Kerry will contact you within 24 hours with your booking details and joining instructions.</p>
          <p className="flex items-center gap-1">
            <XCircle className="h-3 w-3 text-red-400 shrink-0" />
            <span><strong>FULL</strong> = sold out · <strong>B/H</strong> = bank holiday</span>
          </p>
        </div>
      </div>
    </div>
  );
}
