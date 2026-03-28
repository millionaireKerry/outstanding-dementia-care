import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Clock,
  Users,
  Star,
  CheckCircle,
  Heart,
  Eye,
  Ear,
  Hand,
  MessageCircle,
  Lightbulb,
  FileText,
  CalendarCheck,
  AlertCircle,
} from "lucide-react";
import BookingCalendar, { type CourseOption } from "@/components/BookingCalendar";

const BOOKING_URL = "https://calendar.app.google/r1FrZpnQRMx9q6N57";
const STRIPE_HALF_DAY = "https://buy.stripe.com/00w3cxflx0Ub81iaxTg7e03";
const STRIPE_FULL_DAY = "https://buy.stripe.com/3cI4gB7T5eL181ieO9g7e02";

const EXPERIENCE_COURSES: CourseOption[] = [
  {
    key: "half-day",
    label: "The Dementia Experience — Half Day",
    price: "£595",
    stripeUrl: "https://buy.stripe.com/00w3cxflx0Ub81iaxTg7e03",
    sessions: [
      "Session 1: 10:00am – 11:30am (10 people)",
      "Session 2: 11:30am – 1:00pm (10 people)",
    ],
    people: "2 sessions × 10 people = 20 participants",
    description: "Morning or afternoon. 2 × 90-min sessions. Up to 20 participants. All travel included.",
  },
  {
    key: "full-day",
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

const benefits = [
  {
    icon: Eye,
    title: "See Through Their Eyes",
    description:
      "Staff wear specialist simulation glasses designed to replicate a blend of the perceptual changes that can occur in dementia, including altered contrast, depth perception, and visual processing, alongside the age-related sensory impairment that many residents experience simultaneously. It is a powerful window into why familiar environments can suddenly feel confusing and threatening.",
  },
  {
    icon: Ear,
    title: "Hear What They Hear",
    description:
      "Auditory simulation recreates the confusion of competing sounds, muffled speech, and auditory overload. Dementia can affect how the brain interprets what is heard, and when combined with age-related hearing loss, a busy dining room can become genuinely overwhelming. Staff leave with a real appreciation of why calm, quiet environments matter so much.",
  },
  {
    icon: Hand,
    title: "Feel What They Feel",
    description:
      "Tactile gloves and mobility aids give staff a first-hand experience of reduced dexterity and restricted movement, reflecting the physical challenges that frequently accompany dementia and frailty in older age. Struggling with buttons, cutlery, and everyday objects in an unfamiliar way builds empathy that no lecture can replicate.",
  },
  {
    icon: Heart,
    title: "Build Genuine Empathy",
    description:
      "Research shows that immersive simulation training can meaningfully improve empathy, dementia knowledge, and care confidence in staff. This is not a lecture; it is a lived experience designed to shift perspective and transform the way your team approaches every interaction, supported by expert facilitation and structured debrief.",
  },
  {
    icon: MessageCircle,
    title: "Transform Communication",
    description:
      "Staff learn the Positive Physical Approach: approaching from the front, at eye level, with slower movements, and the critical importance of 'the pause' before reacting. Communication works best in calm, well-lit environments, and staff leave understanding exactly why, and how to create those conditions every day.",
  },
  {
    icon: Lightbulb,
    title: "Reframe Behaviour as Communication",
    description:
      "Every 'difficult' behaviour is an expression of an unmet need. Staff leave equipped to decode these expressions, whether pain, hunger, or environmental overstimulation, and respond with compassion rather than frustration. We also explore the Mental Capacity Act principles to ensure care remains person-centred and least restrictive.",
  },
];

const halfDaySessions = [
  {
    time: "10:00 – 11:30am",
    title: "Session 1 — Interactive Experience",
    description: "Up to 10 participants rotate through immersive simulation stations wearing specialist equipment that replicates the perceptual, auditory, and tactile challenges of living with dementia. A powerful, unforgettable 45 minutes.",
    color: "bg-accent/20 border-accent",
    highlight: true,
  },
  {
    time: "10:00 – 11:30am",
    title: "Session 1 — Structured Debrief",
    description: "A facilitated group reflection exploring what participants felt, saw, and heard during the simulation. Expert-led discussion translating the experience into practical, compassionate care skills.",
    color: "bg-primary/10 border-primary",
  },
  {
    time: "11:30am – 1:00pm",
    title: "Session 2 — Interactive Experience",
    description: "The next group of up to 10 participants complete the same immersive simulation, ensuring every team member has an equal, meaningful experience.",
    color: "bg-accent/20 border-accent",
    highlight: true,
  },
  {
    time: "11:30am – 1:00pm",
    title: "Session 2 — Structured Debrief",
    description: "Facilitated debrief for the second group, drawing out key learning and building shared language and understanding across the whole team.",
    color: "bg-primary/10 border-primary",
  },
];

const fullDaySessions = [
  ...halfDaySessions,
  {
    time: "1:30pm – 3:00pm",
    title: "Session 3 — Interactive Experience",
    description: "Up to 10 more participants experience the immersive simulation in the afternoon, keeping group sizes small for maximum impact and psychological safety.",
    color: "bg-accent/20 border-accent",
    highlight: true,
  },
  {
    time: "1:30pm – 3:00pm",
    title: "Session 3 — Structured Debrief",
    description: "Expert-facilitated debrief for the third group, reinforcing key insights and practical skills.",
    color: "bg-primary/10 border-primary",
  },
  {
    time: "3:00pm – 4:30pm",
    title: "Session 4 — Interactive Experience",
    description: "The final group of up to 10 participants completes the simulation, meaning up to 40 team members can experience the training in a single day.",
    color: "bg-accent/20 border-accent",
    highlight: true,
  },
  {
    time: "3:00pm – 4:30pm",
    title: "Session 4 — Structured Debrief",
    description: "Final debrief of the day. Participants leave with clear, actionable commitments to apply their learning immediately in their care practice.",
    color: "bg-primary/10 border-primary",
  },
];

const included = [
  "Specialist simulation equipment for all stations",
  "Printed course notes for every participant",
  "Post-session report for the home manager",
  "Certificate of attendance for each participant",
  "Follow-up resources and reading list",
  "Mapped to the Dementia Training Standards Framework (2026)",
];

export default function DementiaExperience() {
  useEffect(() => {
    document.title = "The Dementia Experience Training | Outstanding Dementia Care";
    return () => { document.title = "Outstanding Dementia Care - Resources for Carers"; };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-card border-b-4 border-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-teal) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary text-primary-foreground text-sm px-4 py-1 retro-border">
              Immersive Training for Care Teams
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Dementia Experience
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 italic">
              "Walk a mile in their shoes, and transform the care you give."
            </p>
            <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              A full-day immersive simulation workshop that gives your care team a genuine, visceral understanding of what it feels like to live with dementia, and the practical skills to respond with compassion, confidence, and competence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="retro-button bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <CalendarCheck className="mr-2 h-5 w-5" />
                Book a Date
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="retro-button text-lg px-8 py-6 border-2"
                onClick={() =>
                  document
                    .getElementById("agenda")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Full Agenda
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DTSF Alignment Banner */}
      <section className="py-4 bg-secondary/20 border-b-2 border-border">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Mapped to the Dementia Training Standards Framework (2026)</span> &nbsp;|&nbsp; Aligned to Tier 2 (direct care roles) and Tier 3 (leaders and specialists) learning outcomes
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Immersive Simulation Changes Everything
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Traditional dementia training tells staff what to do. The Dementia Experience shows them how it feels. That difference is everything.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="retro-card border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 retro-border">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3
                      className="text-lg font-bold text-foreground mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Session Structure Section */}
      <section id="agenda" className="py-16 bg-card border-y-4 border-charcoal">
        <div className="container">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How the Day is Structured
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each 90-minute session is for up to 10 people and follows the same format: 45 minutes of immersive simulation followed by a 45-minute expert-led debrief.
            </p>
          </div>

          {/* Half Day vs Full Day toggle */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              id="tab-half"
              onClick={() => {
                document.getElementById('sessions-half')!.style.display = 'block';
                document.getElementById('sessions-full')!.style.display = 'none';
                document.getElementById('tab-half')!.style.background = 'var(--color-primary)';
                document.getElementById('tab-half')!.style.color = '#fff';
                document.getElementById('tab-full')!.style.background = 'transparent';
                document.getElementById('tab-full')!.style.color = 'var(--color-primary)';
              }}
              style={{ background: 'var(--color-primary)', color: '#fff', border: '2px solid var(--color-primary)', borderRadius: '8px', padding: '10px 28px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}
            >
              Half Day (2 sessions · 20 people)
            </button>
            <button
              id="tab-full"
              onClick={() => {
                document.getElementById('sessions-full')!.style.display = 'block';
                document.getElementById('sessions-half')!.style.display = 'none';
                document.getElementById('tab-full')!.style.background = 'var(--color-primary)';
                document.getElementById('tab-full')!.style.color = '#fff';
                document.getElementById('tab-half')!.style.background = 'transparent';
                document.getElementById('tab-half')!.style.color = 'var(--color-primary)';
              }}
              style={{ background: 'transparent', color: 'var(--color-primary)', border: '2px solid var(--color-primary)', borderRadius: '8px', padding: '10px 28px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}
            >
              Full Day (4 sessions · 40 people)
            </button>
          </div>

          <div id="sessions-half" className="max-w-3xl mx-auto space-y-4">
            {halfDaySessions.map((item, i) => (
              <div key={i} className={`rounded-lg border-2 p-5 ${item.color} ${item.highlight ? 'shadow-md' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex items-center gap-2 min-w-[170px]">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-bold text-sm text-primary whitespace-nowrap">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                      {item.highlight && <Badge className="bg-primary text-primary-foreground text-xs">Immersive Simulation</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="sessions-full" className="max-w-3xl mx-auto space-y-4" style={{ display: 'none' }}>
            {fullDaySessions.map((item, i) => (
              <div key={i} className={`rounded-lg border-2 p-5 ${item.color} ${item.highlight ? 'shadow-md' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex items-center gap-2 min-w-[170px]">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-bold text-sm text-primary whitespace-nowrap">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                      {item.highlight && <Badge className="bg-primary text-primary-foreground text-xs">Immersive Simulation</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Calendar Section */}
      <section id="booking" className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Choose a Date & Book
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select an available date, choose your session type, and pay securely online. No phone calls needed — just pick, book, and we'll be in touch within 24 hours.
            </p>
          </div>
          <BookingCalendar courses={EXPERIENCE_COURSES} defaultCourse="full-day" />
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-12 bg-card border-t-4 border-charcoal">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3 mb-6">
              <FileText className="h-6 w-6 text-primary shrink-0 mt-1" />
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Booking Terms & Conditions
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg border-2 border-border">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Payment</p>
                  <p>Full payment is required at the time of booking. No date will be held without payment. Payment is processed securely through Google Calendar at the time of booking.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg border-2 border-border">
                <AlertCircle className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Cancellation Policy</p>
                  <p>We understand that care homes face unpredictable staffing pressures. Our cancellation policy is designed to be fair to both parties. Cancellations made with 14 or more days' notice will receive a full refund or free rescheduling. Cancellations made between 7 and 13 days' notice will be offered one free rescheduling to an alternative date. Cancellations made with less than 7 days' notice will forfeit the full fee, though we will always endeavour to rearrange where circumstances allow.</p>
                </div>
              </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border-2 border-border">
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Travel</p>
                  <p>Travel is included in the price. All prices are all-inclusive — there are no additional travel charges. We deliver throughout the UK.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg border-2 border-border">
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Regulatory Note</p>
                  <p>As an educational training provider, Outstanding Dementia Care does not provide personal care directly to residents and therefore does not require registration with the Care Quality Commission (CQC). Our training is delivered in accordance with current dementia care best practice, the Dementia Training Standards Framework (2026), and evidence-based guidelines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Transform Your Team?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Give your care staff the gift of understanding. Select a date above, choose your session type, and pay securely online. Kerry will confirm your booking within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="retro-button bg-card text-foreground hover:bg-card/90 text-lg px-10 py-6"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <CalendarCheck className="mr-2 h-5 w-5" />
              Choose a Date — Half Day
            </Button>
            <Button
              size="lg"
              className="retro-button bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-6"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <CalendarCheck className="mr-2 h-5 w-5" />
              Choose a Date — Full Day
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
