import { Link } from "wouter";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const HEADER_BANNER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/OutstandingDementiaCareheader_e66b7ca3.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Ebooks", href: "/ebooks" },
    { name: "Support Groups", href: "/support" },
    { name: "Products", href: "/products" },
    { name: "Chat with Dotty ✨", href: "/ask-dotty" },
    { name: "Daily Good News", href: "/daily-good-news" },
    { name: "Training", href: "/dementia-experience" },
    { name: "Family Workshop", href: "/family-workshop" },
    { name: "Dream Home", href: "/dream-home" },
    { name: "Consultancy", href: "/consultancy" },
    { name: "Voice Assistant", href: "/voice-agent" },
  ];

  // Split nav into two rows of 6
  const row1 = navigation.slice(0, 6);
  const row2 = navigation.slice(6);

  return (
    <header className="bg-card border-b-4 border-charcoal shadow-lg sticky top-0 z-50">
      <div className="container">
        {/* Top section: banner logo */}
        <div className="flex items-center justify-between py-2">
          <Link href="/">
            <div className="cursor-pointer group">
              <img
                src={HEADER_BANNER}
                alt="Outstanding Dementia Care - Supporting carers, families, and communities"
                className="h-16 md:h-20 w-auto object-contain"
                style={{ maxWidth: "480px" }}
              />
            </div>
          </Link>

          {/* Auth buttons desktop */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user?.role === "admin" && (
              <Link href="/admin">
                <Button variant="ghost" className="text-accent hover:bg-accent hover:text-accent-foreground font-medium text-sm">
                  Admin
                </Button>
              </Link>
            )}
            {isAuthenticated ? (
              <Button onClick={() => logout()} variant="outline" className="retro-button bg-muted text-muted-foreground hover:bg-muted/80 text-sm">
                Logout
              </Button>
            ) : (
              <Button onClick={() => window.location.href = getLoginUrl()} className="retro-button bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation — two rows */}
        <nav className="hidden md:block border-t border-border/40 pt-1 pb-1">
          {/* Row 1 */}
          <div className="flex items-center gap-0.5 flex-wrap">
            {row1.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className="text-foreground hover:bg-secondary hover:text-secondary-foreground font-medium text-sm px-3 py-1.5 h-auto"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex items-center gap-0.5 flex-wrap">
            {row2.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className="text-foreground hover:bg-secondary hover:text-secondary-foreground font-medium text-sm px-3 py-1.5 h-auto"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-border">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:bg-secondary hover:text-secondary-foreground text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}

              {isAuthenticated && user?.role === "admin" && (
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-accent hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Button>
                </Link>
              )}

              {isAuthenticated ? (
                <Button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  variant="outline"
                  className="retro-button bg-muted text-muted-foreground mt-2"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => window.location.href = getLoginUrl()}
                  className="retro-button bg-primary text-primary-foreground mt-2"
                >
                  Login
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
