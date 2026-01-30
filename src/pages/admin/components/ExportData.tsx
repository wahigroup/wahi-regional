import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Download, Database, Info } from "lucide-react";

const ExportData = () => {
  const [exportingDb, setExportingDb] = useState(false);

  const handleExport = async () => {
    setExportingDb(true);

    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-export`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "export-database", token }),
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
      a.download = `wahi-database-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Export completed successfully");
    } catch (error: any) {
      toast.error(error.message || "Export failed");
    } finally {
      setExportingDb(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Full Database</CardTitle>
          <CardDescription>
            Download complete database for independent deployment outside Lovable
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleExport}
            disabled={exportingDb}
            className="w-full"
            size="lg"
          >
            <Database className="h-4 w-4 mr-2" />
            {exportingDb ? "Exporting..." : "Export Full Database"}
          </Button>

          <p className="text-sm text-muted-foreground">
            Password hashes use bcrypt encryption (industry standard). Can be imported directly to any Supabase instance.
          </p>
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Deployment Instructions</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>To deploy independently:</p>
          <ol className="list-decimal list-inside text-sm space-y-1 mt-2">
            <li>
              Clone the GitHub repository:{" "}
              <a 
                href="https://github.com/wahigroup/wahi-regional" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                github.com/wahigroup/wahi-regional
              </a>
            </li>
            <li>Create a new Supabase project</li>
            <li>Run the SQL migrations from <code className="bg-muted px-1 rounded">supabase/migrations/</code></li>
            <li>Import this JSON export to populate your database</li>
            <li>Deploy Edge Functions from <code className="bg-muted px-1 rounded">supabase/functions/</code></li>
            <li>Update <code className="bg-muted px-1 rounded">.env</code> with your Supabase credentials</li>
            <li>Run <code className="bg-muted px-1 rounded">npm run build</code> and deploy to your server</li>
          </ol>
        </AlertDescription>
      </Alert>

      <Alert variant="default">
        <Download className="h-4 w-4" />
        <AlertTitle>Project Images</AlertTitle>
        <AlertDescription>
          Project images are stored in Supabase Storage bucket <code className="bg-muted px-1 rounded">project-images</code>. 
          Download them separately from Cloud View → Storage, or use the image URLs in the export.
        </AlertDescription>
      </Alert>

      <Alert variant="default">
        <Info className="h-4 w-4" />
        <AlertTitle>Need Help?</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>For support or general questions, please contact <strong>Alvon</strong>, Marketing Manager at Wahi Head Office:</p>
          For deployment assistance or technical support, please contact <strong>Alvon</strong>, Marketing Manager at Wahi Head Office:
          <ul className="mt-2 space-y-1">
            <li>📧 Email: <a href="mailto:marketing@wahigroup.id" className="text-primary underline hover:no-underline">marketing@wahigroup.id</a></li>
            <li>📱 WhatsApp: <a href="https://wa.me/6285190077788" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">+62 851 900 777 88</a></li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ExportData;
