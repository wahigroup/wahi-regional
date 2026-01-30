import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "zh", label: "中文 (Chinese)" },
  { code: "ru", label: "Русский (Russian)" },
  { code: "fr", label: "Français (French)" },
  { code: "es", label: "Español (Spanish)" },
];

const DefaultLanguageSettings = () => {
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDefaultLanguage();
  }, []);

  const fetchDefaultLanguage = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-settings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get", token, key: "default_language" }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.value) {
          setDefaultLanguage(data.value);
        }
      }
    } catch (error) {
      console.error("Error fetching default language:", error);
    } finally {
      setLoading(false);
    }
  };

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
            action: "set",
            token,
            key: "default_language",
            value: defaultLanguage,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save default language");
      }

      toast.success("Default language saved successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading language settings...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Default Language Settings
        </CardTitle>
        <CardDescription>
          Choose the default language for visitors who open the website for the first time.
          Users can still switch languages using the language selector in the footer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="default-language">Default Website Language</Label>
          <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
            <SelectTrigger id="default-language" className="w-full max-w-xs">
              <SelectValue placeholder="Select default language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            This language will be shown to first-time visitors before they select their preferred language.
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Default Language"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DefaultLanguageSettings;
