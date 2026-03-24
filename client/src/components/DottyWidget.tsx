import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { X, Send, MessageCircle } from "lucide-react";

const DOTTY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/Gemini_Generated_Image_wcw92lwcw92lwcw9_cdd40860.webp";
const BOOKING_URL = "https://calendar.app.google/r1FrZpnQRMx9q6N57";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Detect if message contains contact details to trigger enquiry submission
function extractContactInfo(history: Message[]): { name?: string; email?: string; phone?: string } {
  const allText = history.map(m => m.content).join(" ");
  const emailMatch = allText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = allText.match(/(\+?[\d\s\-().]{10,})/);
  // Try to extract a name from "I'm [name]" or "my name is [name]"
  const nameMatch = allText.match(/(?:i'm|i am|my name is|name is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  return {
    email: emailMatch?.[0],
    phone: phoneMatch?.[0]?.trim(),
    name: nameMatch?.[1],
  };
}

export default function DottyWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello love! I'm Dotty 👋 I can answer questions about Outstanding Dementia Care, tell you about our free resources, training, and products — or help you get in touch with Kerry. What can I do for you today? 🌸",
    },
  ]);
  const [input, setInput] = useState("");
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.enquiry.widgetChat.useMutation({
    onSuccess: (data) => {
      const reply = data.reply;
      setMessages(prev => {
        const updated = [...prev, { role: "assistant" as const, content: reply }];
        // Check if contact details have been shared and submit enquiry
        if (!enquirySubmitted) {
          const info = extractContactInfo(updated);
          if (info.email) {
            const userMessages = updated.filter(m => m.role === "user").map(m => m.content).join(" | ");
            submitEnquiry.mutate({
              name: info.name || "Website Visitor",
              email: info.email,
              phone: info.phone || "",
              message: userMessages,
            });
            setEnquirySubmitted(true);
          }
        }
        return updated;
      });
    },
    onError: () => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Ooh, sorry love — something went a bit wonky on my end! Try again in a moment. 🌸",
      }]);
    },
  });

  const submitEnquiry = trpc.enquiry.submit.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || chatMutation.isPending) return;
    const newMessage: Message = { role: "user", content: text };
    const newHistory = [...messages, newMessage];
    setMessages(newHistory);
    setInput("");
    chatMutation.mutate({
      message: text,
      history: messages,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 shadow-2xl rounded-full pr-4 pl-1 py-1 border-2"
          style={{ background: "#F5F0E8", borderColor: "var(--forest-green)" }}
          aria-label="Chat with Dotty"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold flex-shrink-0">
            <img src={DOTTY_IMG} alt="Dotty" className="w-full h-full object-cover" style={{ objectPosition: "center 15%" }} />
          </div>
          <div className="text-left">
            <p className="font-bold text-base leading-tight" style={{ fontFamily: "var(--font-retro)", color: "var(--forest-green)" }}>Chat with Dotty</p>
            <p className="text-sm leading-tight font-semibold" style={{ color: "#1a1a1a" }}>Ask me anything! ✨</p>
          </div>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[340px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl border-2 border-gold overflow-hidden flex flex-col"
          style={{ height: "480px", background: "var(--cream)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: "var(--forest-green)" }}>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold flex-shrink-0">
              <img src={DOTTY_IMG} alt="Dotty" className="w-full h-full object-cover" style={{ objectPosition: "center 15%" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-retro)" }}>Dotty</p>
              <p className="text-gold text-xs">Outstanding Dementia Care</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-gold flex-shrink-0 mt-1">
                    <img src={DOTTY_IMG} alt="Dotty" className="w-full h-full object-cover" style={{ objectPosition: "center 15%" }} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-tr-sm"
                      : "border border-gold/30 text-charcoal rounded-tl-sm"
                  }`}
                  style={
                    msg.role === "user"
                      ? { background: "var(--forest-green)" }
                      : { background: "white" }
                  }
                >
                  {msg.content}
                  {msg.role === "assistant" && i === messages.length - 1 && (
                    <div className="mt-2 pt-2 border-t border-gold/20">
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold underline"
                        style={{ color: "var(--forest-green)" }}
                      >
                        📅 Book a free 30-min call with Kerry
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {chatMutation.isPending && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-gold flex-shrink-0 mt-1">
                  <img src={DOTTY_IMG} alt="Dotty" className="w-full h-full object-cover" style={{ objectPosition: "center 15%" }} />
                </div>
                <div className="bg-white border border-gold/30 rounded-2xl rounded-tl-sm px-3 py-2">
                  <div className="flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--forest-green)" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--forest-green)", animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--forest-green)", animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-gold/30 p-3 bg-white">
            <div className="flex gap-2 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 resize-none text-xs border border-gold/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gold bg-cream"
                style={{ minHeight: "40px", maxHeight: "80px", background: "var(--cream)" }}
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || chatMutation.isPending}
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-40 transition-opacity"
                style={{ background: "var(--forest-green)" }}
                aria-label="Send message"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              Or email <a href="mailto:Kerry@outstandingdementiacare.com" className="underline" style={{ color: "var(--forest-green)" }}>Kerry@outstandingdementiacare.com</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
