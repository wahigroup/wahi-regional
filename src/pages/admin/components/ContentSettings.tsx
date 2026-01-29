import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { FileText, Home, Users, Phone, TrendingUp, HelpCircle } from "lucide-react";

// Content structure for each page
interface PageContent {
  [sectionKey: string]: {
    [fieldKey: string]: {
      en: string;
      id: string;
      zh: string;
    };
  };
}

// Define page sections structure
const pageStructure: Record<string, { 
  icon: React.ReactNode; 
  label: string; 
  sections: { 
    key: string; 
    label: string; 
    fields: { key: string; label: string; type: "input" | "textarea" }[] 
  }[] 
}> = {
  home: {
    icon: <Home className="h-4 w-4" />,
    label: "Homepage",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "headline", label: "Headline", type: "input" },
          { key: "subtitle", label: "Subtitle/Description", type: "textarea" },
          { key: "buttonPrimary", label: "Primary Button Text", type: "input" },
          { key: "buttonSecondary", label: "Secondary Button Text", type: "input" },
        ],
      },
      {
        key: "invest",
        label: "Invest Section",
        fields: [
          { key: "title", label: "Section Title", type: "input" },
          { key: "paragraph1", label: "Paragraph 1", type: "textarea" },
          { key: "paragraph2", label: "Paragraph 2", type: "textarea" },
          { key: "paragraph3", label: "Paragraph 3", type: "textarea" },
        ],
      },
      {
        key: "pillars",
        label: "Three Pillars Section",
        fields: [
          { key: "pillar1Title", label: "Pillar 1 Title", type: "input" },
          { key: "pillar1Desc", label: "Pillar 1 Description", type: "textarea" },
          { key: "pillar2Title", label: "Pillar 2 Title", type: "input" },
          { key: "pillar2Desc", label: "Pillar 2 Description", type: "textarea" },
          { key: "pillar3Title", label: "Pillar 3 Title", type: "input" },
          { key: "pillar3Desc", label: "Pillar 3 Description", type: "textarea" },
          { key: "quote", label: "Bottom Quote", type: "textarea" },
        ],
      },
      {
        key: "whyBali",
        label: "Why Bali Section",
        fields: [
          { key: "title", label: "Section Title", type: "input" },
          { key: "point1Title", label: "Point 1 Title", type: "input" },
          { key: "point1Desc", label: "Point 1 Description", type: "textarea" },
          { key: "point2Title", label: "Point 2 Title", type: "input" },
          { key: "point2Desc", label: "Point 2 Description", type: "textarea" },
          { key: "point3Title", label: "Point 3 Title", type: "input" },
          { key: "point3Desc", label: "Point 3 Description", type: "textarea" },
        ],
      },
      {
        key: "cta",
        label: "CTA Section",
        fields: [
          { key: "title", label: "Title", type: "input" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "buttonText", label: "Button Text", type: "input" },
        ],
      },
    ],
  },
  about: {
    icon: <Users className="h-4 w-4" />,
    label: "About",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "story",
        label: "Our Story Section",
        fields: [
          { key: "title", label: "Section Title", type: "input" },
          { key: "content", label: "Content", type: "textarea" },
        ],
      },
      {
        key: "mission",
        label: "Mission Section",
        fields: [
          { key: "title", label: "Section Title", type: "input" },
          { key: "content", label: "Content", type: "textarea" },
        ],
      },
    ],
  },
  projects: {
    icon: <FileText className="h-4 w-4" />,
    label: "Projects",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "cta",
        label: "CTA Section",
        fields: [
          { key: "title", label: "Title", type: "input" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "buttonText", label: "Button Text", type: "input" },
        ],
      },
    ],
  },
  whyInvest: {
    icon: <TrendingUp className="h-4 w-4" />,
    label: "Why Invest",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "stats",
        label: "Statistics Section",
        fields: [
          { key: "stat1Value", label: "Stat 1 Value", type: "input" },
          { key: "stat1Label", label: "Stat 1 Label", type: "input" },
          { key: "stat2Value", label: "Stat 2 Value", type: "input" },
          { key: "stat2Label", label: "Stat 2 Label", type: "input" },
          { key: "stat3Value", label: "Stat 3 Value", type: "input" },
          { key: "stat3Label", label: "Stat 3 Label", type: "input" },
        ],
      },
    ],
  },
  howItWorks: {
    icon: <HelpCircle className="h-4 w-4" />,
    label: "How It Works",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "steps",
        label: "Steps Section",
        fields: [
          { key: "step1Title", label: "Step 1 Title", type: "input" },
          { key: "step1Desc", label: "Step 1 Description", type: "textarea" },
          { key: "step2Title", label: "Step 2 Title", type: "input" },
          { key: "step2Desc", label: "Step 2 Description", type: "textarea" },
          { key: "step3Title", label: "Step 3 Title", type: "input" },
          { key: "step3Desc", label: "Step 3 Description", type: "textarea" },
          { key: "step4Title", label: "Step 4 Title", type: "input" },
          { key: "step4Desc", label: "Step 4 Description", type: "textarea" },
        ],
      },
    ],
  },
  contact: {
    icon: <Phone className="h-4 w-4" />,
    label: "Contact",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "form",
        label: "Form Section",
        fields: [
          { key: "formTitle", label: "Form Title", type: "input" },
          { key: "formDescription", label: "Form Description", type: "textarea" },
        ],
      },
    ],
  },
};

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesian" },
  { code: "zh", label: "Chinese" },
] as const;

