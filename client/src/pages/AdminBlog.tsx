import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Save, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  category?: string | null;
  tags?: string | null;
  published: boolean;
  coverImageUrl?: string | null;
  authorId?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  coverImageUrl: "",
  published: false,
};

export default function AdminBlog() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const { data: posts, isLoading, refetch } = trpc.blog.listAll.useQuery();
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => { toast.success("Blog post created!"); refetch(); setShowForm(false); setForm(emptyForm); },
    onError: (e) => toast.error(e.message),
  });
  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => { toast.success("Blog post updated!"); refetch(); setEditingPost(null); setShowForm(false); setForm(emptyForm); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => { toast.success("Blog post deleted!"); refetch(); },
    onError: (e) => toast.error(e.message),
  });

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <Link href="/"><Button>Back to Home</Button></Link>
        </div>
      </div>
    );
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content,
      category: post.category ?? "",
      tags: post.tags ?? "",
      coverImageUrl: post.coverImageUrl ?? "",
      published: post.published,
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.slug || !form.content) {
      toast.error("Title, slug and content are required.");
      return;
    }
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleSlugify = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setForm(f => ({ ...f, slug }));
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container max-w-5xl">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" className="text-primary hover:bg-primary/10">
              <ArrowLeft className="mr-2" size={16} /> Back to Admin
            </Button>
          </Link>
          <h1 className="text-3xl font-bold retro-heading text-foreground">Blog Posts</h1>
          <div className="ml-auto">
            <Button onClick={handleNew} className="retro-button bg-primary text-primary-foreground">
              <Plus className="mr-2" size={16} /> New Post
            </Button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="retro-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{editingPost ? "Edit Post" : "New Blog Post"}</span>
                <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditingPost(null); setForm(emptyForm); }}>
                  <X size={18} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title *</label>
                  <Input
                    value={form.title}
                    onChange={e => { setForm(f => ({ ...f, title: e.target.value })); handleSlugify(e.target.value); }}
                    placeholder="Post title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Slug *</label>
                  <Input
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    placeholder="post-url-slug"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Excerpt</label>
                <Input
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Short description (shown in blog listing)"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Content * (Markdown supported)</label>
                <textarea
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  placeholder="Write your blog post content here. Markdown is supported."
                  className="w-full min-h-[300px] p-3 border-2 border-border rounded-lg text-sm font-mono bg-background text-foreground focus:outline-none focus:border-primary resize-y"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Input
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    placeholder="e.g. Carer Tips"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tags (comma-separated)</label>
                  <Input
                    value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    placeholder="dementia, care, tips"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Cover Image URL</label>
                  <Input
                    value={form.coverImageUrl}
                    onChange={e => setForm(f => ({ ...f, coverImageUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="published" className="text-sm font-medium">Published (visible on site)</label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSubmit} disabled={isPending} className="retro-button bg-primary text-primary-foreground">
                  {isPending ? <><Loader2 className="mr-2 animate-spin" size={16} />Saving...</> : <><Save className="mr-2" size={16} />{editingPost ? "Update Post" : "Create Post"}</>}
                </Button>
                <Button variant="outline" onClick={() => { setShowForm(false); setEditingPost(null); setForm(emptyForm); }}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts list */}
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={40} /></div>
        ) : (
          <div className="space-y-3">
            {posts && posts.length > 0 ? posts.map((post) => (
              <Card key={post.id} className="retro-border">
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                      <Badge variant={post.published ? "default" : "secondary"} className="shrink-0">
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                      {post.category && <Badge variant="outline" className="shrink-0">{post.category}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">/blog/{post.slug}</p>
                    {post.excerpt && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {post.published ? (
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" title="View post"><Eye size={16} /></Button>
                      </a>
                    ) : (
                      <Button variant="ghost" size="sm" disabled title="Draft — not visible"><EyeOff size={16} /></Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(post as BlogPost)} title="Edit">
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      title="Delete"
                      onClick={() => {
                        if (confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                          deleteMutation.mutate({ id: post.id });
                        }
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-4">No blog posts yet.</p>
                <Button onClick={handleNew} className="retro-button bg-primary text-primary-foreground">
                  <Plus className="mr-2" size={16} /> Create Your First Post
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
