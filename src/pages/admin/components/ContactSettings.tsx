import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ContactSettings {
  email: string;
  phone: string;
  address: string;
  rep_name: string;
  rep_role: string;
  whatsapp: string;
}

const ContactSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<ContactSettings>({
    email: "",
    phone: "",
    address: "",
    rep_name: "",
    rep_role: "",
    whatsapp: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-content`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "get-contact" }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch settings");

        const data = await response.json();
        if (data.settings) {
          setSettings({
            email: data.settings.email || "",
            phone: data.settings.phone || "",
            address: data.settings.address || "",
            rep_name: data.settings.rep_name || "",
            rep_role: data.settings.rep_role || "",
            whatsapp: data.settings.whatsapp || "",
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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update-contact",
            token,
            settings,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save");
      }

      toast.success("Contact settings saved");
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
        <CardTitle>Contact Settings</CardTitle>
        <CardDescription>
          Configure contact page information and representative details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              placeholder="info@wahigroup.id"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              placeholder="+62 812 3456 7890"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>WhatsApp Number</Label>
            <Input
              type="tel"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              placeholder="+62 812 3456 7890"
            />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              placeholder="Bali, Indonesia"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Representative Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Representative Name</Label>
              <Input
                value={settings.rep_name}
                onChange={(e) => setSettings({ ...settings, rep_name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Representative Role</Label>
              <Input
                value={settings.rep_role}
                onChange={(e) => setSettings({ ...settings, rep_role: e.target.value })}
                placeholder="Investment Advisor"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Contact Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContactSettings;
