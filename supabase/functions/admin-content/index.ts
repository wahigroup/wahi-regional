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

    // Public actions
    if (action === "get-contact") {
      const { data, error } = await supabase
        .from("contact_settings")
        .select("setting_key, setting_value");

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const settings: Record<string, string> = {};
      data?.forEach((row) => {
        if (row.setting_key) {
          settings[row.setting_key] = row.setting_value || "";
        }
      });

      return new Response(
        JSON.stringify({ settings }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-page-section") {
      const { pageName, sectionKey } = params;
      const { data, error } = await supabase
        .from("page_sections")
        .select("content")
        .eq("page_name", pageName)
        .eq("section_key", sectionKey)
        .maybeSingle();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ content: data?.content || {} }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-all-sections") {
      const { pageName } = params;
      const { data, error } = await supabase
        .from("page_sections")
        .select("section_key, content")
        .eq("page_name", pageName);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const sections: Record<string, any> = {};
      data?.forEach((row) => {
        sections[row.section_key] = row.content;
      });

      return new Response(
        JSON.stringify({ sections }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Admin actions (auth required)
    const { token } = params;
    const payload = verifyToken(token);

    if (!payload) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    switch (action) {
      case "update-contact": {
        const { settings } = params;

        for (const [key, value] of Object.entries(settings)) {
          const { error } = await supabase
            .from("contact_settings")
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
          JSON.stringify({ message: "Contact settings updated" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "update-page-section": {
        const { pageName, sectionKey, content } = params;

        const { error } = await supabase
          .from("page_sections")
          .upsert(
            { page_name: pageName, section_key: sectionKey, content },
            { onConflict: "page_name,section_key" }
          );

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ message: "Section updated" }),
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
