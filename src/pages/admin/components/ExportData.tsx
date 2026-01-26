import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Download, Database, Settings, Info } from "lucide-react";

const ExportData = () => {
  const [exportingDb, setExportingDb] = useState(false);
  const [exportingSettings, setExportingSettings] = useState(false);

  const handleExport = async (action: "export-database" | "export-settings") => {
    const isDb = action === "export-database";
    const setLoading = isDb ? setExportingDb : setExportingSettings;
    setLoading(true);

    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-export`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, token }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Export failed");
      }

      const data = await response.json();
      
      // Create and download the file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = isDb 
        ? `wahi-database-export-${new Date().toISOString().split('T')[0]}.json`
        : `wahi-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Export completed successfully");
    } catch (error: any) {
      toast.error(error.message || "Export failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Database</CardTitle>
          <CardDescription>
            Download all database content including site settings and admin users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              onClick={() => handleExport("export-database")}
              disabled={exportingDb}
              className="w-full"
              size="lg"
            >
              <Database className="h-4 w-4 mr-2" />
              {exportingDb ? "Exporting..." : "Export Full Database"}
            </Button>

            <Button
              onClick={() => handleExport("export-settings")}
              disabled={exportingSettings}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Settings className="h-4 w-4 mr-2" />
              {exportingSettings ? "Exporting..." : "Export Settings Only"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Exports are downloaded as JSON files. Admin passwords are excluded for security.
          </p>
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Website Source Files</AlertTitle>
        <AlertDescription>
          Source code files (HTML, CSS, JavaScript, etc.) are managed through the Lovable 
          platform. To export the complete website codebase, use the GitHub integration 
          in Settings → GitHub, or download directly from the Lovable editor.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ExportData;
