import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple hash function for passwords
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// Simple token generation
function generateToken(userId: string): string {
  const payload = {
    userId,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  return btoa(JSON.stringify(payload));
}

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
      case "init": {
        const { data: existingAdmins } = await supabase
          .from("admin_users")
          .select("id")
          .limit(1);

        if (!existingAdmins || existingAdmins.length === 0) {
          const passwordHash = await hashPassword("Wahi-123");
          await supabase.from("admin_users").insert({
            username: "admin",
            password_hash: passwordHash,
            role: "admin",
            full_name: "Administrator",
          });
          return new Response(
            JSON.stringify({ message: "Default admin created" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ message: "Admin already exists" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "seed-super-admin": {
        const { username, password, fullName } = params;
        
        const { data: existing } = await supabase
          .from("admin_users")
          .select("id")
          .eq("username", username)
          .maybeSingle();

        if (existing) {
          const passwordHash = await hashPassword(password);
          await supabase
            .from("admin_users")
            .update({ 
              password_hash: passwordHash, 
              role: "super_admin",
              full_name: fullName || username 
            })
            .eq("username", username);
          
          return new Response(
            JSON.stringify({ message: "Super admin updated" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const passwordHash = await hashPassword(password);
        const { error } = await supabase.from("admin_users").insert({
          username,
          password_hash: passwordHash,
          role: "super_admin",
          full_name: fullName || username,
        });

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ message: "Super admin created" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "login": {
        const { username, password } = params;

        const { data: user, error } = await supabase
          .from("admin_users")
          .select("id, username, password_hash, role, full_name")
          .eq("username", username)
          .maybeSingle();

        if (error || !user) {
          return new Response(
            JSON.stringify({ error: "Invalid credentials" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const valid = await verifyPassword(password, user.password_hash);
        if (!valid) {
          return new Response(
            JSON.stringify({ error: "Invalid credentials" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const token = generateToken(user.id);
        return new Response(
          JSON.stringify({
            token,
            user: { 
              id: user.id, 
              username: user.username, 
              role: user.role,
              full_name: user.full_name || user.username 
            },
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "verify": {
        const { token } = params;
        const payload = verifyToken(token);

        if (!payload) {
          return new Response(
            JSON.stringify({ error: "Invalid token" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: user } = await supabase
          .from("admin_users")
          .select("role, full_name, username")
          .eq("id", payload.userId)
          .maybeSingle();

        return new Response(
          JSON.stringify({ 
            valid: true, 
            userId: payload.userId, 
            role: user?.role || "admin",
            full_name: user?.full_name || user?.username || "Admin"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "list": {
        const { token } = params;
        const payload = verifyToken(token);

        if (!payload) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: users, error } = await supabase
          .from("admin_users")
          .select("id, username, role, full_name, created_at")
          .order("created_at", { ascending: false });

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: currentUser } = await supabase
          .from("admin_users")
          .select("role")
          .eq("id", payload.userId)
          .maybeSingle();

        return new Response(
          JSON.stringify({ users, currentUserRole: currentUser?.role || "admin" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "create": {
        const { token, username, password, fullName } = params;
        const payload = verifyToken(token);

        if (!payload) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const passwordHash = await hashPassword(password);
        const { error } = await supabase.from("admin_users").insert({
          username,
          password_hash: passwordHash,
          role: "admin",
          full_name: fullName || username,
        });

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ message: "User created" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "delete": {
        const { token, userId } = params;
        const authPayload = verifyToken(token);

        if (!authPayload) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        if (authPayload.userId === userId) {
          return new Response(
            JSON.stringify({ error: "Cannot delete yourself" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: targetUser } = await supabase
          .from("admin_users")
          .select("role")
          .eq("id", userId)
          .maybeSingle();

        if (targetUser?.role === "super_admin") {
          return new Response(
            JSON.stringify({ error: "Cannot delete Super Admin account" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { error } = await supabase
          .from("admin_users")
          .delete()
          .eq("id", userId);

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ message: "User deleted" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "update": {
        const { token, userId, username, password, fullName } = params;
        const authPayload = verifyToken(token);

        if (!authPayload) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: targetUser } = await supabase
          .from("admin_users")
          .select("role")
          .eq("id", userId)
          .maybeSingle();

        const { data: currentUser } = await supabase
          .from("admin_users")
          .select("role")
          .eq("id", authPayload.userId)
          .maybeSingle();

        if (targetUser?.role === "super_admin" && currentUser?.role !== "super_admin") {
          return new Response(
            JSON.stringify({ error: "Only Super Admin can edit Super Admin account" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const updateData: { username?: string; password_hash?: string; full_name?: string } = {};
        if (username) updateData.username = username;
        if (password) updateData.password_hash = await hashPassword(password);
        if (fullName !== undefined) updateData.full_name = fullName;

        const { error } = await supabase
          .from("admin_users")
          .update(updateData)
          .eq("id", userId);

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ message: "User updated" }),
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
