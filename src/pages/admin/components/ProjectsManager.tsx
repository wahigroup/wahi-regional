import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Trash2, Plus, Pencil, GripVertical } from "lucide-react";

interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  image_url: string;
  status: string;
  is_featured: boolean;
  display_order: number;
}

const emptyProject = {
  title: "",
  location: "",
  type: "",
  description: "",
  image_url: "",
  status: "available",
  is_featured: false,
  display_order: 0,
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-projects`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "list" }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const token = localStorage.getItem("admin_token");

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-projects`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "upload-image",
              token,
              fileName: file.name,
              fileBase64: base64,
              contentType: file.type,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await response.json();
        setEditingProject((prev) => ({ ...prev, image_url: data.url }));
        toast.success("Image uploaded");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast.error(error.message);
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;
    setSaving(true);
    const token = localStorage.getItem("admin_token");

    try {
      const action = isEditing ? "update" : "create";
      const body: any = {
        action,
        token,
        project: editingProject,
      };

      if (isEditing && editingProject.id) {
        body.projectId = editingProject.id;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-projects`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save project");
      }

      toast.success(isEditing ? "Project updated" : "Project created");
      setDialogOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;

    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-projects`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "delete", token, projectId: project.id }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete");
      }

      toast.success("Project deleted");
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openCreateDialog = () => {
    setEditingProject({ ...emptyProject, display_order: projects.length + 1 });
    setIsEditing(false);
    setDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject({ ...project });
    setIsEditing(true);
    setDialogOpen(true);
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage property listings</CardDescription>
          </div>
          <Button size="sm" onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-muted-foreground">No image</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{project.title}</h3>
                  {project.is_featured && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{project.location}</p>
                <p className="text-xs text-muted-foreground">{project.type}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEditDialog(project)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(project)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              No projects yet. Click "Add Project" to create one.
            </p>
          )}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Project" : "Add Project"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update project details" : "Create a new property listing"}
              </DialogDescription>
            </DialogHeader>

            {editingProject && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={editingProject.title || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, title: e.target.value })
                      }
                      placeholder="e.g., Elements Residence"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <Input
                      value={editingProject.location || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, location: e.target.value })
                      }
                      placeholder="e.g., Canggu, Bali"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type *</Label>
                    <Input
                      value={editingProject.type || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, type: e.target.value })
                      }
                      placeholder="e.g., Modern Apartments"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Input
                      value={editingProject.status || "available"}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, status: e.target.value })
                      }
                      placeholder="e.g., available, sold out"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingProject.description || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    placeholder="Brief description of the property"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="flex items-center gap-4">
                    {editingProject.image_url ? (
                      <img
                        src={editingProject.image_url}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">No image</span>
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                      <p className="text-xs text-muted-foreground">
                        {uploading ? "Uploading..." : "Or enter URL below"}
                      </p>
                      <Input
                        value={editingProject.image_url || ""}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, image_url: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      value={editingProject.display_order || 0}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          display_order: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <Switch
                      checked={editingProject.is_featured || false}
                      onCheckedChange={(checked) =>
                        setEditingProject({ ...editingProject, is_featured: checked })
                      }
                    />
                    <Label>Featured on homepage</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving || uploading}>
                    {saving ? "Saving..." : isEditing ? "Update" : "Create"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProjectsManager;
