import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Loader2, FileText } from "lucide-react";
import { useState } from "react";

export default function Ebooks() {
  const { data: ebooks, isLoading } = trpc.ebook.list.useQuery();
  const incrementDownload = trpc.ebook.incrementDownload.useMutation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ebooks
    ? ["all", ...Array.from(new Set(ebooks.map(e => e.category).filter((c): c is string => Boolean(c))))]
    : ["all"];

  const filteredEbooks = selectedCategory === "all"
    ? ebooks
    : ebooks?.filter(e => e.category === selectedCategory);

  const handleDownload = async (ebookId: number, fileUrl: string, title: string) => {
    try {
      await incrementDownload.mutateAsync({ id: ebookId });
      
      // Open PDF in new tab
      window.open(fileUrl, '_blank');
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center retro-border">
              <BookOpen size={32} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 retro-heading text-foreground">
            Free Ebook Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download comprehensive guides and resources for dementia care - completely free
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

        {/* Ebooks Grid */}
        {!isLoading && (
          <>
            {filteredEbooks && filteredEbooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEbooks.map((ebook) => (
                  <div key={ebook.id} className="retro-card p-6 flex flex-col h-full">
                    {/* Cover Image */}
                    {ebook.coverImageUrl ? (
                      <div className="mb-4 -mx-6 -mt-6">
                        <img
                          src={ebook.coverImageUrl}
                          alt={ebook.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 -mx-6 -mt-6 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                        <FileText size={64} className="text-primary/40" />
                      </div>
                    )}

                    {/* Category Badge */}
                    {ebook.category && (
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground rounded-full uppercase tracking-wide">
                          {ebook.category}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {ebook.title}
                    </h2>

                    {/* Description */}
                    {ebook.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {ebook.description}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pt-4 border-t border-border">
                      <span>{formatFileSize(ebook.fileSize ?? undefined)}</span>
                      <span>{ebook.downloadCount ?? 0} downloads</span>
                    </div>

                    {/* Download Button */}
                    <Button
                      onClick={() => handleDownload(ebook.id, ebook.fileUrl, ebook.title)}
                      className="retro-button bg-accent text-accent-foreground hover:bg-accent/90 w-full"
                      disabled={incrementDownload.isPending}
                    >
                      <Download className="mr-2" size={16} />
                      Download PDF
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText size={64} className="mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-lg text-muted-foreground">
                  {selectedCategory === "all" 
                    ? 'No ebooks available yet. Check back soon!' 
                    : `No ebooks found in the "${selectedCategory}" category.`}
                </p>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="mt-16 p-8 retro-card bg-gradient-to-r from-mint/20 to-peach/20 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Need More Support?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with support groups and communities dedicated to dementia care
          </p>
          <Link href="/support">
            <Button className="retro-button bg-primary text-primary-foreground">
              Find Support Groups
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
