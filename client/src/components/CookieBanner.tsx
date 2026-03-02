import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "odc_cookie_consent";

type ConsentState = "accepted" | "declined" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentState;
    if (stored) {
      setConsent(stored);
      setVisible(false);
    } else {
      // Small delay so banner doesn't flash immediately on page load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  if (!visible || consent !== null) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <div className="max-w-4xl mx-auto bg-card border-2 border-primary rounded-lg shadow-2xl p-5 md:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Cookie size={20} className="text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="retro-subheading text-base text-foreground mb-2">
              We use cookies 🍪
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to improve your experience, analyse how our site is used, and to display 
              relevant advertisements via Google AdSense. Essential cookies are always active as they 
              are needed for the site to function. By clicking "Accept All", you consent to our use of 
              analytics and advertising cookies. You can read more in our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={handleAccept}
                className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleDecline}
                className="px-5 py-2.5 bg-transparent border-2 border-border text-foreground text-sm font-semibold rounded-md hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Essential Only
              </button>
              <Link
                href="/privacy-policy"
                className="px-5 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center sm:justify-start"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleDecline}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="Close cookie banner"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
