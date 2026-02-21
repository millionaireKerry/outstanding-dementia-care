import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, Check } from "lucide-react";


interface NewsletterSignupProps {
  source?: string;
  variant?: "default" | "compact";
}

export default function NewsletterSignup({ source = "footer", variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setIsSubscribed(true);
        setEmail("");
        setName("");
        setMessage({ type: 'success', text: data.message || "Thank you for subscribing to our newsletter!" });
      } else {
        setMessage({ type: 'success', text: data.message || "This email is already on our mailing list." });
      }
    },
    onError: (error) => {
      setMessage({ type: 'error', text: error.message || "Please try again later." });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    subscribe.mutate({ email, name, source });
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-2 text-accent">
        <Check className="h-5 w-5" />
        <p className="text-sm">You're subscribed! Check your inbox.</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="max-w-2xl">
        <h4 className="text-sm font-semibold mb-3 text-foreground uppercase tracking-wide flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Newsletter
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          Get updates on new blog posts, ebooks, and resources
        </p>
        {message && (
          <div className={`p-2 rounded mb-3 text-sm ${message.type === 'success' ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="retro-border bg-card"
            disabled={subscribe.isPending}
          />
          <Button 
            type="submit" 
            disabled={subscribe.isPending}
            className="retro-button"
          >
            {subscribe.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="retro-card p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-accent/20 rounded-full">
          <Mail className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Stay Updated</h3>
          <p className="text-muted-foreground">Get the latest dementia care resources delivered to your inbox</p>
        </div>
      </div>
      
      {message && (
        <div className={`p-3 rounded-lg mb-4 ${message.type === 'success' ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'}`}>
          <p className="text-sm">{message.text}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="retro-border bg-card"
            disabled={subscribe.isPending}
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="retro-border bg-card"
            disabled={subscribe.isPending}
          />
        </div>
        <Button 
          type="submit" 
          disabled={subscribe.isPending}
          className="retro-button w-full"
          size="lg"
        >
          {subscribe.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Subscribe to Newsletter
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          We'll send you updates about new blog posts, ebooks, and resources. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
