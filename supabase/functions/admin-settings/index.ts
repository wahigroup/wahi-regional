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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { action, ...params } = await req.json();

    switch (action) {
      case "get-public": {
        // Public endpoint to get specific settings without authentication
        const { key } = params;
        
        if (!key) {
          return new Response(
            JSON.stringify({ error: "Key is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data, error } = await supabase
          .from("site_settings")
          .select("setting_value")
          .eq("setting_key", key)
          .single();

        if (error && error.code !== "PGRST116") {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ value: data?.setting_value || null }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "get": {
        const { token, key } = params;
        const payload = verifyToken(token);

        if (!payload) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        if (!key) {
          return new Response(
            JSON.stringify({ error: "Key is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data, error } = await supabase
          .from("site_settings")
          .select("setting_value")
          .eq("setting_key", key)
          .single();

        if (error && error.code !== "PGRST116") {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ value: data?.setting_value || null }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "set": {
        const { token, key, value } = params;
        const payload = verifyToken(token);

        if (!payload) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        if (!key) {
          return new Response(
            JSON.stringify({ error: "Key is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { error } = await supabase
          .from("site_settings")
          .upsert(
            { setting_key: key, setting_value: value },
            { onConflict: "setting_key" }
          );

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ message: "Setting saved" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "get-hero": {
        const { data, error } = await supabase
          .from("site_settings")
          .select("setting_key, setting_value")
          .in("setting_key", [
            "hero_headline_en",
            "hero_headline_id",
            "hero_headline_zh",
            "hero_description_en",
            "hero_description_id",
            "hero_description_zh",
          ]);

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const settings: Record<string, string> = {};
        data?.forEach((row) => {
          if (row.setting_key && row.setting_value) {
            settings[row.setting_key] = row.setting_value;
          }
        });

        return new Response(
          JSON.stringify({ settings }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "update-hero": {
        const { token, settings } = params;
        const payload = verifyToken(token);

        if (!payload) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Update each setting
        for (const [key, value] of Object.entries(settings)) {
          const { error } = await supabase
            .from("site_settings")
            .upsert(
              { setting_key: key, setting_value: value as string },
              { onConflict: "setting_key" }
            );

          if (error) {
            return new Response(
              JSON.stringify({ error: error.message }),
              { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        }

        return new Response(
          JSON.stringify({ message: "Settings updated" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
