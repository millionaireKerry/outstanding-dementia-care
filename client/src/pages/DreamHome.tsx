import { useState } from "react";
import { dreamHomeData, DreamHomeCard } from "@/data/dreamHomeData";
import { X, ChevronDown, ChevronUp, Home, Flower2, Sparkles, Eye } from "lucide-react";

const categoryColors: Record<string, string> = {
  Room: "bg-teal-100 text-teal-800 border-teal-300",
  Corridor: "bg-amber-100 text-amber-800 border-amber-300",
  Outdoor: "bg-green-100 text-green-800 border-green-300",
  Feature: "bg-rose-100 text-rose-800 border-rose-300",
};

const categoryIcons: Record<string, React.ReactNode> = {
  Room: <Home className="w-3 h-3" />,
  Corridor: <Sparkles className="w-3 h-3" />,
  Outdoor: <Flower2 className="w-3 h-3" />,
  Feature: <Eye className="w-3 h-3" />,
};

function SensoryBadge({ text }: { text: string }) {
  const [sense, ...rest] = text.split(": ");
  const icons: Record<string, string> = {
    Visual: "👁",
    Auditory: "👂",
    Tactile: "🤲",
    Olfactory: "👃",
  };
  return (
    <div className="flex items-start gap-2 text-sm text-muted-foreground">
      <span className="text-base leading-none mt-0.5">{icons[sense] || "•"}</span>
      <span>
        <strong className="text-foreground">{sense}:</strong> {rest.join(": ")}
      </span>
    </div>
  );
}

function CardModal({ card, onClose }: { card: DreamHomeCard; onClose: () => void }) {
  const [showSensory, setShowSensory] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-card rounded-2xl shadow-2xl border-4 border-charcoal max-w-2xl w-full my-8 overflow-hidden">
        {/* Header image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-1.5 text-charcoal shadow-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border mb-2 ${categoryColors[card.category]}`}
            >
              {categoryIcons[card.category]}
              {card.category}
            </span>
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {card.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-muted-foreground leading-relaxed">{card.shortDescription}</p>

          {/* How to achieve */}
          <div>
            <h3
              className="text-lg font-bold text-foreground mb-3 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">✓</span>
              How to Achieve It
            </h3>
            <ul className="space-y-2">
              {card.howToAchieve.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sensory immersion toggle */}
          <div className="border-2 border-border rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 bg-secondary/50 hover:bg-secondary/80 transition-colors text-left"
              onClick={() => setShowSensory(!showSensory)}
            >
              <span className="font-semibold text-foreground flex items-center gap-2">
                <span>🌟</span> Making It Fully Immersive
              </span>
              {showSensory ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            {showSensory && (
              <div className="px-4 py-4 space-y-3 bg-card">
                <p className="text-xs text-muted-foreground italic mb-3">
                  Engaging all five senses deepens the reminiscence experience and increases wellbeing.
                </p>
                {card.sensoryImmersion.map((item, i) => (
                  <SensoryBadge key={i} text={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DreamHomeCardTile({ card, onClick }: { card: DreamHomeCard; onClick: () => void }) {
  return (
    <button
      className="group text-left bg-card border-2 border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/40"
      onClick={onClick}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border ${categoryColors[card.category]}`}
        >
          {categoryIcons[card.category]}
          {card.category}
        </span>
      </div>
      <div className="p-4">
        <h3
          className="font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {card.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {card.shortDescription}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
          See how to create this →
        </span>
      </div>
    </button>
  );
}

const categories = ["All", "Room", "Corridor", "Outdoor", "Feature"] as const;

export default function DreamHome() {
  const [selectedCard, setSelectedCard] = useState<DreamHomeCard | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? dreamHomeData
      : dreamHomeData.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-3">
            Outstanding Dementia Care
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Dream Home
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            A tour of what the perfect dementia-friendly care home could look like — and exactly
            how to make it a reality using paint, wallpaper, props, and a little imagination.
          </p>
          <p className="mt-4 text-sm opacity-75 max-w-xl mx-auto">
            Click on any card to discover how to achieve that space, and how to make it a
            fully immersive experience for residents using all five senses.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-20 z-30 bg-card border-b-2 border-border shadow-sm py-3">
        <div className="container flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat === "All" ? `All (${dreamHomeData.length})` : `${cat}s`}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((card) => (
              <DreamHomeCardTile
                key={card.id}
                card={card}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No items in this category yet.</p>
          )}
        </div>
      </section>

      {/* Closing section */}
      <section className="py-14 bg-secondary/30 border-t-4 border-charcoal">
        <div className="container text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Every Home Can Be Outstanding
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            None of these spaces require major building work or enormous budgets. With creativity,
            the right props, and a commitment to person-centred care, any care home can create
            environments that genuinely enrich the lives of people living with dementia.
          </p>
        </div>
      </section>

      {/* Modal */}
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
}
