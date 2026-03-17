import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Save, X, Download } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

type Ebook = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  coverImageUrl?: string | null;
  fileUrl: string;
  fileKey: string;
  fileSize?: number | null;
  category?: string | null;
  tags?: string | null;
  published: boolean;
  downloadCount: number;
  authorId?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  coverImageUrl: "",
  fileUrl: "",
  fileKey: "",
  fileSize: undefined as number | undefined,
  category: "",
  tags: "",
  published: false,
};

export default function AdminEbooks() {
  const { user, isAuthenticated } = useAuth();
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const { data: ebooks, isLoading, refetch } = trpc.ebook.listAll.useQuery();
  const createMutation = trpc.ebook.create.useMutation({
    onSuccess: () => { toast.success("Ebook created!"); refetch(); setShowForm(false); setForm(emptyForm); },
    onError: (e) => toast.error(e.message),
  });
  const updateMutation = trpc.ebook.update.useMutation({
    onSuccess: () => { toast.success("Ebook updated!"); refetch(); setEditingEbook(null); setShowForm(false); setForm(emptyForm); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.ebook.delete.useMutation({
    onSuccess: () => { toast.success("Ebook deleted!"); refetch(); },
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

  const handleEdit = (ebook: Ebook) => {
    setEditingEbook(ebook);
    setForm({
      title: ebook.title,
      slug: ebook.slug,
      description: ebook.description ?? "",
      coverImageUrl: ebook.coverImageUrl ?? "",
      fileUrl: ebook.fileUrl,
      fileKey: ebook.fileKey,
      fileSize: ebook.fileSize ?? undefined,
      category: ebook.category ?? "",
      tags: ebook.tags ?? "",
      published: ebook.published,
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingEbook(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.slug || !form.fileUrl || !form.fileKey) {
      toast.error("Title, slug, file URL and file key are required.");
      return;
    }
    if (editingEbook) {
      updateMutation.mutate({ id: editingEbook.id, ...form });
    } else {
      createMutation.mutate({ ...form, fileUrl: form.fileUrl, fileKey: form.fileKey });
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
          <h1 className="text-3xl font-bold retro-heading text-foreground">Ebook Library</h1>
          <div className="ml-auto">
            <Button onClick={handleNew} className="retro-button bg-primary text-primary-foreground">
              <Plus className="mr-2" size={16} /> Add Ebook
            </Button>
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-800">
          <strong>How to add an ebook PDF:</strong> Upload your PDF to a file hosting service (e.g. Google Drive, Dropbox, or your CDN), then paste the direct download URL and a file key (any unique identifier) below. The file URL must be a direct link to the PDF file.
        </div>

        {/* Form */}
        {showForm && (
          <Card className="retro-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{editingEbook ? "Edit Ebook" : "Add New Ebook"}</span>
                <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditingEbook(null); setForm(emptyForm); }}>
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
                    placeholder="Ebook title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Slug *</label>
                  <Input
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    placeholder="ebook-url-slug"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Input
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of the ebook"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">PDF File URL * (direct download link)</label>
                  <Input
                    value={form.fileUrl}
                    onChange={e => setForm(f => ({ ...f, fileUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">File Key * (unique identifier)</label>
                  <Input
                    value={form.fileKey}
                    onChange={e => setForm(f => ({ ...f, fileKey: e.target.value }))}
                    placeholder="e.g. ebooks/my-ebook.pdf"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Cover Image URL</label>
                  <Input
                    value={form.coverImageUrl}
                    onChange={e => setForm(f => ({ ...f, coverImageUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Input
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    placeholder="e.g. Carer Guides"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tags (comma-separated)</label>
                  <Input
                    value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    placeholder="dementia, guide, free"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published-ebook"
                  checked={form.published}
                  onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="published-ebook" className="text-sm font-medium">Published (visible on site)</label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSubmit} disabled={isPending} className="retro-button bg-primary text-primary-foreground">
                  {isPending ? <><Loader2 className="mr-2 animate-spin" size={16} />Saving...</> : <><Save className="mr-2" size={16} />{editingEbook ? "Update Ebook" : "Add Ebook"}</>}
                </Button>
                <Button variant="outline" onClick={() => { setShowForm(false); setEditingEbook(null); setForm(emptyForm); }}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ebooks list */}
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={40} /></div>
        ) : (
          <div className="space-y-3">
            {ebooks && ebooks.length > 0 ? ebooks.map((ebook) => (
              <Card key={ebook.id} className="retro-border">
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-foreground truncate">{ebook.title}</h3>
                      <Badge variant={ebook.published ? "default" : "secondary"} className="shrink-0">
                        {ebook.published ? "Published" : "Draft"}
                      </Badge>
                      {ebook.category && <Badge variant="outline" className="shrink-0">{ebook.category}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{ebook.fileUrl}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Download size={12} className="inline mr-1" />{ebook.downloadCount} downloads
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(ebook as Ebook)} title="Edit">
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      title="Delete"
                      onClick={() => {
                        if (confirm(`Delete "${ebook.title}"? This cannot be undone.`)) {
                          deleteMutation.mutate({ id: ebook.id });
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
                <p className="mb-4">No ebooks yet.</p>
                <Button onClick={handleNew} className="retro-button bg-primary text-primary-foreground">
                  <Plus className="mr-2" size={16} /> Add Your First Ebook
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
