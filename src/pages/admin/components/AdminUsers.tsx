import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2, Plus, Shield, ShieldCheck, Pencil } from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<string>("admin");

  // Edit state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [editUsername, setEditUsername] = useState("");
  const [editFullName, setEditFullName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchUsers = async () => {
    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-auth`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "list", token }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users || []);
      setCurrentUserRole(data.currentUserRole || "admin");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-auth`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create",
            token,
            username: newUsername,
            password: newPassword,
            fullName: newFullName || newUsername,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create user");
      }

      toast.success("Admin user created");
      setNewUsername("");
      setNewPassword("");
      setNewFullName("");
      setDialogOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (userId: string, username: string, role: string) => {
    if (role === "super_admin") {
      toast.error("Super Admin account cannot be deleted");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${username}?`)) return;

    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-auth`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "delete", token, userId }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete user");
      }

      toast.success("Admin user deleted");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openEditDialog = (user: AdminUser) => {
    setEditingUser(user);
    setEditUsername(user.username);
    setEditFullName(user.full_name || "");
    setEditPassword("");
    setEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    setUpdating(true);
    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-auth`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            token,
            userId: editingUser.id,
            username: editUsername !== editingUser.username ? editUsername : undefined,
            fullName: editFullName,
            password: editPassword || undefined,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update user");
      }

      toast.success("Admin user updated");
      setEditDialogOpen(false);
      setEditingUser(null);
      fetchUsers();

      // Update localStorage if editing current user
      const storedUser = localStorage.getItem("admin_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.id === editingUser.id) {
          parsed.username = editUsername;
          parsed.full_name = editFullName;
          localStorage.setItem("admin_user", JSON.stringify(parsed));
          window.location.reload();
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === "super_admin") {
      return (
        <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
          <ShieldCheck className="h-3 w-3 mr-1" />
          Super Admin
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        <Shield className="h-3 w-3 mr-1" />
        Admin
      </Badge>
    );
  };

  const canDelete = (user: AdminUser) => {
    if (user.role === "super_admin") return false;
    return true;
  };

  const canEdit = (user: AdminUser) => {
    // Super admin can edit everyone
    if (currentUserRole === "super_admin") return true;
    // Regular admin cannot edit super_admin
    if (user.role === "super_admin") return false;
    return true;
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>Manage administrator accounts</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Admin User</DialogTitle>
                <DialogDescription>Add a new administrator account</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-fullname">Full Name</Label>
                  <Input
                    id="new-fullname"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-username">Username</Label>
                  <Input
                    id="new-username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={creating} className="w-full">
                  {creating ? "Creating..." : "Create Admin"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{user.full_name || user.username}</p>
                    {getRoleBadge(user.role)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {canEdit(user) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {canDelete(user) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(user.id, user.username, user.role)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              No admin users found
            </p>
          )}
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
            <DialogDescription>
              Update {editingUser?.username}'s account details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-fullname">Full Name</Label>
              <Input
                id="edit-fullname"
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-password">New Password</Label>
              <Input
                id="edit-password"
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="Leave empty to keep current"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to keep the current password
              </p>
            </div>
            <Button type="submit" disabled={updating} className="w-full">
              {updating ? "Updating..." : "Update User"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminUsers;
