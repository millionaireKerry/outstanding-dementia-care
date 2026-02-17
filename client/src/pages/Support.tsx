import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Users, ExternalLink, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Support() {
  const { data: groups, isLoading } = trpc.supportGroup.list.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = groups
    ? ["all", ...Array.from(new Set(groups.map(g => g.category).filter((c): c is string => Boolean(c))))]
    : ["all"];

  const filteredGroups = selectedCategory === "all"
    ? groups
    : groups?.filter(g => g.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center retro-border">
              <Users size={32} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 retro-heading text-foreground">
            Support Groups Directory
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with organizations and communities dedicated to dementia care and support
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category ? "retro-button bg-primary text-primary-foreground" : "retro-button bg-transparent"}
            >
              {category === "all" ? "All Categories" : category}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        )}

        {/* Support Groups List */}
        {!isLoading && (
          <>
            {filteredGroups && filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {filteredGroups.map((group) => (
                  <div key={group.id} className="retro-card p-6">
                    {/* Category Badge */}
                    {group.category && (
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground rounded-full uppercase tracking-wide">
                          {group.category}
                        </span>
                      </div>
                    )}

                    {/* Name */}
                    <h2 className="text-xl font-bold mb-3 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {group.name}
                    </h2>

                    {/* Description */}
                    {group.description && (
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {group.description}
                      </p>
                    )}

                    {/* Contact Information */}
                    <div className="space-y-2 mb-4 text-sm">
                      {(group.country || group.region) && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin size={16} className="flex-shrink-0" />
                          <span>
                            {[group.region, group.country].filter(Boolean).join(', ')}
                          </span>
                        </div>
                      )}
                      {group.contactEmail && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail size={16} className="flex-shrink-0" />
                          <a href={`mailto:${group.contactEmail}`} className="hover:text-primary transition-colors">
                            {group.contactEmail}
                          </a>
                        </div>
                      )}
                      {group.contactPhone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone size={16} className="flex-shrink-0" />
                          <a href={`tel:${group.contactPhone}`} className="hover:text-primary transition-colors">
                            {group.contactPhone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Visit Website Button */}
                    <a href={group.url} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="retro-button bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                        Visit Website
                        <ExternalLink className="ml-2" size={16} />
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users size={64} className="mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-lg text-muted-foreground">
                  {selectedCategory === "all" 
                    ? 'No support groups available yet. Check back soon!' 
                    : `No support groups found in the "${selectedCategory}" category.`}
                </p>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="mt-16 p-8 retro-card bg-gradient-to-r from-teal/20 to-mint/20 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Looking for Educational Resources?
          </h3>
          <p className="text-muted-foreground mb-6">
            Download our free ebooks and read expert articles on dementia care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/ebooks">
              <Button className="retro-button bg-accent text-accent-foreground">
                Browse Ebooks
              </Button>
            </a>
            <a href="/blog">
              <Button variant="outline" className="retro-button bg-transparent">
                Read Blog
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
