import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Save, X, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

type SupportGroup = {
  id: number;
  name: string;
  description?: string | null;
  url?: string | null;
  region?: string | null;
  category?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const emptyForm = {
  name: "",
  description: "",
  url: "",
  region: "",
  category: "",
  contactEmail: "",
  contactPhone: "",
  published: false,
};

export default function AdminSupport() {
  const { user, isAuthenticated } = useAuth();
  const [editingGroup, setEditingGroup] = useState<SupportGroup | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const { data: groups, isLoading, refetch } = trpc.supportGroup.listAll.useQuery();
  const createMutation = trpc.supportGroup.create.useMutation({
    onSuccess: () => { toast.success("Support group added!"); refetch(); setShowForm(false); setForm(emptyForm); },
    onError: (e) => toast.error(e.message),
  });
  const updateMutation = trpc.supportGroup.update.useMutation({
    onSuccess: () => { toast.success("Support group updated!"); refetch(); setEditingGroup(null); setShowForm(false); setForm(emptyForm); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.supportGroup.delete.useMutation({
    onSuccess: () => { toast.success("Support group deleted!"); refetch(); },
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

  const handleEdit = (group: SupportGroup) => {
    setEditingGroup(group);
    setForm({
      name: group.name,
      description: group.description ?? "",
      url: group.url ?? "",
      region: group.region ?? "",
      category: group.category ?? "",
      contactEmail: group.contactEmail ?? "",
      contactPhone: group.contactPhone ?? "",
      published: group.published,
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingGroup(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.name) {
      toast.error("Name is required.");
      return;
    }
    if (editingGroup) {
      updateMutation.mutate({ id: editingGroup.id, ...form });
    } else {
      createMutation.mutate(form);
    }
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
          <h1 className="text-3xl font-bold retro-heading text-foreground">Support Groups</h1>
          <div className="ml-auto">
            <Button onClick={handleNew} className="retro-button bg-primary text-primary-foreground">
              <Plus className="mr-2" size={16} /> Add Group
            </Button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="retro-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{editingGroup ? "Edit Support Group" : "Add Support Group"}</span>
                <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditingGroup(null); setForm(emptyForm); }}>
                  <X size={18} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name *</label>
                <Input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Organisation or group name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Input
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of the support group"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Website URL</label>
                  <Input
                    value={form.url}
                    onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Region</label>
                  <Input
                    value={form.region}
                    onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                    placeholder="e.g. UK-wide, London, North West"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Input
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    placeholder="e.g. Carer Support, Online"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Contact Email</label>
                  <Input
                    value={form.contactEmail}
                    onChange={e => setForm(f => ({ ...f, contactEmail: e.target.value }))}
                    placeholder="info@example.org"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Contact Phone</label>
                  <Input
                    value={form.contactPhone}
                    onChange={e => setForm(f => ({ ...f, contactPhone: e.target.value }))}
                    placeholder="0800 123 456"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published-group"
                  checked={form.published}
                  onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="published-group" className="text-sm font-medium">Published (visible on site)</label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSubmit} disabled={isPending} className="retro-button bg-primary text-primary-foreground">
                  {isPending ? <><Loader2 className="mr-2 animate-spin" size={16} />Saving...</> : <><Save className="mr-2" size={16} />{editingGroup ? "Update Group" : "Add Group"}</>}
                </Button>
                <Button variant="outline" onClick={() => { setShowForm(false); setEditingGroup(null); setForm(emptyForm); }}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Groups list */}
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={40} /></div>
        ) : (
          <div className="space-y-3">
            {groups && groups.length > 0 ? groups.map((group) => (
              <Card key={group.id} className="retro-border">
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-foreground truncate">{group.name}</h3>
                      <Badge variant={group.published ? "default" : "secondary"} className="shrink-0">
                        {group.published ? "Published" : "Draft"}
                      </Badge>
                      {group.region && <Badge variant="outline" className="shrink-0">{group.region}</Badge>}
                      {group.category && <Badge variant="outline" className="shrink-0">{group.category}</Badge>}
                    </div>
                    {group.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{group.description}</p>}
                    {group.url && (
                      <a href={group.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 mt-1">
                        <ExternalLink size={10} />{group.url}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(group as SupportGroup)} title="Edit">
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      title="Delete"
                      onClick={() => {
                        if (confirm(`Delete "${group.name}"? This cannot be undone.`)) {
                          deleteMutation.mutate({ id: group.id });
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
                <p className="mb-4">No support groups yet.</p>
                <Button onClick={handleNew} className="retro-button bg-primary text-primary-foreground">
                  <Plus className="mr-2" size={16} /> Add Your First Support Group
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
