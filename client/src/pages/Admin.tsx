import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { BookOpen, FileText, Users, ArrowLeft } from "lucide-react";

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Check if user is admin
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center retro-card p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You need admin privileges to access this page.
          </p>
          <Link href="/">
            <Button className="retro-button bg-primary text-primary-foreground">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const adminSections = [
    {
      title: "Blog Posts",
      description: "Create and manage blog articles",
      icon: BookOpen,
      href: "/admin/blog",
      color: "bg-teal",
    },
    {
      title: "Ebooks",
      description: "Upload and manage ebook library",
      icon: FileText,
      href: "/admin/ebooks",
      color: "bg-coral",
    },
    {
      title: "Support Groups",
      description: "Add and edit support group directory",
      icon: Users,
      href: "/admin/support",
      color: "bg-peach",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-primary hover:bg-primary/10">
              <ArrowLeft className="mr-2" size={16} />
              Back to Site
            </Button>
          </Link>
          <h1 className="text-4xl font-bold retro-heading text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {user?.name || "Admin"}
          </p>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                onClick={() => setLocation(section.href)}
                className="retro-card p-6 cursor-pointer"
              >
                <div className={`w-12 h-12 ${section.color} rounded-full flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {section.description}
                </p>
                <Button className="retro-button bg-primary text-primary-foreground w-full">
                  Manage
                </Button>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-mint/20 rounded-lg border-2 border-mint">
          <h3 className="text-lg font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Quick Start Guide
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Click on any section above to start managing content</li>
            <li>• All changes are saved to the database automatically</li>
            <li>• Published content appears immediately on the public site</li>
            <li>• Draft content is only visible in the admin panel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
