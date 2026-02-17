import { Button } from "@/components/ui/button";
import { Mic2, FileCheck, BarChart3, ExternalLink } from "lucide-react";

export default function Products() {
  const products = [
    {
      id: "listening-pod",
      name: "The Listening Pod",
      icon: Mic2,
      description: "A revolutionary recording system designed to capture and preserve precious life stories of those living with dementia.",
      features: [
        "Easy-to-use recording interface",
        "High-quality audio capture",
        "Downloadable life story recordings",
        "Secure cloud storage",
        "Family sharing capabilities"
      ],
      color: "from-teal to-mint",
      iconBg: "bg-teal",
      link: "#listening-pod"
    },
    {
      id: "care-audit",
      name: "Care Documentation Audit",
      icon: FileCheck,
      description: "Comprehensive audit tools that help care homes ensure their care plans meet the highest standards of quality and compliance.",
      features: [
        "Systematic care plan review",
        "Compliance checking",
        "Quality assurance metrics",
        "Detailed reporting",
        "Best practice recommendations"
      ],
      color: "from-coral to-rose",
      iconBg: "bg-coral",
      link: "#care-audit"
    },
    {
      id: "surveys",
      name: "Care Home Surveys",
      icon: BarChart3,
      description: "An intuitive dashboard for collecting and analyzing feedback from families, residents, and staff to continuously improve care quality.",
      features: [
        "Multi-stakeholder surveys",
        "Real-time analytics dashboard",
        "Trend analysis",
        "Customizable questionnaires",
        "Actionable insights"
      ],
      color: "from-peach to-gold",
      iconBg: "bg-peach",
      link: "#surveys"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 retro-heading text-charcoal">
            Our Innovative Products
          </h1>
          <p className="text-lg md:text-xl text-charcoal/80 max-w-3xl mx-auto">
            Professional tools designed to enhance dementia care quality, backed by 10 years of experience and a Masters in Dementia
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container">
          <div className="space-y-16">
            {products.map((product, index) => {
              const Icon = product.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={product.id} id={product.id} className="scroll-mt-20">
                  <div className={`retro-card p-8 md:p-12 bg-gradient-to-br ${product.color} bg-opacity-10`}>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${!isEven ? 'md:grid-flow-dense' : ''}`}>
                      {/* Icon and Title */}
                      <div className={isEven ? '' : 'md:col-start-2'}>
                        <div className={`w-20 h-20 ${product.iconBg} rounded-full flex items-center justify-center retro-border mb-6`}>
                          <Icon size={40} className="text-primary-foreground" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 retro-subheading text-foreground">
                          {product.name}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className={isEven ? '' : 'md:col-start-1 md:row-start-1'}>
                        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border-2 border-charcoal shadow-lg">
                          <h3 className="text-xl font-bold mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Key Features
                          </h3>
                          <ul className="space-y-3">
                            {product.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8 text-center">
                      <Button 
                        className="retro-button bg-charcoal text-cream hover:bg-charcoal/90"
                        size="lg"
                        onClick={() => window.open(product.link, '_blank')}
                      >
                        Learn More
                        <ExternalLink className="ml-2" size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-sage/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center retro-card p-8">
            <h2 className="text-3xl font-bold mb-4 retro-subheading text-foreground">
              Interested in Our Products?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get in touch to learn more about how our tools can enhance your dementia care services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/voice-agent">
                <Button className="retro-button bg-primary text-primary-foreground" size="lg">
                  Try Voice Assistant
                </Button>
              </a>
              <a href="/ebooks">
                <Button variant="outline" className="retro-button bg-transparent" size="lg">
                  Download Free Resources
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
