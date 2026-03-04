import { Link } from "wouter";
import { Heart } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t-4 border-charcoal mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4 retro-subheading text-foreground">
              Outstanding Dementia Care
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A comprehensive resource centre for dementia carers, providing free educational materials, 
              support group connections, and innovative tools to enhance the quality of care.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart size={16} className="text-accent fill-accent" />
              <span>for carers everywhere</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/ebooks">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Free Ebooks
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/support">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Support Groups
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/voice-agent">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Voice Assistant
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/dementia-experience">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Training
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wide">
              Our Products
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products#listening-pod">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Listening Pod
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products#care-audit">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Care Documentation Audit
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products#surveys">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Care Home Surveys
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12">
          <NewsletterSignup source="footer" variant="compact" />
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t-2 border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Outstanding Dementia Care. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms &amp; Conditions
              </Link>
              <span>·</span>
              <span>10 years in dementia care | Masters in Dementia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
