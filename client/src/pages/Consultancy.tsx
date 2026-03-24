import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Star,
  Users,
  ClipboardList,
  BarChart2,
  BookOpen,
  Phone,
  Award,
  Heart,
  Building2,
} from "lucide-react";

export default function Consultancy() {
  const handleDiscoveryCall = () => {
    window.open("https://calendar.app.google/r1FrZpnQRMx9q6N57", "_blank");
  };

  const handleBrochure = () => {
    window.open(
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/dementia-experience-brochure_b8e2a4f1.pdf",
      "_blank"
    );
  };

  const programmeModules = [
    {
      month: "Month 1",
      title: "Foundation & Assessment",
      icon: <ClipboardList size={28} className="text-[#2C5F4F]" />,
      items: [
        "Full care documentation audit of existing care plans",
        "Staff knowledge and confidence assessment",
        "Environmental walkthrough and dementia-friendly design review",
        "Identification of key improvement priorities",
      ],
    },
    {
      month: "Month 2",
      title: "Training & Implementation",
      icon: <BookOpen size={28} className="text-[#bc9c2f]" />,
      items: [
        "The Dementia Experience — full immersive training day for staff",
        "Personalised care planning workshop",
        "Communication and behaviour understanding session",
        "Family engagement strategy development",
      ],
    },
    {
      month: "Month 3",
      title: "Embedding & Evaluation",
      icon: <BarChart2 size={28} className="text-[#2C5F4F]" />,
      items: [
        "Care home survey — resident, family, and staff feedback",
        "Progress review against Month 1 baseline",
        "Action plan for sustained improvement",
        "Written report suitable for CQC inspection evidence",
      ],
    },
  ];

  const outcomes = [
    "Improved CQC inspection readiness",
    "Higher staff confidence and reduced turnover",
    "Better family satisfaction and trust",
    "Measurable improvement in resident wellbeing",
    "Documented evidence of outstanding dementia care",
    "A care team that genuinely understands dementia",
  ];

  const testimonials = [
    {
      quote:
        "Kerry's training day was unlike anything we'd done before. Our staff came away genuinely moved — and our care plans have never been better.",
      name: "Registered Manager, residential care home",
    },
    {
      quote:
        "The audit gave us a clear picture of where we were and a realistic plan for where we needed to be. Invaluable before our CQC inspection.",
      name: "Director of Care, nursing home group",
    },
  ];

  const services = [
    {
      name: "Care Documentation Audit",
      icon: <ClipboardList size={28} className="text-[#2C5F4F]" />,
      desc: "A thorough review of your care plans and documentation — identifying gaps, strengths, and opportunities to evidence outstanding care.",
    },
    {
      name: "The Dementia Experience",
      icon: <BookOpen size={28} className="text-[#bc9c2f]" />,
      desc: "An immersive, evidence-based training day that builds genuine empathy and practical skills in your care team.",
    },
    {
      name: "Care Home Surveys",
      icon: <BarChart2 size={28} className="text-[#2C5F4F]" />,
      desc: "Resident, family, and staff satisfaction surveys with a live dashboard — giving you the evidence you need for CQC inspections.",
    },
    {
      name: "The Dementia Excellence Programme",
      icon: <Award size={28} className="text-[#bc9c2f]" />,
      desc: "Our flagship 3-month consultancy package — combining audit, training, surveys, and a CQC-ready written report into one structured journey.",
    },
    {
      name: "Bespoke Consultancy",
      icon: <Users size={28} className="text-[#2C5F4F]" />,
      desc: "Not sure what you need? Book a free call and we will put together a plan that fits your home, your team, and your budget.",
    },
    {
      name: "Change Management Support",
      icon: <Heart size={28} className="text-[#bc9c2f]" />,
      desc: "Hands-on support to help your home navigate change — whether that is a new manager, a CQC improvement plan, or a culture shift towards person-centred care.",
    },
  ];
  useEffect(() => {
    document.title = "Dementia Consultancy | Outstanding Dementia Care";
    return () => { document.title = "Outstanding Dementia Care - Resources for Carers"; };
  }, []);


  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
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
            For Care Homes &amp; Care Providers
          </Badge>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 size={44} className="text-[#E8DCC4]" />
            <h1
              className="text-4xl md:text-6xl font-bold text-[#E8DCC4]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Dementia Consultancy
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[#E8DCC4]/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Expert, hands-on support to help your care home achieve outstanding
            dementia care — from audit and training to surveys and CQC
            preparation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Award size={18} />
              <span className="font-semibold">10 years' experience</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <BookOpen size={18} />
              <span className="font-semibold">Masters in Dementia</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-[#E8DCC4]">
              <Users size={18} />
              <span className="font-semibold">UK-wide</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleDiscoveryCall}
              size="lg"
              className="text-lg px-10 py-6 font-bold rounded-full shadow-xl transition-transform hover:scale-105"
              style={{ backgroundColor: "#bc9c2f", color: "#fff", fontFamily: "Playfair Display, serif" }}
            >
              <Phone className="mr-2" size={22} />
              Book a Free 30-Minute Call
            </Button>
            <Button
              onClick={handleBrochure}
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 font-bold rounded-full border-[#E8DCC4] text-[#E8DCC4] hover:bg-[#E8DCC4] hover:text-[#2C5F4F]"
            >
              Download Brochure
            </Button>
          </div>
          <p className="text-[#E8DCC4]/70 text-sm mt-4">
            Free 30-minute call · No obligation · Tailored to your home
          </p>
        </div>
      </div>

      {/* Why Outstanding Dementia Care */}
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold mb-5 text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            What does outstanding dementia care actually look like?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Many care homes want to achieve outstanding — but without the right
            knowledge, tools, and evidence, it can feel impossible. Kerry
            Goodearl has spent a decade working in and alongside care homes,
            helping teams understand dementia deeply, care more confidently, and
            document their work in a way that stands up to scrutiny.
          </p>
        </div>

        {/* 3-Month Programme */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold mb-2 text-center text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            The Dementia Excellence Programme
          </h3>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            A structured 3-month consultancy package that takes your home from
            where you are now to where you want to be.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {programmeModules.map((mod, i) => (
              <Card key={i} className="retro-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {mod.icon}
                    <div>
                      <p className="text-xs font-semibold text-[#bc9c2f] uppercase tracking-widest">
                        {mod.month}
                      </p>
                      <h4
                        className="text-lg font-bold text-[#2C5F4F]"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        {mod.title}
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {mod.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-[#2C5F4F] mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="bg-[#F5F0E8] rounded-2xl p-10 mb-16 retro-border">
          <h3
            className="text-2xl font-bold mb-8 text-center text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            What your home will achieve
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {outcomes.map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <Heart size={20} className="text-[#bc9c2f] mt-0.5 shrink-0" />
                <span className="text-base">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How We Can Help */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold mb-2 text-center text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            How we can help your home
          </h3>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Every care home is different. We offer a range of services that can be combined or delivered individually — all tailored to your home's specific needs, team, and goals.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Card key={i} className="retro-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {svc.icon}
                    <h4
                      className="text-lg font-bold text-[#2C5F4F]"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {svc.name}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Consultation CTA */}
          <div className="mt-12 text-center">
            <div
              className="inline-block rounded-2xl px-10 py-8 retro-border max-w-2xl w-full"
              style={{ background: "linear-gradient(135deg, #F5F0E8, #EDE5D0)" }}
            >
              <h4
                className="text-2xl font-bold text-[#2C5F4F] mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Not sure where to start?
              </h4>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Book a free 30-minute call with Kerry. She will listen to where your home is now, talk through what is possible, and suggest the right next step — with no obligation and no sales pressure.
              </p>
              <Button
                onClick={handleDiscoveryCall}
                size="lg"
                className="font-bold px-10 py-5 rounded-full text-lg shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: "#2C5F4F", color: "#fff", fontFamily: "Playfair Display, serif" }}
              >
                <Phone className="mr-2" size={20} />
                Book a Free 30-Minute Call
              </Button>
              <p className="text-xs text-muted-foreground mt-3">Free · No obligation · 30 minutes · Tailored to your home</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold mb-8 text-center text-[#2C5F4F]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            What care homes say
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
                  <p className="text-base italic text-muted-foreground mb-4">"{t.quote}"</p>
                  <p className="font-semibold text-sm text-[#2C5F4F]">— {t.name}</p>
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
            About Kerry Goodearl
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Kerry Goodearl has worked in dementia care for over 10 years and is
            completing a Masters in Dementia. She is the founder of Outstanding
            Dementia Care and creator of the Dementia Experience — an immersive
            training programme used by care homes across the UK. Kerry is also
            the developer of the Listening Pod, Care Documentation Audit, and
            Care Home Survey tools. Her approach combines deep clinical knowledge
            with a warm, practical understanding of the realities of care home
            life.
          </p>
        </div>

        {/* CTA Banner */}
        <div
          className="rounded-2xl p-10 text-center retro-border"
          style={{ background: "linear-gradient(135deg, #2C5F4F, #1a3d32)" }}
        >
          <h3
            className="text-2xl font-bold text-[#E8DCC4] mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Ready to take the next step?
          </h3>
          <p className="text-[#E8DCC4]/80 max-w-xl mx-auto mb-6">
            Book a free 30-minute discovery call. No obligation, no sales pitch
            — just an honest conversation about what your home needs and how we
            can help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleDiscoveryCall}
              size="lg"
              className="font-bold px-8 py-5"
              style={{ backgroundColor: "#bc9c2f", color: "#fff" }}
            >
              <Phone className="mr-2" size={20} />
            Book a Free 30-Minute Call
            </Button>
            <Button
              onClick={handleBrochure}
              variant="outline"
              size="lg"
              className="border-[#E8DCC4] text-[#E8DCC4] hover:bg-[#E8DCC4] hover:text-[#2C5F4F] font-bold px-8 py-5"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
