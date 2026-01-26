import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function verifyToken(token: string): { userId: string } | null {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) return null;
    return { userId: payload.userId };
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, token } = await req.json();
    const payload = verifyToken(token);

    if (!payload) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    switch (action) {
      case "export-database": {
        // Export site settings
        const { data: settings, error: settingsError } = await supabase
          .from("site_settings")
          .select("setting_key, setting_value, created_at, updated_at");

        if (settingsError) {
          return new Response(
            JSON.stringify({ error: settingsError.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Export admin users (without password hashes for security)
        const { data: admins, error: adminsError } = await supabase
          .from("admin_users")
          .select("id, username, created_at, updated_at");

        if (adminsError) {
          return new Response(
            JSON.stringify({ error: adminsError.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const exportData = {
          exported_at: new Date().toISOString(),
          site_settings: settings || [],
          admin_users: admins || [],
        };

        return new Response(
          JSON.stringify(exportData, null, 2),
          { 
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json",
              "Content-Disposition": `attachment; filename="wahi-database-export-${new Date().toISOString().split('T')[0]}.json"`
            } 
          }
        );
      }

      case "export-settings": {
        const { data: settings, error } = await supabase
          .from("site_settings")
          .select("setting_key, setting_value");

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Convert to a more readable format
        const settingsObject: Record<string, string> = {};
        settings?.forEach((s) => {
          if (s.setting_key) {
            settingsObject[s.setting_key] = s.setting_value || "";
          }
        });

        return new Response(
          JSON.stringify(settingsObject, null, 2),
          { 
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json",
              "Content-Disposition": `attachment; filename="wahi-settings-${new Date().toISOString().split('T')[0]}.json"`
            } 
          }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
