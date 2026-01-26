import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const ExportData = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Data</CardTitle>
        <CardDescription>
          Instructions for exporting website files and database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Website Files</AlertTitle>
          <AlertDescription>
            To export website files, use the GitHub integration in the Lovable
            platform. Click on Settings → GitHub to connect your repository and
            push all project files.
          </AlertDescription>
        </Alert>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Database Export</AlertTitle>
          <AlertDescription>
            To export the database, go to the Lovable Cloud section in the
            platform. You can view and export your database data from there.
          </AlertDescription>
        </Alert>

        <div className="pt-4 text-sm text-muted-foreground">
          <p>
            For more detailed instructions, please refer to the Lovable
            documentation or contact support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportData;
