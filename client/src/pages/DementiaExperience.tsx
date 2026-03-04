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

const BOOKING_URL = "https://calendar.app.google/A7pUSzFxuMNbe4LD8";

const benefits = [
  {
    icon: Eye,
    title: "See Through Their Eyes",
    description:
      "Staff wear specialist simulation glasses that replicate the visual disturbances caused by dementia — blurred peripheral vision, contrast loss, and depth perception changes — so they truly understand what residents experience every day.",
  },
  {
    icon: Ear,
    title: "Hear What They Hear",
    description:
      "Auditory simulation equipment recreates the confusion of competing sounds, muffled speech, and auditory hallucinations. Staff leave with a profound appreciation of why a busy dining room can be overwhelming for someone living with dementia.",
  },
  {
    icon: Hand,
    title: "Feel What They Feel",
    description:
      "Tactile gloves and mobility restrictors give staff a first-hand experience of the physical challenges of dementia — from struggling with buttons and cutlery to navigating an unfamiliar environment with reduced sensation.",
  },
  {
    icon: Heart,
    title: "Build Genuine Empathy",
    description:
      "Research consistently shows that immersive simulation training produces lasting behaviour change in care staff. This is not a lecture — it is a lived experience that transforms the way your team approaches every interaction.",
  },
  {
    icon: MessageCircle,
    title: "Transform Communication",
    description:
      "Staff learn the Positive Physical Approach — approaching from the front, at eye level, with slower movements — and the critical importance of 'the pause' before reacting, dramatically reducing distress for residents.",
  },
  {
    icon: Lightbulb,
    title: "Reframe Challenging Behaviour",
    description:
      "Every 'difficult' behaviour is an expression of an unmet need. Staff leave equipped to decode these expressions — whether pain, hunger, or environmental overstimulation — and respond with compassion rather than frustration.",
  },
];

const agenda = [
  {
    time: "09:00 – 09:45",
    title: "Introduction to Dementia",
    description:
      "An engaging introduction to the different types of dementia — Alzheimer's, Lewy Body, Vascular, and more. We explore the neurobiology of dementia in accessible terms: what is happening in the brain, how it progresses, and crucially, what this means from the resident's perspective.",
    color: "bg-primary/10 border-primary",
  },
  {
    time: "09:45 – 10:45",
    title: "Life History & Identity",
    description:
      "A person's identity does not disappear with dementia — it becomes more important than ever. This session explores the power of life history work, how to record it meaningfully, and practical tools including memory boxes and person-centred care planning.",
    color: "bg-secondary/30 border-secondary",
  },
  {
    time: "10:45 – 11:00",
    title: "Morning Break",
    description: "Refreshments provided.",
    color: "bg-muted/30 border-muted",
    isBreak: true,
  },
  {
    time: "11:00 – 12:30",
    title: "The Simulation Experience",
    description:
      "The heart of the day. Staff rotate through immersive round-robin stations wearing specialist simulation equipment — experiencing visual, auditory, tactile, and mobility challenges whilst attempting everyday tasks. This is where understanding becomes empathy.",
    color: "bg-accent/20 border-accent",
    highlight: true,
  },
  {
    time: "12:30 – 13:30",
    title: "Lunch Break",
    description: "Time to reflect on the morning's experience.",
    color: "bg-muted/30 border-muted",
    isBreak: true,
  },
  {
    time: "13:30 – 14:30",
    title: "Debrief & Communication Skills",
    description:
      "The most critical component of the day. A facilitated reflection on the feelings of vulnerability experienced during simulation. Staff learn the Positive Physical Approach and the transformative power of 'the pause' — the moment between stimulus and response that can change everything.",
    color: "bg-primary/10 border-primary",
  },
  {
    time: "14:30 – 15:30",
    title: "Behaviours & Problem Solving",
    description:
      "We reframe 'challenging behaviours' as 'adaptive behaviours' — expressions of unmet needs. Staff learn a practical framework for identifying triggers (pain, hunger, environmental overstimulation) and responding with curiosity rather than correction.",
    color: "bg-secondary/30 border-secondary",
  },
  {
    time: "15:30 – 15:45",
    title: "Afternoon Break",
    description: "Refreshments provided.",
    color: "bg-muted/30 border-muted",
    isBreak: true,
  },
  {
    time: "15:45 – 16:15",
    title: "Action Planning & Daily Living",
    description:
      "Applying the day's insights to the routines that matter most — bathing, dressing, and dining — guided by the philosophy of 'doing with' rather than 'doing for'. Each participant leaves with a personal action plan to implement immediately.",
    color: "bg-accent/20 border-accent",
  },
];

