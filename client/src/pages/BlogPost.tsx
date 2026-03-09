import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Streamdown } from "streamdown";
import { useEffect } from "react";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery({ slug });

  // Update meta tags for social sharing
  useEffect(() => {
    if (post) {
      const url = `https://outstandingdementiacare.com/blog/${post.slug}`;
      const image = post.coverImageUrl || 'https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/logos/outstanding-dementia-care-logo.png';
      
      // Update title
      document.title = `${post.title} | Outstanding Dementia Care`;
      
      // Update or create meta tags
      const updateMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      // Open Graph tags
      updateMetaTag('og:type', 'article');
      updateMetaTag('og:url', url);
      updateMetaTag('og:title', post.title);
      updateMetaTag('og:description', post.excerpt || 'Read this article on Outstanding Dementia Care');
      updateMetaTag('og:image', image);
      
      // Twitter tags
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:url', url);
      updateMetaTag('twitter:title', post.title);
      updateMetaTag('twitter:description', post.excerpt || 'Read this article on Outstanding Dementia Care');
      updateMetaTag('twitter:image', image);

      // Canonical tag — tells Google the definitive URL for this page
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);

      return () => {
        // Reset canonical to homepage on unmount
        const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (link) link.setAttribute('href', 'https://outstandingdementiacare.com/');
        document.title = 'Outstanding Dementia Care - Resources for Carers';
      };
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="retro-button bg-primary text-primary-foreground">
              <ArrowLeft className="mr-2" size={16} />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {post.coverImageUrl && (
        <div className="w-full h-64 md:h-96 relative overflow-hidden">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
      )}

      <div className="container py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-primary hover:bg-primary/10">
              <ArrowLeft className="mr-2" size={16} />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto">
          {/* Category Badge */}
          {post.category && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-full uppercase tracking-wide">
                {post.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 retro-heading text-foreground">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b-2 border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={18} />
              <span>{post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}</span>
            </div>
            {post.tags && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag size={18} />
                <span>{post.tags}</span>
              </div>
            )}
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="mb-8 p-6 bg-secondary/20 rounded-lg border-l-4 border-secondary">
              <p className="text-lg text-foreground italic">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <Streamdown>{post.content}</Streamdown>
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 pt-8 border-t-2 border-border">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto mt-16 p-8 retro-card bg-gradient-to-r from-primary/10 to-secondary/10">
          <h3 className="text-2xl font-bold mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Want to Learn More?
          </h3>
          <p className="text-muted-foreground mb-6">
            Explore our free ebooks and resources for comprehensive dementia care guidance.
          </p>
          <Link href="/ebooks">
            <Button className="retro-button bg-primary text-primary-foreground">
              Browse Free Resources
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
