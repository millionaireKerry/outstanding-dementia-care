import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, BookOpen, Lightbulb, MessageSquare, X } from "lucide-react";

const DOTTY_RECORD_SHOP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/dotty-record-shop_3c717b45.webp";
const DOTTY_ON_BUS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/dotty-on-bus_d86f8e2c.webp";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  { label: "🥞 Pancake Day activities", message: "What activities would be good for Pancake Day with residents who have dementia?" },
  { label: "👨 Activities for gentlemen", message: "What activities would be good for gentlemen with dementia?" },
  { label: "🌸 Spring activities", message: "Can you suggest some lovely spring activities for people living with dementia?" },
  { label: "🎵 Music quiz", message: "Can you give me a music quiz for people who grew up in the 1950s and 60s?" },
  { label: "🌹 1950s reminiscence", message: "What reminiscence prompts would work well for people who remember the 1950s?" },
  { label: "🎄 Christmas activities", message: "What Christmas activities would work well for people with advanced dementia?" },
];

function formatDottyMessage(text: string) {
  // Convert markdown-style formatting to JSX
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("Q:") || line.startsWith("A:")) {
      const isQ = line.startsWith("Q:");
      return (
        <div key={i} className={`my-1 ${isQ ? "font-semibold text-forest-green" : "text-charcoal pl-4 border-l-2 border-gold"}`}>
          {line}
        </div>
      );
    }
    if (line.match(/^\d+\./)) {
      return <div key={i} className="my-1 pl-2">{line}</div>;
    }
    if (line.startsWith("**") && line.endsWith("**")) {
      return <div key={i} className="font-bold my-1">{line.slice(2, -2)}</div>;
    }
    if (line === "") return <div key={i} className="my-2" />;
    return <div key={i}>{line}</div>;
  });
}

