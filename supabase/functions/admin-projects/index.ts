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

    // Public actions (no auth required)
    if (action === "list") {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ projects: data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "featured") {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true })
        .limit(3);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ projects: data }),
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
      case "create": {
        const { project } = params;
        const { data, error } = await supabase
          .from("projects")
          .insert({
            title: project.title,
            location: project.location,
            type: project.type,
            description: project.description,
            image_url: project.image_url,
            status: project.status || "available",
            is_featured: project.is_featured || false,
            display_order: project.display_order || 0,
          })
          .select()
          .single();

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ project: data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "update": {
        const { projectId, project } = params;
        const { data, error } = await supabase
          .from("projects")
          .update({
            title: project.title,
            location: project.location,
            type: project.type,
            description: project.description,
            image_url: project.image_url,
            status: project.status,
            is_featured: project.is_featured,
            display_order: project.display_order,
          })
          .eq("id", projectId)
          .select()
          .single();

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ project: data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "delete": {
        const { projectId } = params;
        const { error } = await supabase
          .from("projects")
          .delete()
          .eq("id", projectId);

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ message: "Project deleted" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "upload-image": {
        const { fileName, fileBase64, contentType } = params;
        
        // Decode base64 to bytes
        const bytes = Uint8Array.from(atob(fileBase64), c => c.charCodeAt(0));
        
        const filePath = `projects/${Date.now()}-${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(filePath, bytes, { contentType });

        if (uploadError) {
          return new Response(
            JSON.stringify({ error: uploadError.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);

        return new Response(
          JSON.stringify({ url: publicUrl }),
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
