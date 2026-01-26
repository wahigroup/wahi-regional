import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface HeroContent {
  headline: string;
  description: string;
}

const HeroSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<{
    en: HeroContent;
    id: HeroContent;
    zh: HeroContent;
  }>({
    en: { headline: "", description: "" },
    id: { headline: "", description: "" },
    zh: { headline: "", description: "" },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-settings`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "get-hero" }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch settings");

        const data = await response.json();
        if (data.settings) {
          setContent({
            en: {
              headline: data.settings.hero_headline_en || "",
              description: data.settings.hero_description_en || "",
            },
            id: {
              headline: data.settings.hero_headline_id || "",
              description: data.settings.hero_description_id || "",
            },
            zh: {
              headline: data.settings.hero_headline_zh || "",
              description: data.settings.hero_description_zh || "",
            },
          });
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-settings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update-hero",
            token,
            settings: {
              hero_headline_en: content.en.headline,
              hero_description_en: content.en.description,
              hero_headline_id: content.id.headline,
              hero_description_id: content.id.description,
              hero_headline_zh: content.zh.headline,
              hero_description_zh: content.zh.description,
            },
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save settings");
      }

      toast.success("Hero settings saved");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section Settings</CardTitle>
        <CardDescription>
          Edit the homepage hero section content in multiple languages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="en" className="space-y-4">
          <TabsList>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="id">Indonesian</TabsTrigger>
            <TabsTrigger value="zh">Chinese</TabsTrigger>
          </TabsList>

          {(["en", "id", "zh"] as const).map((lang) => (
            <TabsContent key={lang} value={lang} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`headline-${lang}`}>Headline</Label>
                <Input
                  id={`headline-${lang}`}
                  value={content[lang].headline}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      [lang]: { ...prev[lang], headline: e.target.value },
                    }))
                  }
                  placeholder="Enter headline"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${lang}`}>Description</Label>
                <Textarea
                  id={`description-${lang}`}
                  value={content[lang].description}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      [lang]: { ...prev[lang], description: e.target.value },
                    }))
                  }
                  placeholder="Enter description"
                  rows={4}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Button onClick={handleSave} disabled={saving} className="mt-6">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HeroSettings;
