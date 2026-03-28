import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Clock,
  Users,
  Heart,
  CheckCircle,
  Calendar,
  Star,
  MessageCircle,
  BookOpen,
  Shield,
  Building2,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import BookingCalendar, { type CourseOption } from "@/components/BookingCalendar";

const CARE_HOME_COURSES: CourseOption[] = [
  {
    key: "workshop",
    label: "The Dementia Workshop — Full Day",
    price: "£650",
    stripeUrl: "https://buy.stripe.com/eVq6oJ3CPgT995mfSdg7e01",
    sessions: [
      "9:00am – 4:15pm (full day)",
      "On-site at your care home",
    ],
    people: "Up to 10 participants",
    description: "Full-day training for care home teams. Includes simulation experience. New customers: 50% off with code NEWCLIENT.",
  },
  {
    key: "experience-half",
    label: "The Dementia Experience — Half Day",
    price: "£595",
    stripeUrl: "https://buy.stripe.com/00w3cxflx0Ub81iaxTg7e03",
    sessions: [
      "Session 1: 10:00am – 11:30am (10 people)",
      "Session 2: 11:30am – 1:00pm (10 people)",
    ],
    people: "2 sessions × 10 people = 20 participants",
    description: "Interactive simulation experience + debrief only. 2 × 90-min sessions. All travel included.",
  },
  {
    key: "experience-full",
    label: "The Dementia Experience — Full Day",
    price: "£895",
    stripeUrl: "https://buy.stripe.com/3cI4gB7T5eL181ieO9g7e02",
    sessions: [
      "Session 1: 10:00am – 11:30am (10 people)",
      "Session 2: 11:30am – 1:00pm (10 people)",
      "Session 3: 1:30pm – 3:00pm (10 people)",
      "Session 4: 3:00pm – 4:30pm (10 people)",
    ],
    people: "4 sessions × 10 people = 40 participants",
    description: "Full day. 4 × 90-min sessions. Up to 40 participants. All travel included.",
  },
];

const WORKSHOP_AGENDA = [
  {
    time: "09:00 – 09:45",
    title: "Introduction to Dementia",
    desc: "An engaging introduction to the different types of dementia, including Alzheimer's, Lewy Body, Vascular, and more. We explore the neurobiology of dementia in accessible terms: what is happening in the brain, how it progresses, and crucially, what this means from the resident's perspective. We also address common myths and stigma that can affect the quality of care.",
    color: "#e0f5f1",
    border: "#2C5F4F",
  },
  {
    time: "09:45 – 10:45",
    title: "Life History & Identity",
    desc: "A person's identity does not disappear with dementia — it becomes more important than ever. This session explores the power of life history work, how to gather and use personal stories to deliver truly person-centred care, and practical tools your team can use straight away.",
    color: "#fef3e2",
    border: "#bc9c2f",
  },
  {
    time: "10:45 – 11:00",
    title: "Break",
    desc: "Refreshment break.",
    color: "#f5f0e8",
    border: "#aaa",
  },
  {
    time: "11:00 – 12:00",
    title: "Communication & Behaviour",
    desc: "Why do people with dementia behave the way they do? This session unpacks the most common and challenging behaviours — including agitation, repetition, and refusal of care — and reframes them as communication. Staff leave with practical strategies to reduce distress and improve daily interactions.",
    color: "#e0f5f1",
    border: "#2C5F4F",
  },
  {
    time: "12:00 – 13:00",
    title: "Lunch Break",
    desc: "Lunch break.",
    color: "#f5f0e8",
    border: "#aaa",
  },
  {
    time: "13:00 – 14:00",
    title: "The Dementia Experience — Simulation",
    desc: "The centrepiece of the day. Staff take part in an immersive, multi-sensory simulation that puts them in the shoes of someone living with dementia. This powerful experience builds empathy and insight that no classroom session can replicate. Up to 10 participants per session.",
    color: "#fef3e2",
    border: "#bc9c2f",
  },
  {
    time: "14:00 – 14:45",
    title: "Debrief & Reflection",
    desc: "A structured debrief following the simulation. Staff process their experience, share reflections, and connect what they felt to the daily reality of the people they care for. This is where the real learning happens.",
    color: "#e0f5f1",
    border: "#2C5F4F",
  },
  {
    time: "14:45 – 15:00",
    title: "Break",
    desc: "Refreshment break.",
    color: "#f5f0e8",
    border: "#aaa",
  },
  {
    time: "15:00 – 16:00",
    title: "Person-Centred Care in Practice",
    desc: "Bringing everything together. This session translates the day's learning into practical, actionable care approaches. We cover care planning, meaningful activity, end-of-life considerations, and how to embed a culture of compassionate, person-centred care across your whole team.",
    color: "#fef3e2",
    border: "#bc9c2f",
  },
  {
    time: "16:00 – 16:15",
    title: "Q&A & Close",
    desc: "Open Q&A, key takeaways, and next steps. Every participant receives a certificate of attendance.",
    color: "#e0f5f1",
    border: "#2C5F4F",
  },
];