const included = [
  "Specialist simulation equipment for all stations",
  "Printed course notes for every participant",
  "Post-session report for the home manager",
  "Certificate of attendance for each participant",
  "Follow-up resources and reading list",
];

export default function DementiaExperience() {
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
              "Walk a mile in their shoes — and transform the care you give."
            </p>
            <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              A full-day immersive simulation workshop that gives your care team a genuine, visceral understanding of what it feels like to live with dementia — and the practical skills to respond with compassion, confidence, and competence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="retro-button bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
                onClick={() => window.open(BOOKING_URL, "_blank")}
              >
                <CalendarCheck className="mr-2 h-5 w-5" />
                Book Your Workshop
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

      {/* Agenda Section */}
      <section id="agenda" className="py-16 bg-card border-y-4 border-charcoal">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Full-Day Agenda
            </h2>
            <p className="text-muted-foreground text-lg">
              9:00 AM – 4:15 PM &nbsp;|&nbsp; On-site at your care home
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {agenda.map((item) => (
              <div
                key={item.time}
                className={`rounded-lg border-2 p-5 ${item.color} ${item.highlight ? "shadow-md" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex items-center gap-2 min-w-[160px]">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-bold text-sm text-primary whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className="font-bold text-foreground"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.title}
                      </h3>
                      {item.highlight && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          Core Experience
                        </Badge>
                      )}
                    </div>
                    {!item.isBreak && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Investment & Pricing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything your team needs for a transformative day of learning — delivered on-site at your care home.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="retro-card border-4 border-primary shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Brain className="h-8 w-8 text-primary" />
                    <h3
                      className="text-2xl font-bold text-foreground"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Full-Day On-Site Workshop
                    </h3>
                  </div>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-primary">£650</span>
                    <p className="text-muted-foreground mt-1">Day rate + travel expenses</p>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 bg-secondary/30 rounded-full px-4 py-2">
                    <Users className="h-4 w-4 text-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Up to 10 participants &nbsp;|&nbsp; +£50 per additional candidate
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-border pt-6 mb-8">
                  <h4
                    className="font-bold text-foreground mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <Star className="h-5 w-5 text-gold" />
                    Everything Included
                  </h4>
                  <ul className="space-y-3">
                    {included.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="w-full retro-button bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
                  onClick={() => window.open(BOOKING_URL, "_blank")}
                >
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Check Availability & Book Now
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Full payment required at time of booking. Secure payment processed via Google Calendar.
                </p>
              </CardContent>
            </Card>
          </div>
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
                  <p>A minimum of 24 hours' notice is required for any cancellation or rescheduling. If notice is not given within this period, the full fee will be forfeited. We understand that care homes face unpredictable circumstances and will always endeavour to rearrange where possible with sufficient notice.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg border-2 border-border">
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Travel Expenses</p>
                  <p>Travel expenses are charged in addition to the day rate and will be confirmed at the time of booking based on your location. We travel throughout the UK.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg border-2 border-border">
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Regulatory Note</p>
                  <p>As an educational training provider, Outstanding Dementia Care does not provide personal care directly to residents and therefore does not require registration with the Care Quality Commission (CQC). Our training is delivered in accordance with current dementia care best practice and evidence-based guidelines.</p>
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
            Give your care staff the gift of understanding. Book The Dementia Experience and watch the quality of care in your home change — permanently.
          </p>
          <Button
            size="lg"
            className="retro-button bg-card text-foreground hover:bg-card/90 text-lg px-10 py-6"
            onClick={() => window.open(BOOKING_URL, "_blank")}
          >
            <CalendarCheck className="mr-2 h-5 w-5" />
            Book Now — Check Availability
          </Button>
        </div>
      </section>
    </div>
  );
}
