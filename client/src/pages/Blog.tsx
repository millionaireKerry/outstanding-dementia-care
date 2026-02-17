import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Tag, Loader2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import AdSense from "@/components/AdSense";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const { data: searchResults, isLoading: isSearching } = trpc.blog.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 0 }
  );

  const displayPosts = searchQuery.length > 0 ? searchResults : posts;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 retro-heading text-foreground">
            Dementia Care Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights and practical advice from 10 years of dementia care experience
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 retro-border bg-card"
            />
          </div>
        </div>

        {/* Loading State */}
        {(isLoading || isSearching) && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        )}

        {/* AdSense - Top of page */}
        <div className="mb-8">
          <AdSense slot="blog-top" format="horizontal" />
        </div>

        {/* Blog Posts Grid */}
        {!isLoading && !isSearching && (
          <>
            {displayPosts && displayPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="retro-card p-6 cursor-pointer h-full flex flex-col">
                      {post.coverImageUrl && (
                        <div className="mb-4 -mx-6 -mt-6">
                          <img
                            src={post.coverImageUrl}
                            alt={post.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        </div>
                      )}
                      
                      {post.category && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full uppercase tracking-wide">
                            {post.category}
                          </span>
                        </div>
                      )}

                      <h2 className="text-xl font-bold mb-3 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : 'Draft'}</span>
                        </div>
                        {post.tags && (
                          <div className="flex items-center gap-1">
                            <Tag size={14} />
                            <span className="truncate">{post.tags.split(',')[0]}</span>
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {searchQuery ? 'No articles found matching your search.' : 'No blog posts available yet.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
