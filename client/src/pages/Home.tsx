import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Users, Mic, Package, ArrowRight, Building2, Award, Phone } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Expert Blog",
      description: "Read articles and insights from 10 years of dementia care experience",
      href: "/blog",
      color: "bg-teal text-primary-foreground",
    },
    {
      icon: Download,
      title: "Free Ebooks",
      description: "Download comprehensive guides and resources for dementia care",
      href: "/ebooks",
      color: "bg-coral text-accent-foreground",
    },
    {
      icon: Users,
      title: "Support Groups",
      description: "Connect with support organisations and communities",
      href: "/support",
      color: "bg-peach text-secondary-foreground",
    },
    {
      icon: Mic,
      title: "Voice Assistant",
      description: "Get instant answers with our Dementia Pocket Expert voice agent",
      href: "/voice-agent",
      color: "bg-mint text-foreground",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal via-mint to-peach py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 vintage-dots opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 retro-heading text-charcoal">
              Welcome to Outstanding Dementia Care
            </h1>
            <p className="text-lg md:text-xl text-charcoal/80 mb-8 leading-relaxed">
              Your trusted resource centre for dementia care. Access free educational materials, 
              connect with support groups, and discover innovative tools designed by experts with 
              10 years of experience and a Masters in Dementia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg" className="retro-button bg-charcoal text-cream hover:bg-charcoal/90">
                  Explore Resources
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/voice-agent">
                <Button size="lg" variant="outline" className="retro-button bg-cream text-charcoal hover:bg-cream/90">
                  Try Voice Assistant
                  <Mic className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 retro-subheading text-foreground">
            Everything You Need in One Place
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} href={feature.href}>
                  <div className="retro-card p-6 cursor-pointer h-full">
                    <div className={`w-14 h-14 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-16 bg-sage/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 retro-subheading text-foreground">
              Our Innovative Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional tools designed to enhance dementia care quality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            <div className="retro-card p-6 bg-card">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 retro-border">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/tofvBEYtgiEtrcDL.png" 
                  alt="Listening Pod Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Listening Pod
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Record and preserve precious life stories with our innovative recording system
              </p>
              <a href="https://www.thelisteningpod.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="retro-button bg-transparent">
                  Learn More
                </Button>
              </a>
            </div>

            <div className="retro-card p-6 bg-card">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 retro-border">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/jrDbOglyzZxWaIMz.png" 
                  alt="Care Documentation Audit Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Care Documentation Audit
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive audit tools to ensure care plans meet the highest standards
              </p>
              <a href="https://www.caredocumentationaudit.co.uk" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="retro-button bg-transparent">
                  Learn More
                </Button>
              </a>
            </div>

            <div className="retro-card p-6 bg-card">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 retro-border">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/XLGVUBlYVRHmWsYp.png" 
                  alt="Care Home Surveys Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Care Home Surveys
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dashboard for collecting and analyzing family, resident, and staff feedback
              </p>
              <a href="https://www.carehomesurveys.online" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="retro-button bg-transparent">
                  Learn More
                </Button>
              </a>
            </div>

            <div className="retro-card p-6 bg-card">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 retro-border">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/PFxsaONcEsaDAooI.png" 
                  alt="Dementia Pocket Expert Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Dementia Pocket Expert
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered carer support app providing instant guidance and expert advice
              </p>
              <a href="https://www.dementiapocketexpert.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="retro-button bg-transparent">
                  Learn More
                </Button>
              </a>
            </div>

            <div className="retro-card p-6 bg-card">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 retro-border">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/jZknyjpjKHOdNdwh.png" 
                  alt="Love Letter Tales Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Love Letter Tales
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Beautiful story letters delivered by post - perfect for reminiscence and engagement
              </p>
              <a href="https://www.lovelettertales.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="retro-button bg-transparent">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Consultancy Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div
            className="relative rounded-2xl overflow-hidden retro-border max-w-5xl mx-auto"
            style={{ background: "linear-gradient(135deg, #2C5F4F 0%, #1a3d32 60%, #bc9c2f 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Building2 size={28} className="text-[#bc9c2f]" />
                    <span
                      className="text-sm font-bold uppercase tracking-widest text-[#bc9c2f]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      For Care Homes
                    </span>
                  </div>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-[#E8DCC4] mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Dementia Consultancy
                  </h2>
                  <p className="text-[#E8DCC4]/85 text-lg leading-relaxed mb-6">
                    Expert, hands-on support to help your care home achieve outstanding dementia care —
                    from audit and training to surveys and CQC preparation.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-[#E8DCC4] text-sm">
                      <Award size={15} />
                      <span>10 years' experience</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-[#E8DCC4] text-sm">
                      <BookOpen size={15} />
                      <span>Masters in Dementia</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-[#E8DCC4] text-sm">
                      <Users size={15} />
                      <span>UK-wide</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Link href="/consultancy">
                      <Button
                        size="lg"
                        className="font-bold rounded-full shadow-lg transition-transform hover:scale-105 w-full sm:w-auto"
                        style={{ backgroundColor: "#bc9c2f", color: "#fff", fontFamily: "'Playfair Display', serif" }}
                      >
                        <Building2 className="mr-2" size={18} />
                        Find Out More
                      </Button>
                    </Link>
                    <a href="https://calendar.app.google/xbEjKsJCiFMWThpTA" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="lg"
                        variant="outline"
                        className="font-bold rounded-full border-[#E8DCC4] text-[#E8DCC4] hover:bg-[#E8DCC4] hover:text-[#2C5F4F] w-full sm:w-auto"
                      >
                        <Phone className="mr-2" size={18} />
                        Book Free Discovery Call
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="hidden md:grid grid-cols-1 gap-4 w-56 shrink-0">
                  {[
                    { label: "Care Documentation Audit", icon: "📋" },
                    { label: "Immersive Staff Training", icon: "🎓" },
                    { label: "CQC-Ready Written Report", icon: "📄" },
                    { label: "Family & Resident Surveys", icon: "📊" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 text-[#E8DCC4] text-sm"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <NewsletterSignup source="homepage" variant="default" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-coral via-rose to-peach">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-charcoal" style={{ fontFamily: "'Playfair Display', serif" }}>
              Start Your Journey Today
            </h2>
            <p className="text-lg text-charcoal/80 mb-8">
              Join our community of carers and access the resources you need to provide outstanding dementia care
            </p>
            <Link href="/ebooks">
              <Button size="lg" className="retro-button bg-charcoal text-cream hover:bg-charcoal/90">
                Download Free Resources
                <Download className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