export default function AskDotty() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.dotty.chat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Ooh, sorry love — something's gone a bit wonky on my end! Give me a moment and try again, there's a dear. 🌸"
      }]);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (messageText?: string) => {
    const text = messageText ?? input.trim();
    if (!text || chatMutation.isPending) return;

    if (!hasStarted) setHasStarted(true);

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
  useEffect(() => {
    document.title = "Ask Dotty | Outstanding Dementia Care";
    return () => { document.title = "Outstanding Dementia Care - Resources for Carers"; };
  }, []);


  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Hero Header */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2D5016 0%, #4a7c2f 50%, #2D5016 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)"
        }} />
        <div className="container py-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Dotty image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gold shadow-2xl">
                  <img
                    src={DOTTY_ON_BUS}
                    alt="Dotty, your dementia care guide"
                    className="w-full h-full object-cover object-top"
                    style={{ objectPosition: "center 15%" }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gold text-charcoal text-xs font-bold px-2 py-1 rounded-full border-2 border-white shadow">
                  ✨ Time Traveller
                </div>
              </div>
            </div>

            {/* Intro text */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-retro)" }}>
                Ask Dotty
              </h1>
              <p className="text-gold text-lg font-semibold mb-3">
                Your cheeky, time-travelling dementia care companion
              </p>
              <p className="text-white/90 text-sm max-w-xl leading-relaxed">
                Dotty has seen it all — from the Blitz to the Beatles, from ration books to rock 'n' roll. 
                She's travelled through time so you don't have to, and she's here to help you plan brilliant 
                activities, create quizzes, and spark wonderful memories for the people in your care.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What Dotty can do */}
      {!hasStarted && (
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-5 border-2 border-gold/30 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-forest-green" />
                </div>
                <h3 className="font-bold text-charcoal" style={{ fontFamily: "var(--font-retro)" }}>Activity Ideas</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ask Dotty for activity ideas for any occasion, season, or group — she'll give you practical suggestions you can use today.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border-2 border-gold/30 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-forest-green" />
                </div>
                <h3 className="font-bold text-charcoal" style={{ fontFamily: "var(--font-retro)" }}>Quiz Generator</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Give Dotty a topic and she'll create a ready-to-use quiz with questions and answers — perfect for activities sessions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border-2 border-gold/30 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-forest-green" />
                </div>
                <h3 className="font-bold text-charcoal" style={{ fontFamily: "var(--font-retro)" }}>Reminiscence Prompts</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Dotty knows her history! Ask her for conversation starters and reminiscence prompts from any decade.
              </p>
            </div>
          </div>

          {/* Quick prompts */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-charcoal mb-3 text-center" style={{ fontFamily: "var(--font-retro)" }}>
              ✨ Try asking Dotty...
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => sendMessage(prompt.message)}
                  className="px-4 py-2 rounded-full text-sm font-medium border-2 border-forest-green text-forest-green bg-white hover:bg-forest-green hover:text-white transition-colors"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat area */}
      <div className="container pb-8">
        <div className="max-w-3xl mx-auto">
          {/* Messages */}
          {messages.length > 0 && (
            <div className="bg-white rounded-2xl border-2 border-gold/30 shadow-lg mb-4 overflow-hidden">
              {/* Chat header */}
              <div className="bg-forest-green px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gold flex-shrink-0">
                  <img src={DOTTY_ON_BUS} alt="Dotty" className="w-full h-full object-cover" style={{ objectPosition: "center 15%" }} />
                </div>
                <span className="text-white font-semibold text-sm">Chatting with Dotty</span>
                <Sparkles className="w-4 h-4 text-gold ml-1" />
                <button
                  onClick={() => { setMessages([]); setHasStarted(false); }}
                  className="ml-auto flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/40 transition-colors"
                  title="Close chat"
                  aria-label="Close chat and start over"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>

              {/* Messages list */}
              <div className="p-5 space-y-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gold flex-shrink-0 mt-1">
                        <img src={DOTTY_RECORD_SHOP} alt="Dotty" className="w-full h-full object-cover" style={{ objectPosition: "center 10%" }} />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-forest-green text-white rounded-tr-sm"
                          : "bg-cream border border-gold/30 text-charcoal rounded-tl-sm"
                      }`}
                      style={msg.role === "assistant" ? { background: "var(--cream)" } : {}}
                    >
                      {msg.role === "assistant" ? formatDottyMessage(msg.content) : msg.content}
                    </div>
                  </div>
                ))}

                {chatMutation.isPending && (
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gold flex-shrink-0 mt-1">
                      <img src={DOTTY_RECORD_SHOP} alt="Dotty" className="w-full h-full object-cover" style={{ objectPosition: "center 10%" }} />
                    </div>
                    <div className="bg-cream border border-gold/30 rounded-2xl rounded-tl-sm px-4 py-3" style={{ background: "var(--cream)" }}>
                      <div className="flex gap-1 items-center">
                        <div className="w-2 h-2 bg-forest-green rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-forest-green rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-forest-green rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        <span className="text-xs text-muted-foreground ml-2">Dotty's thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Quick prompts when chat has started */}
          {hasStarted && messages.length > 0 && !chatMutation.isPending && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {QUICK_PROMPTS.slice(0, 3).map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => sendMessage(prompt.message)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-forest-green text-forest-green bg-white hover:bg-forest-green hover:text-white transition-colors"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="bg-white rounded-2xl border-2 border-gold/30 shadow-lg p-4">
            <div className="flex gap-3 items-end">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Dotty anything... 'What activities would be good for Mother's Day?' or 'Give me a 1960s music quiz!'"
                className="flex-1 resize-none border-0 focus-visible:ring-0 text-sm min-h-[60px] max-h-[120px] p-0 bg-transparent"
                rows={2}
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || chatMutation.isPending}
                className="flex-shrink-0 w-11 h-11 rounded-full p-0"
                style={{ background: "var(--forest-green)" }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send · Shift+Enter for a new line
            </p>
          </div>

          {/* Dotty image strip at bottom */}
          <div className="mt-8 flex items-center gap-4 justify-center opacity-60">
            <img src={DOTTY_RECORD_SHOP} alt="Dotty at the record shop" className="w-20 h-20 rounded-full object-cover border-2 border-gold" style={{ objectPosition: "center 10%" }} />
            <p className="text-xs text-muted-foreground italic max-w-xs text-center">
              "I've been to the past, love, and I'll tell you this — a good activity and a bit of music can work wonders. Now, what can Dotty help you with?" 🌸
            </p>
            <img src={DOTTY_ON_BUS} alt="Dotty on the bus" className="w-20 h-20 rounded-full object-cover border-2 border-gold" style={{ objectPosition: "center 15%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
