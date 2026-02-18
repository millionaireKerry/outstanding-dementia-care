import { Link } from "wouter";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Ebooks", href: "/ebooks" },
    { name: "Support Groups", href: "/support" },
    { name: "Products", href: "/products" },
    { name: "Voice Assistant", href: "/voice-agent" },
  ];

  return (
    <header className="bg-card border-b-4 border-charcoal shadow-lg sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-12 h-12 rounded-full overflow-hidden retro-border">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/ecapYscKcjYtJDOg.png" 
                  alt="Outstanding Dementia Care Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Outstanding Dementia Care
                </h1>
                <p className="text-xs text-muted-foreground">Resources for Carers</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className="text-foreground hover:bg-secondary hover:text-secondary-foreground font-medium"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            
            {isAuthenticated && user?.role === "admin" && (
              <Link href="/admin">
                <Button
                  variant="ghost"
                  className="text-accent hover:bg-accent hover:text-accent-foreground font-medium"
                >
                  Admin
                </Button>
              </Link>
            )}

            {isAuthenticated ? (
              <Button
                onClick={() => logout()}
                variant="outline"
                className="ml-2 retro-button bg-muted text-muted-foreground hover:bg-muted/80"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => window.location.href = getLoginUrl()}
                className="ml-2 retro-button bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-border">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:bg-secondary hover:text-secondary-foreground"
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
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="retro-button bg-muted text-muted-foreground"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => window.location.href = getLoginUrl()}
                  className="retro-button bg-primary text-primary-foreground"
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
