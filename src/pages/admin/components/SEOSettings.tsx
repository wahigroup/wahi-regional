import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Globe, Image, Twitter, Search } from "lucide-react";
import { clearSEOCache } from "@/hooks/useSEO";

interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  ogImage: string;
  twitterHandle: string;
  keywords: string;
  author: string;
  // Page-specific SEO
  pages: Record<string, {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
  }>;
}

const defaultSettings: SEOSettings = {
  siteTitle: "Wahi | Cross-Border Real Estate Investment in Indonesia",
  siteDescription: "A calm, transparent approach for serious investors seeking stable demand and materially higher rental income in Indonesia's most resilient lifestyle destinations.",
  ogImage: "/images/og-default.jpg",
  twitterHandle: "@WahiGroup",
  keywords: "real estate, investment, Indonesia, Bali, property, villa, apartments",
  author: "Wahi Group",
  pages: {
    home: {
      title: "Wahi | Cross-Border Real Estate Investment in Indonesia",
      description: "A calm, transparent approach for serious investors seeking stable demand and materially higher rental income in Indonesia's most resilient lifestyle destinations.",
    },
    projects: {
      title: "Projects | Wahi",
      description: "Explore our curated selection of premium real estate investment opportunities in Bali and Indonesia.",
    },
    about: {
      title: "About | Wahi",
      description: "Learn about Wahi's mission to provide transparent, high-quality real estate investment opportunities in Indonesia.",
    },
    contact: {
      title: "Contact | Wahi",
      description: "Get in touch with our team for personalized real estate investment consultation.",
    },
    "why-invest": {
      title: "Why Invest | Wahi",
      description: "Discover why Bali and Indonesia offer compelling real estate investment opportunities with high rental yields.",
    },
    "how-it-works": {
      title: "How It Works | Wahi",
      description: "Understand our streamlined process for investing in Indonesian real estate from abroad.",
    },
  },
};

const pageLabels: Record<string, string> = {
  home: "Homepage",
  projects: "Projects",
  about: "About",
  contact: "Contact",
  "why-invest": "Why Invest",
  "how-it-works": "How It Works",
};

const SEOSettingsComponent = () => {
  const [settings, setSettings] = useState<SEOSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get-page-section", pageName: "global", sectionKey: "seo" }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch SEO settings");

      const data = await response.json();
      if (data.content && Object.keys(data.content).length > 0) {
        setSettings({ ...defaultSettings, ...data.content });
      }
    } catch (error: any) {
      console.error("Error fetching SEO settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update-page-section",
            token,
            pageName: "global",
            sectionKey: "seo",
            content: settings,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save settings");
      }

      // Clear the SEO cache so changes apply immediately
      clearSEOCache();
      
      toast.success("SEO settings saved! Changes will apply immediately on page reload.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const updateGlobalSetting = (key: keyof SEOSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updatePageSetting = (
    page: string,
    key: "title" | "description" | "ogTitle" | "ogDescription",
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: {
          ...prev.pages[page],
          [key]: value,
        },
      },
    }));
  };

  if (loading) {
    return <p>Loading SEO settings...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Global SEO Settings
          </CardTitle>
          <CardDescription>
            Configure site-wide SEO settings. These apply as defaults across all pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Site Title</Label>
              <Input
                value={settings.siteTitle}
                onChange={(e) => updateGlobalSetting("siteTitle", e.target.value)}
                placeholder="Your Site Title"
              />
              <p className="text-xs text-muted-foreground">
                {settings.siteTitle.length}/60 characters recommended
              </p>
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input
                value={settings.author}
                onChange={(e) => updateGlobalSetting("author", e.target.value)}
                placeholder="Site Author"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Site Description</Label>
            <Textarea
              value={settings.siteDescription}
              onChange={(e) => updateGlobalSetting("siteDescription", e.target.value)}
              placeholder="Brief description of your site"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {settings.siteDescription.length}/160 characters recommended for search results
            </p>
          </div>

          <div className="space-y-2">
            <Label>Keywords</Label>
            <Input
              value={settings.keywords}
              onChange={(e) => updateGlobalSetting("keywords", e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-muted-foreground">Comma-separated keywords</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Open Graph Image URL
              </Label>
              <Input
                value={settings.ogImage}
                onChange={(e) => updateGlobalSetting("ogImage", e.target.value)}
                placeholder="https://example.com/og-image.png"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 1200x630px
              </p>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter Handle
              </Label>
              <Input
                value={settings.twitterHandle}
                onChange={(e) => updateGlobalSetting("twitterHandle", e.target.value)}
                placeholder="@YourHandle"
              />
            </div>
          </div>

          {settings.ogImage && (
            <div className="space-y-2">
              <Label>OG Image Preview</Label>
              <div className="border rounded-lg overflow-hidden max-w-md">
                <img
                  src={settings.ogImage}
                  alt="OG Preview"
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Page-Specific SEO
          </CardTitle>
          <CardDescription>
            Override SEO settings for individual pages. Leave blank to use global defaults.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="flex-wrap h-auto">
              {Object.keys(settings.pages).map((page) => (
                <TabsTrigger key={page} value={page} className="text-xs">
                  {pageLabels[page] || page}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(settings.pages).map(([page, pageSettings]) => (
              <TabsContent key={page} value={page} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={pageSettings.title}
                    onChange={(e) => updatePageSetting(page, "title", e.target.value)}
                    placeholder={`Title for ${pageLabels[page] || page} page`}
                  />
                  <p className="text-xs text-muted-foreground">
                    {pageSettings.title.length}/60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Page Description</Label>
                  <Textarea
                    value={pageSettings.description}
                    onChange={(e) => updatePageSetting(page, "description", e.target.value)}
                    placeholder={`Description for ${pageLabels[page] || page} page`}
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">
                    {pageSettings.description.length}/160 characters
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Search Preview:</p>
                  <div className="space-y-1">
                    <p className="text-primary text-sm font-medium truncate">
                      {pageSettings.title || settings.siteTitle}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      wahigroup.id/{page === "home" ? "" : page}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {pageSettings.description || settings.siteDescription}
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? "Saving..." : "Save SEO Settings"}
        </Button>
      </div>
    </div>
  );
};

export default SEOSettingsComponent;