export default function FamilyWorkshop() {
  const [location] = useLocation();
  const [showAgenda, setShowAgenda] = useState(false);

  const STRIPE_WEBINAR = "https://buy.stripe.com/dRm14pc9lcCT5Ta5dzg7e04";
  const STRIPE_WORKSHOP = "https://buy.stripe.com/eVq6oJ3CPgT995mfSdg7e01";
  const WEBINAR_CALENDAR_URL = "https://calendar.app.google/r1FrZpnQRMx9q6N57";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("booked") === "true") {
      toast.success("Booking confirmed!", {
        description: "Thank you for booking. Check your email for your Zoom link.",
      });
    }
    if (params.get("cancelled") === "true") {
      toast.error("Booking cancelled", {
        description: "No payment was taken. You can book again anytime.",
      });
    }
  }, [location]);

  useEffect(() => {
    document.title = "The Dementia Workshop | Outstanding Dementia Care";
    return () => { document.title = "Outstanding Dementia Care - Resources for Carers"; };
  }, []);

  const webinarTopics = [
    "What dementia actually is — and what it isn't",
    "Why your loved one behaves the way they do",
    "How to communicate without causing distress",
    "Practical tips for the most common daily challenges",
    "What to expect as dementia progresses",
    "How to look after yourself as a carer",
    "Where to find help and what support is available",
    "Your questions answered live",
  ];

  const testimonials = [
    {
      quote: "I wish I had found this years ago. Kerry explained things in a way that finally made sense of what my mum was going through.",
      name: "Sarah, daughter of a resident",
    },
    {
      quote: "I felt so alone before this session. Knowing there are other families going through the same thing made such a difference.",
      name: "David, husband and carer",
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: FAMILY WEBINAR (£25)
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2C5F4F 0%, #1a3d32 60%, #bc9c2f 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container relative z-10 text-center">
          <Badge
            className="mb-4 text-sm px-4 py-1 font-semibold"
            style={{ backgroundColor: "#bc9c2f", color: "#fff", fontFamily: "Playfair Display, serif" }}
          >
            📅 Next Session: Friday 11th April 2026 · 10:00am–11:30am
          </Badge>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video size={44} className="text-[#E8DCC4]" />
            <h1
              className="text-4xl md:text-6xl font-bold text-[#E8DCC4]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              The Dementia Workshop
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[#E8DCC4]/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            A warm, honest 90-minute Zoom session for families and carers navigating
            dementia — led by Kerry Goodearl, dementia specialist with 10 years'
            experience and a Masters in Dementia (completing summer 2026).
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Clock size={18} />
              <span className="font-semibold">90 minutes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Video size={18} />
              <span className="font-semibold">Live on Zoom</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Users size={18} />
              <span className="font-semibold">Small groups</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Heart size={18} />
              <span className="font-semibold">Just £25 per person</span>
            </div>
          </div>
          <Button
            onClick={() => window.open(STRIPE_WEBINAR, "_blank")}
            size="lg"
            className="text-lg px-10 py-6 font-bold rounded-full shadow-xl transition-transform hover:scale-105"
            style={{
              backgroundColor: "#bc9c2f",
              color: "#fff",
              fontFamily: "Playfair Display, serif",
            }}
          >
            <Calendar className="mr-2" size={22} />
            Book Your Place — £25
          </Button>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <p className="text-[#E8DCC4]/70 text-sm">
              Friday 11th April 2026 · 10:00am–11:30am · Zoom · Limited places
            </p>
            <button
              onClick={() => window.open(WEBINAR_CALENDAR_URL, "_blank")}
              className="text-[#E8DCC4]/80 text-sm underline hover:text-[#E8DCC4] transition-colors"
            >
              📅 Add to Google Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Webinar content */}
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-5 text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            You shouldn't have to figure this out alone
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When someone you love is diagnosed with dementia, it can feel
            overwhelming, frightening, and isolating. You're suddenly expected
            to understand a complex condition, manage challenging behaviour, and
            keep going — often with very little support or explanation.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            This workshop exists to change that. In 90 minutes, you'll get
            clear, compassionate answers to the questions that keep you up at
            night — from someone who has spent a decade working alongside people
            living with dementia and their families.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3
              className="text-2xl font-bold mb-6 text-[#2C5F4F]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              What we cover in the session
            </h3>
            <div className="space-y-3">
              {webinarTopics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#2C5F4F] mt-0.5 shrink-0" />
                  <span className="text-base">{topic}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3
              className="text-2xl font-bold mb-6 text-[#2C5F4F]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Who is this for?
            </h3>
            <div className="space-y-3 mb-8">
              {[
                "Adult children caring for a parent with dementia",
                "Spouses and partners of someone newly diagnosed",
                "Family members who live far away and feel helpless",
                "Anyone who wants to understand dementia better",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Heart size={20} className="text-[#bc9c2f] mt-0.5 shrink-0" />
                  <span className="text-base">{item}</span>
                </div>
              ))}
            </div>
            {/* Webinar price card */}
            <Card className="retro-border bg-[#2C5F4F] text-white">
              <CardContent className="p-6 text-center">
                <p className="text-[#E8DCC4] text-sm font-semibold uppercase tracking-widest mb-1">
                  Online Webinar · Zoom
                </p>
                <p
                  className="text-6xl font-bold text-[#E8DCC4] mb-1"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  £25
                </p>
                <p className="text-[#E8DCC4]/80 text-sm mb-2">
                  90 minutes · Live on Zoom · Small groups
                </p>
                <p className="text-[#bc9c2f] text-sm font-bold mb-4">
                  📅 Next session: Friday 11th April 2026
                </p>
                <Button
                  onClick={() => window.open(STRIPE_WEBINAR, "_blank")}
                  className="w-full font-bold text-base"
                  style={{ backgroundColor: "#bc9c2f", color: "#fff" }}
                >
                  <Calendar className="mr-2" size={18} />Book Now — £25
                </Button>
                <p className="text-[#E8DCC4]/60 text-xs mt-3">
                  Powered by Stripe · Secure checkout
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What to expect */}
        <div className="bg-[#F5F0E8] rounded-2xl p-10 mb-16 retro-border">
          <h3
            className="text-2xl font-bold mb-8 text-center text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            What to expect on the day
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen size={28} className="text-[#2C5F4F]" />,
                title: "Clear, jargon-free knowledge",
                desc: "Kerry explains dementia in plain English — no medical textbooks, just real, practical understanding.",
              },
              {
                icon: <MessageCircle size={28} className="text-[#bc9c2f]" />,
                title: "Live Q&A",
                desc: "Bring your questions. Every session ends with open Q&A time so you can ask about your specific situation.",
              },
              {
                icon: <Shield size={28} className="text-[#2C5F4F]" />,
                title: "A safe, supportive space",
                desc: "Small groups only. This is a warm, non-judgmental environment where you can speak honestly.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h4 className="font-bold text-[#2C5F4F] mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold mb-8 text-center text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            What families say
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="retro-border">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={16} className="text-[#bc9c2f] fill-[#bc9c2f]" />
                    ))}
                  </div>
                  <p className="text-base italic text-muted-foreground mb-4">
                    "{t.quote}"
                  </p>
                  <p className="font-semibold text-sm text-[#2C5F4F]">
                    — {t.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About Kerry */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3
            className="text-2xl font-bold mb-4 text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            About your host
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Kerry Goodearl has worked in dementia care for over 10 years and is
            completing a Masters in Dementia. She is the founder of Outstanding
            Dementia Care and creator of the Dementia Experience — an immersive
            training day used by care homes across the UK. Kerry is passionate
            about giving families the knowledge and confidence they need to
            support their loved ones with dignity and compassion.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: CARE HOME WORKSHOP (£650)
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className="py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a3d32 0%, #2C5F4F 60%, #3a7a65 100%)",
        }}
      >
        <div className="container text-center">
          <Badge
            className="mb-4 text-sm px-4 py-1 font-semibold"
            style={{ backgroundColor: "#bc9c2f", color: "#fff", fontFamily: "Playfair Display, serif" }}
          >
            🏥 For Care Homes & Professional Teams
          </Badge>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 size={44} className="text-[#E8DCC4]" />
            <h2
              className="text-4xl md:text-5xl font-bold text-[#E8DCC4]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Care Home Workshop
            </h2>
          </div>
          <p className="text-xl text-[#E8DCC4]/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            A full-day, on-site training experience for your care team — combining
            expert dementia education with Kerry's immersive simulation experience.
            Mapped to the Dementia Training Standards Framework (2026).
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Clock size={18} />
              <span className="font-semibold">9:00am – 4:15pm</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Building2 size={18} />
              <span className="font-semibold">On-site at your care home</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Users size={18} />
              <span className="font-semibold">Up to 10 participants</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Heart size={18} />
              <span className="font-semibold">Just £650 · Travel included</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => window.open(STRIPE_WORKSHOP, "_blank")}
              size="lg"
              className="text-lg px-10 py-6 font-bold rounded-full shadow-xl transition-transform hover:scale-105"
              style={{
                backgroundColor: "#bc9c2f",
                color: "#fff",
                fontFamily: "Playfair Display, serif",
              }}
            >
              <Calendar className="mr-2" size={22} />
              Book Now — £650
            </Button>
            <button
              onClick={() => setShowAgenda(!showAgenda)}
              className="flex items-center gap-2 text-[#E8DCC4]/80 text-base underline hover:text-[#E8DCC4] transition-colors"
            >
              <ChevronDown size={18} className={`transition-transform ${showAgenda ? "rotate-180" : ""}`} />
              {showAgenda ? "Hide full agenda" : "View full agenda"}
            </button>
          </div>
          <p className="text-[#E8DCC4]/60 text-sm mt-4">
            🎉 New customers: 50% off with code NEWCLIENT · Powered by Stripe · Secure checkout
          </p>
        </div>
      </div>

      {/* Full-Day Agenda (collapsible) */}
      {showAgenda && (
        <div className="bg-[#F5F0E8] py-16">
          <div className="container max-w-3xl">
            <h3
              className="text-3xl font-bold mb-2 text-center text-[#2C5F4F]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Full-Day Agenda
            </h3>
            <p className="text-center text-muted-foreground mb-10">
              9:00 AM – 4:15 PM &nbsp;|&nbsp; On-site at your care home
            </p>
            <div className="space-y-4">
              {WORKSHOP_AGENDA.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 border-l-4"
                  style={{ backgroundColor: item.color, borderLeftColor: item.border }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <div
                      className="flex items-center gap-2 text-sm font-bold shrink-0"
                      style={{ color: item.border }}
                    >
                      <Clock size={15} />
                      {item.time}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#1a3d32] mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-sm text-muted-foreground mb-4">
                Mapped to the Dementia Training Standards Framework (2026) · Aligned to Tier 2 and Tier 3 learning outcomes
              </p>
              <Button
                onClick={() => window.open(STRIPE_WORKSHOP, "_blank")}
                size="lg"
                className="text-lg px-10 py-5 font-bold rounded-full shadow-xl"
                style={{ backgroundColor: "#2C5F4F", color: "#E8DCC4", fontFamily: "Playfair Display, serif" }}
              >
                <Calendar className="mr-2" size={20} />
                Book This Training — £650
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Care Home Booking Calendar */}
      <div className="container py-16">
        <div id="training-booking" className="mb-4">
          <h3
            className="text-2xl font-bold mb-2 text-center text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Choose a Date & Book
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Select a date, choose your training, and pay securely online. Kerry will confirm your booking within 24 hours.
          </p>
          <BookingCalendar courses={CARE_HOME_COURSES} defaultCourse="workshop" />
        </div>
      </div>
    </div>
  );
}
