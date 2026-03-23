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
  Loader2,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function FamilyWorkshop() {
  const [location] = useLocation();
  const checkoutMutation = trpc.payments.createCheckout.useMutation({
    onSuccess: (data) => {
      window.open(data.url, "_blank");
    },
    onError: (error) => {
      toast.error("Booking unavailable", {
        description: error.message || "Please try again shortly.",
      });
    },
  });

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

  const WEBINAR_CALENDAR_URL = "https://calendar.app.google/r1FrZpnQRMx9q6N57";

  const handleBook = () => {
    toast.info("Redirecting to secure checkout...", { description: "Opening Stripe payment page." });
    checkoutMutation.mutate({ productKey: "familyWorkshop", origin: window.location.origin });
  };

  const handleAddToCalendar = () => {
    window.open(WEBINAR_CALENDAR_URL, "_blank");
  };

  const topics = [
    "What dementia actually is — and what it isn't",
    "Why your loved one behaves the way they do",
    "How to communicate without causing distress",
    "Practical tips for the most common daily challenges",
    "What to expect as dementia progresses",
    "How to look after yourself as a carer",
    "Where to find help and what support is available",
    "Your questions answered live",
  ];

  const whoIsItFor = [
    "Adult children caring for a parent with dementia",
    "Spouses and partners of someone newly diagnosed",
    "Family members who live far away and feel helpless",
    "Anyone who wants to understand dementia better",
  ];

  const testimonials = [
    {
      quote:
        "I wish I had found this years ago. Kerry explained things in a way that finally made sense of what my mum was going through.",
      name: "Sarah, daughter of a resident",
    },
    {
      quote:
        "I felt so alone before this session. Knowing there are other families going through the same thing made such a difference.",
      name: "David, husband and carer",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2C5F4F 0%, #1a3d32 60%, #bc9c2f 100%)",
        }}
      >
        {/* Retro dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
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
              Family Dementia Workshop
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[#E8DCC4]/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            A warm, honest 90-minute Zoom session for families navigating
            dementia — led by Kerry Goodearl, dementia specialist with 10 years'
            experience and a Masters in Dementia.
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
            onClick={handleBook}
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
              onClick={handleAddToCalendar}
              className="text-[#E8DCC4]/80 text-sm underline hover:text-[#E8DCC4] transition-colors"
            >
              📅 Add to Google Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Why this exists */}
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

        {/* What you'll cover */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3
              className="text-2xl font-bold mb-6 text-[#2C5F4F]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              What we cover in the session
            </h3>
            <div className="space-y-3">
              {topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-[#2C5F4F] mt-0.5 shrink-0"
                  />
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
              {whoIsItFor.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Heart
                    size={20}
                    className="text-[#bc9c2f] mt-0.5 shrink-0"
                  />
                  <span className="text-base">{item}</span>
                </div>
              ))}
            </div>
            {/* Price card */}
            <Card className="retro-border bg-[#2C5F4F] text-white">
              <CardContent className="p-6 text-center">
                <p className="text-[#E8DCC4] text-sm font-semibold uppercase tracking-widest mb-1">
                  Per person
                </p>
                <p
                  className="text-6xl font-bold text-[#E8DCC4] mb-1"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  £25
                </p>
                <p className="text-[#E8DCC4]/80 text-sm mb-4">
                  90-minute live Zoom session
                </p>
                <Button
                  onClick={handleBook}
                  disabled={checkoutMutation.isPending}
                  className="w-full font-bold text-base"
                  style={{ backgroundColor: "#bc9c2f", color: "#fff" }}
                >
                  {checkoutMutation.isPending ? (
                    <><Loader2 className="mr-2 animate-spin" size={18} />Processing...</>
                  ) : (
                    <><Calendar className="mr-2" size={18} />Book Now — Secure Payment</>
                  )}
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
                      <Star
                        key={s}
                        size={16}
                        className="text-[#bc9c2f] fill-[#bc9c2f]"
                      />
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

        {/* Meet Kerry */}
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

        {/* Future sessions teaser */}
        <div
          className="rounded-2xl p-10 text-center retro-border"
          style={{ background: "linear-gradient(135deg, #2C5F4F, #1a3d32)" }}
        >
          <h3
            className="text-2xl font-bold text-[#E8DCC4] mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Coming soon: in-person workshops
          </h3>
          <p className="text-[#E8DCC4]/80 max-w-xl mx-auto mb-6">
            Future workshops will include hands-on activities, the Dementia
            Experience simulation, and specialist topics such as managing a
            crisis, activities at home, and navigating care home placement.
          </p>
          <Button
            onClick={handleBook}
            variant="outline"
            className="border-[#E8DCC4] text-[#E8DCC4] hover:bg-[#E8DCC4] hover:text-[#2C5F4F] font-bold"
          >
            Register Your Interest
          </Button>
        </div>
      </div>
    </div>
  );
}
