import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LogOut, Mail, Image, Trash2, Eye, Home, Search,
  ChevronDown, ChevronUp, Building2, Calendar, Phone, User, Pencil,
} from "lucide-react";
import logo from "@/assets/logo.png";

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  custom_service: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  company_name: string;
  created_at: string;
}

interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"queries" | "gallery" | "clients" | "settings">("queries");
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [clients, setClients] = useState<ClientLogo[]>([]);
  
  const [uploading, setUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCategory, setNewCategory] = useState("Event Production");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [newClientName, setNewClientName] = useState("");
  const [newClientLogoUrl, setNewClientLogoUrl] = useState("");
  const [addingClient, setAddingClient] = useState(false);

  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [editClientName, setEditClientName] = useState("");
  const [editClientLogoUrl, setEditClientLogoUrl] = useState("");
  const [editClientLogoFile, setEditClientLogoFile] = useState<File | null>(null);
  const [updatingClient, setUpdatingClient] = useState(false);

  // Settings states
  const [heroBgFile, setHeroBgFile] = useState<File | null>(null);
  const [updatingHeroBg, setUpdatingHeroBg] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuery, setExpandedQuery] = useState<string | null>(null);
  const [filterRead, setFilterRead] = useState<"all" | "unread" | "read">("all");

  const [securityEnabled, setSecurityEnabled] = useState(
    localStorage.getItem("admin_security_enabled") !== "false"
  );

  const hasFetched = useRef(false);

  useEffect(() => {
    if (securityEnabled && !loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, navigate, securityEnabled]);

  useEffect(() => {
    if (hasFetched.current) return;
    if (isAdmin || !securityEnabled) {
      hasFetched.current = true;
      fetchQueries();
      fetchGallery();
      fetchClients();
    }
  }, [isAdmin, securityEnabled]);

  const fetchQueries = async () => {
    const { data } = await supabase
      .from("contact_queries")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setQueries(data);
  };

  const fetchGallery = async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setGalleryImages(data as GalleryImage[]);
  };

  const fetchClients = async () => {
    const { data } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setClients(data as ClientLogo[]);
  };

  const markAsRead = async (id: string) => {
    await supabase.from("contact_queries").update({ is_read: true }).eq("id", id);
    fetchQueries();
    toast.success("Marked as read");
  };

  const handleUpload = async () => {
    if (!selectedFile || !newTitle) {
      toast.error("Please fill title and select an image");
      return;
    }
    setUploading(true);

    const fileExt = selectedFile.name.split(".").pop();
    const filePath = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, selectedFile);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filePath);

    const { error: insertError } = await supabase.from("gallery_images").insert({
      title: newTitle,
      category: newCategory,
      image_url: urlData.publicUrl,
      company_name: newCompanyName,
    });

    if (insertError) {
      toast.error("Failed to save: " + insertError.message);
    } else {
      toast.success("Image uploaded!");
      setNewTitle("");
      setNewCompanyName("");
      setSelectedFile(null);
      fetchGallery();
    }
    setUploading(false);
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    const fileName = imageUrl.split("/").pop();
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }
    await supabase.from("gallery_images").delete().eq("id", id);
    toast.success("Image deleted");
    fetchGallery();
  };

  const [newClientLogoFile, setNewClientLogoFile] = useState<File | null>(null);

  const handleAddClient = async () => {
    if (!newClientName || (!newClientLogoUrl && !newClientLogoFile)) {
      toast.error("Please provide both a client name and a logo (file or URL)");
      return;
    }
    
    setAddingClient(true);
    let finalLogoUrl = newClientLogoUrl;

    if (newClientLogoFile) {
      const fileExt = newClientLogoFile.name.split(".").pop();
      const filePath = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("client_logos")
        .upload(filePath, newClientLogoFile);

      if (uploadError) {
        toast.error("Logo upload failed: " + uploadError.message);
        setAddingClient(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("client_logos").getPublicUrl(filePath);
      finalLogoUrl = urlData.publicUrl;
    }
    
    const { error } = await supabase.from("clients").insert({
      name: newClientName,
      logo_url: finalLogoUrl,
    });

    if (error) {
      toast.error("Failed to add client: " + error.message);
    } else {
      toast.success("Client added successfully!");
      setNewClientName("");
      setNewClientLogoUrl("");
      setNewClientLogoFile(null);
      fetchClients();
    }
    setAddingClient(false);
  };

  const handleUpdateClient = async (id: string) => {
    if (!editClientName || (!editClientLogoUrl && !editClientLogoFile)) {
      toast.error("Fields cannot be empty");
      return;
    }
    
    setUpdatingClient(true);
    let finalLogoUrl = editClientLogoUrl;

    if (editClientLogoFile) {
      const fileExt = editClientLogoFile.name.split(".").pop();
      const filePath = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("client_logos")
        .upload(filePath, editClientLogoFile);

      if (uploadError) {
        toast.error("Logo upload failed: " + uploadError.message);
        setUpdatingClient(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("client_logos").getPublicUrl(filePath);
      finalLogoUrl = urlData.publicUrl;
    }

    const { error } = await supabase
      .from("clients")
      .update({ name: editClientName, logo_url: finalLogoUrl })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update client: " + error.message);
    } else {
      toast.success("Client updated!");
      setEditingClientId(null);
      setEditClientLogoFile(null);
      fetchClients();
    }
    setUpdatingClient(false);
  };

  const deleteClient = async (id: string) => {
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete client: " + error.message);
    } else {
      toast.success("Client deleted");
      fetchClients();
    }
  };

  const handleUpdateHeroBg = async () => {
    if (!heroBgFile) {
      toast.error("Please select an image file first");
      return;
    }

    setUpdatingHeroBg(true);
    const fileExt = heroBgFile.name.split(".").pop();
    const filePath = `${Date.now()}_hero.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery") // Reusing gallery bucket for simplicity
      .upload(filePath, heroBgFile);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUpdatingHeroBg(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filePath);

    // Upsert the site setting
    const { error: upsertError } = await supabase
      .from("site_settings")
      .upsert({ key: "hero_bg", value: urlData.publicUrl }, { onConflict: "key" });

    if (upsertError) {
      toast.error("Failed to save setting: " + upsertError.message);
    } else {
      toast.success("Hero background updated successfully!");
      setHeroBgFile(null);
    }
    setUpdatingHeroBg(false);
  };

  const filteredQueries = queries.filter((q) => {
    const matchesSearch =
      !searchQuery ||
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterRead === "all" ||
      (filterRead === "unread" && !q.is_read) ||
      (filterRead === "read" && q.is_read);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground font-display">Loading...</div>
      </div>
    );
  }

  if (securityEnabled && !isAdmin) return null;

  const unreadCount = queries.filter((q) => !q.is_read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Ads Dot COM" className="h-8" />
            <span className="font-display font-semibold text-sm text-primary">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-1" /> Back to Website
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`border ${securityEnabled ? 'border-primary text-primary' : 'border-destructive text-destructive'}`}
              onClick={() => {
                const newVal = !securityEnabled;
                setSecurityEnabled(newVal);
                localStorage.setItem("admin_security_enabled", String(newVal));
                toast.success(`Security Check ${newVal ? 'Enabled' : 'Disabled'}`);
              }}
            >
              {securityEnabled ? "Security ON" : "Security OFF"}
            </Button>
            <span className="text-xs text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => { signOut(); navigate("/"); }}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground font-display uppercase tracking-wider">Total Queries</p>
            <p className="text-2xl font-display font-bold mt-1">{queries.length}</p>
          </div>
          <div className="bg-card border border-primary/20 rounded-xl p-5">
            <p className="text-xs text-muted-foreground font-display uppercase tracking-wider">Unread</p>
            <p className="text-2xl font-display font-bold text-primary mt-1">{unreadCount}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground font-display uppercase tracking-wider">Gallery Images</p>
            <p className="text-2xl font-display font-bold mt-1">{galleryImages.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground font-display uppercase tracking-wider">Categories</p>
            <p className="text-2xl font-display font-bold mt-1">
              {new Set(galleryImages.map((i) => i.category)).size}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("queries")}
            className={`px-5 py-2.5 rounded-lg text-sm font-display font-medium transition-all ${
              tab === "queries"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Mail className="h-4 w-4 inline mr-2" />
            Queries {unreadCount > 0 && <span className="ml-1 bg-primary-foreground/20 text-primary-foreground px-2 py-0.5 rounded-full text-xs">{unreadCount}</span>}
          </button>
          <button
            onClick={() => setTab("gallery")}
            className={`px-5 py-2.5 rounded-lg text-sm font-display font-medium transition-all ${
              tab === "gallery"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Image className="h-4 w-4 inline mr-2" />
            Gallery ({galleryImages.length})
          </button>
          
          <button
            onClick={() => setTab("clients")}
            className={`px-5 py-2.5 rounded-lg text-sm font-display font-medium transition-all ${
              tab === "clients"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Building2 className="h-4 w-4 inline mr-2" />
            Clients ({clients.length})
          </button>
          
          <button
            onClick={() => setTab("settings")}
            className={`px-5 py-2.5 rounded-lg text-sm font-display font-medium transition-all ${
              tab === "settings"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Image className="h-4 w-4 inline mr-2" />
            Settings
          </button>
        </div>

        {/* Contact Queries Tab */}
        {tab === "queries" && (
          <div>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, email, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "unread", "read"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterRead(f)}
                    className={`px-4 py-2 rounded-lg text-xs font-display font-medium capitalize transition-all ${
                      filterRead === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredQueries.length === 0 ? (
                <p className="text-muted-foreground text-center py-20">No queries found.</p>
              ) : (
                filteredQueries.map((q) => (
                  <div
                    key={q.id}
                    className={`border rounded-xl transition-all cursor-pointer ${
                      q.is_read
                        ? "bg-card border-border"
                        : "bg-primary/5 border-primary/20 shadow-sm"
                    }`}
                  >
                    <div
                      className="p-5 flex items-center justify-between gap-4"
                      onClick={() => setExpandedQuery(expandedQuery === q.id ? null : q.id)}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${q.is_read ? "bg-muted-foreground/30" : "bg-primary"}`} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-display font-semibold text-sm truncate">{q.name}</h3>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full font-display flex-shrink-0">
                              {q.custom_service || q.service}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{q.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs text-muted-foreground/60 hidden sm:block">
                          {new Date(q.created_at).toLocaleDateString()}
                        </span>
                        {expandedQuery === q.id ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {expandedQuery === q.id && (
                      <div className="px-5 pb-5 border-t border-border pt-4">
                        <div className="grid sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{q.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${q.email}`} className="text-primary hover:underline">{q.email}</a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${q.phone}`} className="text-primary hover:underline">{q.phone}</a>
                          </div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 mb-4">
                          <p className="text-sm text-foreground leading-relaxed">{q.message}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(q.created_at).toLocaleString()}
                          </div>
                          {!q.is_read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); markAsRead(q.id); }}
                            >
                              <Eye className="h-4 w-4 mr-1" /> Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {tab === "gallery" && (
          <div>
            {/* Upload form */}
            <div className="border border-border rounded-xl p-6 mb-8 bg-card">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                Upload New Image
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Image title *"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Company / Client name"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                </div>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                >
                  <option>Event Production</option>
                  <option>Outdoor Advertising</option>
                  <option>Digital Press</option>
                  <option>BTL Activities</option>
                  <option>In-Store Branding</option>
                  <option>Creative & Design</option>
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="px-4 py-3 bg-muted border border-border rounded-lg text-foreground text-sm file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:text-xs file:font-display"
                />
              </div>
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-4"
                variant="hero"
                size="lg"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>

            {/* Gallery grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img) => (
                <div key={img.id} className="group relative rounded-xl overflow-hidden border border-border bg-card">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-display font-semibold text-sm">{img.title}</h4>
                    {img.company_name && (
                      <p className="text-xs text-primary mt-0.5 flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> {img.company_name}
                      </p>
                    )}
                    <span className="text-xs text-muted-foreground">{img.category}</span>
                  </div>
                  <button
                    onClick={() => deleteImage(img.id, img.image_url)}
                    className="absolute top-3 right-3 p-2 bg-destructive text-destructive-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {tab === "clients" && (
          <div>
            {/* Add new client form */}
            <div className="border border-border rounded-xl p-6 mb-8 bg-card">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Add New Client
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Client Name *"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
                <input
                  type="text"
                  placeholder="Logo URL (or use upload)"
                  value={newClientLogoUrl}
                  onChange={(e) => setNewClientLogoUrl(e.target.value)}
                  className="px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring text-sm truncate"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewClientLogoFile(e.target.files?.[0] || null)}
                  className="px-4 py-3 bg-muted border border-border rounded-lg text-foreground text-sm file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:text-xs file:font-display"
                />
              </div>
              <Button
                onClick={handleAddClient}
                disabled={addingClient || !newClientName || (!newClientLogoUrl && !newClientLogoFile)}
                className="mt-4"
                variant="hero"
                size="lg"
              >
                {addingClient ? "Adding..." : "Add Client"}
              </Button>
            </div>

            {/* Clients grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {clients.map((client) => (
                <div key={client.id} className="group relative rounded-xl overflow-hidden border border-border bg-card">
                  {editingClientId === client.id ? (
                    <div className="p-4 flex flex-col h-full gap-2">
                       <input
                        type="text"
                        value={editClientName}
                        onChange={(e) => setEditClientName(e.target.value)}
                        className="w-full px-2 py-1.5 bg-muted border border-border rounded text-sm mb-1"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={editClientLogoUrl}
                        onChange={(e) => setEditClientLogoUrl(e.target.value)}
                        className="w-full px-2 py-1.5 bg-muted border border-border rounded text-sm text-muted-foreground mb-1 truncate"
                        placeholder="Logo URL"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditClientLogoFile(e.target.files?.[0] || null)}
                        className="w-full px-2 py-1.5 bg-muted border border-border rounded text-xs mb-2 file:mr-2 file:px-2 file:py-0.5 file:rounded file:border-0 file:bg-primary file:text-primary-foreground"
                      />
                      <div className="mt-auto flex gap-2">
                        <Button size="sm" className="w-full flex-1" onClick={() => handleUpdateClient(client.id)} disabled={updatingClient}>{updatingClient ? "..." : "Save"}</Button>
                        <Button size="sm" variant="outline" className="w-full flex-1" onClick={() => { setEditingClientId(null); setEditClientLogoFile(null); }} disabled={updatingClient}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="h-24 w-full flex items-center justify-center p-4 bg-background cursor-pointer" onClick={() => { setEditingClientId(client.id); setEditClientName(client.name); setEditClientLogoUrl(client.logo_url); }}>
                        <img
                          src={client.logo_url}
                          alt={client.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('ui-avatars')) {
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=transparent&color=64748b&size=128&bold=true`;
                            }
                          }}
                        />
                      </div>
                      <div className="p-3 border-t border-border bg-card">
                        <h4 className="font-display font-semibold text-xs text-center truncate" title={client.name}>
                            {client.name}
                        </h4>
                      </div>
                      <div className="absolute top-2 right-2 flex flex-col gap-1 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditingClientId(client.id); setEditClientName(client.name); setEditClientLogoUrl(client.logo_url); }}
                          className="p-1.5 bg-primary text-primary-foreground rounded-lg shadow"
                          title="Edit client"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteClient(client.id); }}
                          className="p-1.5 bg-destructive text-destructive-foreground rounded-lg shadow"
                          title="Delete client"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {tab === "settings" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
              <div>
                <h2 className="text-2xl font-display font-semibold text-foreground">
                  Site Settings
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage dynamic configurations for the public website.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl">
              <h3 className="font-display font-semibold text-lg flex items-center gap-2 mb-4">
                <Image className="h-5 w-5 text-primary" />
                Hero Section Background
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a new custom background image for the main hero section of the landing page.
              </p>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setHeroBgFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground text-sm file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:text-xs file:font-display cursor-pointer"
                />
                <Button
                  onClick={handleUpdateHeroBg}
                  disabled={updatingHeroBg || !heroBgFile}
                  className="w-full sm:w-auto"
                  variant="hero"
                >
                  {updatingHeroBg ? "Uploading..." : "Save Hero Background"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