const ContentSettings = () => {
  const [content, setContent] = useState<Record<string, PageContent>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [activeLang, setActiveLang] = useState<"en" | "id" | "zh">("en");

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get-page-section", pageName: "all_content", sectionKey: "pages" }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch content");

      const data = await response.json();
      if (data.content && Object.keys(data.content).length > 0) {
        setContent(data.content);
      }
    } catch (error: any) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (
    page: string,
    section: string,
    field: string,
    lang: "en" | "id" | "zh",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: {
          ...prev[page]?.[section],
          [field]: {
            ...prev[page]?.[section]?.[field],
            [lang]: value,
          },
        },
      },
    }));
  };

  const getFieldValue = (page: string, section: string, field: string, lang: "en" | "id" | "zh"): string => {
    return content[page]?.[section]?.[field]?.[lang] || "";
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
            pageName: "all_content",
            sectionKey: "pages",
            content,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save content");
      }

      toast.success("Content settings saved!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading content settings...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Content Settings</CardTitle>
          <CardDescription>
            Edit text content for all pages in multiple languages. Changes will reflect on the website after saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Language Selector */}
          <div className="mb-6">
            <Label className="mb-2 block">Language</Label>
            <Tabs value={activeLang} onValueChange={(v) => setActiveLang(v as "en" | "id" | "zh")}>
              <TabsList>
                {languages.map((lang) => (
                  <TabsTrigger key={lang.code} value={lang.code}>
                    {lang.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Page Selector */}
          <Tabs value={activePage} onValueChange={setActivePage} className="space-y-4">
            <TabsList className="flex-wrap h-auto">
              {Object.entries(pageStructure).map(([key, page]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  {page.icon}
                  {page.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(pageStructure).map(([pageKey, page]) => (
              <TabsContent key={pageKey} value={pageKey} className="space-y-4">
                <Accordion type="multiple" defaultValue={page.sections.map((s) => s.key)} className="space-y-2">
                  {page.sections.map((section) => (
                    <AccordionItem key={section.key} value={section.key} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="font-medium">{section.label}</span>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2 pb-4">
                        {section.fields.map((field) => (
                          <div key={field.key} className="space-y-2">
                            <Label htmlFor={`${pageKey}-${section.key}-${field.key}-${activeLang}`}>
                              {field.label}
                            </Label>
                            {field.type === "input" ? (
                              <Input
                                id={`${pageKey}-${section.key}-${field.key}-${activeLang}`}
                                value={getFieldValue(pageKey, section.key, field.key, activeLang)}
                                onChange={(e) =>
                                  updateField(pageKey, section.key, field.key, activeLang, e.target.value)
                                }
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                              />
                            ) : (
                              <Textarea
                                id={`${pageKey}-${section.key}-${field.key}-${activeLang}`}
                                value={getFieldValue(pageKey, section.key, field.key, activeLang)}
                                onChange={(e) =>
                                  updateField(pageKey, section.key, field.key, activeLang, e.target.value)
                                }
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                rows={3}
                              />
                            )}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSave} disabled={saving} size="lg">
              {saving ? "Saving..." : "Save All Content"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentSettings;
