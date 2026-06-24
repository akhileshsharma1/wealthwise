"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PlusCircle, Edit, Trash2, Eye, LogOut, Shield, Mail, Phone, Save, Settings, Users, Briefcase, FileText, X, CheckCircle } from "lucide-react"
import Image from "next/image"
import { getAllBlogPosts, createBlogPost, deleteBlogPost, updateBlogPost } from "@/lib/blog-actions"
import { getContactSubmissions, updateContactStatus, deleteContactSubmission } from "@/lib/contact-actions"
import { getAllSettingRows, bulkUpdateSettings, type SiteSetting } from "@/lib/site-actions"
import { getAllServicesAdmin, createService, updateService, deleteService, type Service } from "@/lib/services-actions"
import { getAllTeamMembersAdmin, createTeamMember, updateTeamMember, deleteTeamMember, type TeamMember } from "@/lib/team-actions"
import type { BlogPost, ContactSubmission } from "@/lib/mysql"
import ImageUpload from "./image-upload"

const TABS = [
  { id: "posts",    label: "Blog Posts",    icon: FileText },
  { id: "contacts", label: "Contacts",      icon: Mail },
  { id: "services", label: "Services",      icon: Briefcase },
  { id: "team",     label: "Team",          icon: Users },
  { id: "settings", label: "Site Settings", icon: Settings },
]

const BLOG_CATEGORIES = ["Tax", "Business", "Finance", "Compliance", "HR", "Technology"]
const BLOG_AUTHORS = ["CA Muskan Agrawal", "CA Manish Shrestha", "CA Kinjal Puri", "Jiban Prajuli", "CA Bibek Parajuli"]
const ICON_OPTIONS = ["Calculator","FileText","Users","Building","TrendingUp","Shield","Briefcase","Globe","DollarSign","BarChart","BookOpen","Settings","Star","Zap"]

export default function SecureAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("posts")
  const router = useRouter()

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", content: "", category: "", author: "", image: "" })
  const [blogStatus, setBlogStatus] = useState<"idle"|"success"|"error">("idle")

  // Contact state
  const [contacts, setContacts] = useState<ContactSubmission[]>([])

  // Settings state
  const [settingRows, setSettingRows] = useState<SiteSetting[]>([])
  const [settingEdits, setSettingEdits] = useState<Record<string, string>>({})
  const [settingsStatus, setSettingsStatus] = useState<"idle"|"saving"|"saved"|"error">("idle")

  // Services state
  const [services, setServices] = useState<Service[]>([])
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [serviceForm, setServiceForm] = useState({ icon_name: "Briefcase", title: "", description: "", features: "", full_description: "", sort_order: 99 })
  const [serviceStatus, setServiceStatus] = useState<"idle"|"success"|"error">("idle")

  // Team state
  const [team, setTeam] = useState<TeamMember[]>([])
  const [showTeamForm, setShowTeamForm] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [teamForm, setTeamForm] = useState({ name: "", position: "", qualification: "", image: "", description: "", full_description: "", experience: "", education: "", email: "", phone: "", linkedin: "", slug: "", sort_order: 99 })
  const [teamStatus, setTeamStatus] = useState<"idle"|"success"|"error">("idle")

  useEffect(() => {
    const token = localStorage.getItem("wealthwise_admin_token")
    if (token === "authenticated") {
      setIsAuthenticated(true)
      fetchAll()
    } else {
      router.push("/admin/login")
    }
    setIsLoading(false)
  }, [router])

  const fetchAll = async () => {
    try {
      const [posts, contactList, rows, svcList, teamList] = await Promise.all([
        getAllBlogPosts(),
        getContactSubmissions(),
        getAllSettingRows(),
        getAllServicesAdmin(),
        getAllTeamMembersAdmin(),
      ])
      setBlogPosts(posts)
      setContacts(contactList)
      setSettingRows(rows)
      const initial: Record<string, string> = {}
      rows.forEach((r) => { initial[r.setting_key] = r.setting_value ?? "" })
      setSettingEdits(initial)
      setServices(svcList)
      setTeam(teamList)
    } catch (e) {
      console.error("Error fetching data:", e)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("wealthwise_admin_token")
    router.push("/admin/login")
  }

  // ── Blog handlers ──────────────────────────────────────────────
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBlogStatus("idle")
    try {
      if (editingPost) {
        await updateBlogPost(editingPost.id, blogForm)
      } else {
        await createBlogPost(blogForm)
      }
      setBlogStatus("success")
      setShowBlogForm(false)
      setEditingPost(null)
      setBlogForm({ title: "", excerpt: "", content: "", category: "", author: "", image: "" })
      const posts = await getAllBlogPosts()
      setBlogPosts(posts)
    } catch {
      setBlogStatus("error")
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setBlogForm({ title: post.title, excerpt: post.excerpt, content: post.content, category: post.category, author: post.author, image: post.image ?? "" })
    setShowBlogForm(true)
  }

  const handleDeletePost = async (id: number) => {
    if (!confirm("Delete this post?")) return
    await deleteBlogPost(id)
    setBlogPosts(blogPosts.filter((p) => p.id !== id))
  }

  // ── Settings handlers ──────────────────────────────────────────
  const handleSaveSettings = async () => {
    setSettingsStatus("saving")
    const ok = await bulkUpdateSettings(settingEdits)
    setSettingsStatus(ok ? "saved" : "error")
    setTimeout(() => setSettingsStatus("idle"), 3000)
  }

  // ── Service handlers ───────────────────────────────────────────
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServiceStatus("idle")
    try {
      const features = serviceForm.features.split("\n").map((f) => f.trim()).filter(Boolean)
      if (editingService) {
        await updateService(editingService.id, { ...serviceForm, features })
      } else {
        await createService({ ...serviceForm, features })
      }
      setServiceStatus("success")
      setShowServiceForm(false)
      setEditingService(null)
      setServiceForm({ icon_name: "Briefcase", title: "", description: "", features: "", full_description: "", sort_order: 99 })
      setServices(await getAllServicesAdmin())
    } catch {
      setServiceStatus("error")
    }
  }

  const handleEditService = (svc: Service) => {
    setEditingService(svc)
    setServiceForm({ icon_name: svc.icon_name, title: svc.title, description: svc.description, features: (svc.features ?? []).join("\n"), full_description: svc.full_description, sort_order: svc.sort_order })
    setShowServiceForm(true)
  }

  const handleDeleteService = async (id: number) => {
    if (!confirm("Delete this service?")) return
    await deleteService(id)
    setServices(services.filter((s) => s.id !== id))
  }

  // ── Team handlers ──────────────────────────────────────────────
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTeamStatus("idle")
    try {
      const education = teamForm.education.split("\n").map((e) => e.trim()).filter(Boolean)
      const slug = teamForm.slug || teamForm.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      if (editingMember) {
        await updateTeamMember(editingMember.id, { ...teamForm, education, slug })
      } else {
        await createTeamMember({ ...teamForm, education, slug })
      }
      setTeamStatus("success")
      setShowTeamForm(false)
      setEditingMember(null)
      setTeamForm({ name: "", position: "", qualification: "", image: "", description: "", full_description: "", experience: "", education: "", email: "", phone: "", linkedin: "", slug: "", sort_order: 99 })
      setTeam(await getAllTeamMembersAdmin())
    } catch {
      setTeamStatus("error")
    }
  }

  const handleEditMember = (m: TeamMember) => {
    setEditingMember(m)
    setTeamForm({ name: m.name, position: m.position, qualification: m.qualification ?? "", image: m.image ?? "", description: m.description ?? "", full_description: m.full_description ?? "", experience: m.experience ?? "", education: (m.education ?? []).join("\n"), email: m.email ?? "", phone: m.phone ?? "", linkedin: m.linkedin ?? "", slug: m.slug, sort_order: m.sort_order })
    setShowTeamForm(true)
  }

  const handleDeleteMember = async (id: number) => {
    if (!confirm("Delete this team member?")) return
    await deleteTeamMember(id)
    setTeam(team.filter((m) => m.id !== id))
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )

  if (!isAuthenticated) return null

  const groupedSettings = settingRows.reduce<Record<string, SiteSetting[]>>((acc, row) => {
    if (!acc[row.setting_group]) acc[row.setting_group] = []
    acc[row.setting_group].push(row)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/images/wealthwise-logo.png" alt="Wealthwise Logo" width={180} height={60} className="h-10 w-auto" />
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-sky-600" />
                <span className="text-lg font-semibold text-gray-900">Admin Dashboard</span>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b flex space-x-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.id === "posts" && <Badge variant="secondary">{blogPosts.length}</Badge>}
              {tab.id === "contacts" && <Badge variant="secondary">{contacts.length}</Badge>}
              {tab.id === "services" && <Badge variant="secondary">{services.length}</Badge>}
              {tab.id === "team" && <Badge variant="secondary">{team.length}</Badge>}
            </button>
          ))}
        </div>

        {/* ── BLOG POSTS ─────────────────────────────────────── */}
        {activeTab === "posts" && (
          <div className="space-y-6">
            {blogStatus === "success" && <Alert className="border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">Post saved successfully!</AlertDescription></Alert>}
            {blogStatus === "error" && <Alert variant="destructive"><AlertDescription>Error saving post.</AlertDescription></Alert>}

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
              <Button onClick={() => { setShowBlogForm(true); setEditingPost(null); setBlogForm({ title: "", excerpt: "", content: "", category: "", author: "", image: "" }) }} className="bg-sky-600 hover:bg-sky-700">
                <PlusCircle className="mr-2 h-4 w-4" /> New Post
              </Button>
            </div>

            {showBlogForm && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{editingPost ? "Edit Post" : "New Blog Post"}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowBlogForm(false)}><X className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium mb-1">Title</label><Input value={blogForm.title} onChange={(e) => setBlogForm((p) => ({ ...p, title: e.target.value }))} required /></div>
                      <div><label className="block text-sm font-medium mb-1">Category</label>
                        <Select value={blogForm.category} onValueChange={(v) => setBlogForm((p) => ({ ...p, category: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>{BLOG_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium mb-1">Author</label>
                        <Select value={blogForm.author} onValueChange={(v) => setBlogForm((p) => ({ ...p, author: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>{BLOG_AUTHORS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <ImageUpload value={blogForm.image} onChange={(url) => setBlogForm((p) => ({ ...p, image: url }))} />
                      </div>
                    </div>
                    <div><label className="block text-sm font-medium mb-1">Excerpt</label><Textarea value={blogForm.excerpt} onChange={(e) => setBlogForm((p) => ({ ...p, excerpt: e.target.value }))} rows={2} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Content (HTML)</label><Textarea value={blogForm.content} onChange={(e) => setBlogForm((p) => ({ ...p, content: e.target.value }))} rows={10} required /></div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-sky-600 hover:bg-sky-700"><Save className="mr-2 h-4 w-4" />{editingPost ? "Update Post" : "Publish Post"}</Button>
                      <Button type="button" variant="outline" onClick={() => setShowBlogForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                          <Badge variant={post.status === "Published" ? "default" : "secondary"}>{post.status}</Badge>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">By {post.author} · {new Date(post.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                        <Button variant="ghost" size="sm" asChild><a href={`/blog/${post.id}`} target="_blank" rel="noreferrer"><Eye className="h-4 w-4" /></a></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </div>
                  ))}
                  {blogPosts.length === 0 && <div className="text-center py-12 text-gray-500">No blog posts yet.</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── CONTACTS ───────────────────────────────────────── */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Contact Submissions</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {contacts.map((c) => (
                    <div key={c.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{c.name}</h3>
                            <Badge variant={c.status === "New" ? "default" : "secondary"}>{c.status}</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1"><Mail className="h-3 w-3" />{c.email}</div>
                            {c.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3" />{c.phone}</div>}
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Subject: {c.subject}</p>
                          <p className="text-sm text-gray-600">{c.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{new Date(c.created_at).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                          <Select value={c.status} onValueChange={(v) => { updateContactStatus(c.id, v); setContacts(contacts.map((x) => x.id === c.id ? { ...x, status: v } : x)) }}>
                            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete?")) { deleteContactSubmission(c.id); setContacts(contacts.filter((x) => x.id !== c.id)) } }}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && <div className="text-center py-12 text-gray-500">No contact submissions yet.</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── SERVICES ───────────────────────────────────────── */}
        {activeTab === "services" && (
          <div className="space-y-6">
            {serviceStatus === "success" && <Alert className="border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">Service saved!</AlertDescription></Alert>}
            {serviceStatus === "error" && <Alert variant="destructive"><AlertDescription>Error saving service.</AlertDescription></Alert>}

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Services</h2>
              <Button onClick={() => { setShowServiceForm(true); setEditingService(null); setServiceForm({ icon_name: "Briefcase", title: "", description: "", features: "", full_description: "", sort_order: 99 }) }} className="bg-sky-600 hover:bg-sky-700">
                <PlusCircle className="mr-2 h-4 w-4" /> New Service
              </Button>
            </div>

            {showServiceForm && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{editingService ? "Edit Service" : "New Service"}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowServiceForm(false)}><X className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleServiceSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium mb-1">Icon</label>
                        <Select value={serviceForm.icon_name} onValueChange={(v) => setServiceForm((p) => ({ ...p, icon_name: v }))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>{ICON_OPTIONS.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div><label className="block text-sm font-medium mb-1">Sort Order</label><Input type="number" value={serviceForm.sort_order} onChange={(e) => setServiceForm((p) => ({ ...p, sort_order: parseInt(e.target.value) || 99 }))} /></div>
                    </div>
                    <div><label className="block text-sm font-medium mb-1">Title</label><Input value={serviceForm.title} onChange={(e) => setServiceForm((p) => ({ ...p, title: e.target.value }))} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Short Description</label><Textarea value={serviceForm.description} onChange={(e) => setServiceForm((p) => ({ ...p, description: e.target.value }))} rows={2} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Features (one per line)</label><Textarea value={serviceForm.features} onChange={(e) => setServiceForm((p) => ({ ...p, features: e.target.value }))} rows={5} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" /></div>
                    <div><label className="block text-sm font-medium mb-1">Full Description</label><Textarea value={serviceForm.full_description} onChange={(e) => setServiceForm((p) => ({ ...p, full_description: e.target.value }))} rows={6} /></div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-sky-600 hover:bg-sky-700"><Save className="mr-2 h-4 w-4" />{editingService ? "Update" : "Create"}</Button>
                      <Button type="button" variant="outline" onClick={() => setShowServiceForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {services.map((svc) => (
                <Card key={svc.id} className={svc.is_active ? "" : "opacity-60"}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded font-mono">{svc.icon_name}</span>
                          <span className="text-xs text-gray-400">#{svc.sort_order}</span>
                          {!svc.is_active && <Badge variant="secondary">Hidden</Badge>}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{svc.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{svc.description}</p>
                      </div>
                      <div className="flex gap-1 ml-3 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => handleEditService(svc)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteService(svc.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── TEAM ───────────────────────────────────────────── */}
        {activeTab === "team" && (
          <div className="space-y-6">
            {teamStatus === "success" && <Alert className="border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">Team member saved!</AlertDescription></Alert>}
            {teamStatus === "error" && <Alert variant="destructive"><AlertDescription>Error saving team member.</AlertDescription></Alert>}

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
              <Button onClick={() => { setShowTeamForm(true); setEditingMember(null); setTeamForm({ name: "", position: "", qualification: "", image: "", description: "", full_description: "", experience: "", education: "", email: "", phone: "", linkedin: "", slug: "", sort_order: 99 }) }} className="bg-sky-600 hover:bg-sky-700">
                <PlusCircle className="mr-2 h-4 w-4" /> New Member
              </Button>
            </div>

            {showTeamForm && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{editingMember ? "Edit Member" : "New Team Member"}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowTeamForm(false)}><X className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium mb-1">Full Name</label><Input value={teamForm.name} onChange={(e) => setTeamForm((p) => ({ ...p, name: e.target.value }))} required /></div>
                      <div><label className="block text-sm font-medium mb-1">Position</label><Input value={teamForm.position} onChange={(e) => setTeamForm((p) => ({ ...p, position: e.target.value }))} required /></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium mb-1">Qualification</label><Input value={teamForm.qualification} onChange={(e) => setTeamForm((p) => ({ ...p, qualification: e.target.value }))} /></div>
                      <div><label className="block text-sm font-medium mb-1">Experience</label><Input value={teamForm.experience} onChange={(e) => setTeamForm((p) => ({ ...p, experience: e.target.value }))} placeholder="5+ years" /></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Photo</label>
                        <ImageUpload value={teamForm.image} onChange={(url) => setTeamForm((p) => ({ ...p, image: url }))} />
                      </div>
                      <div><label className="block text-sm font-medium mb-1">Slug (URL)</label><Input value={teamForm.slug} onChange={(e) => setTeamForm((p) => ({ ...p, slug: e.target.value }))} placeholder="mr-john-doe" /></div>
                    </div>
                    <div><label className="block text-sm font-medium mb-1">Short Description</label><Textarea value={teamForm.description} onChange={(e) => setTeamForm((p) => ({ ...p, description: e.target.value }))} rows={2} /></div>
                    <div><label className="block text-sm font-medium mb-1">Education (one per line)</label><Textarea value={teamForm.education} onChange={(e) => setTeamForm((p) => ({ ...p, education: e.target.value }))} rows={3} placeholder="Chartered Accountant&#10;B.Com from XYZ University" /></div>
                    <div><label className="block text-sm font-medium mb-1">Full Bio</label><Textarea value={teamForm.full_description} onChange={(e) => setTeamForm((p) => ({ ...p, full_description: e.target.value }))} rows={6} /></div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div><label className="block text-sm font-medium mb-1">Email</label><Input value={teamForm.email} onChange={(e) => setTeamForm((p) => ({ ...p, email: e.target.value }))} /></div>
                      <div><label className="block text-sm font-medium mb-1">Phone</label><Input value={teamForm.phone} onChange={(e) => setTeamForm((p) => ({ ...p, phone: e.target.value }))} /></div>
                      <div><label className="block text-sm font-medium mb-1">LinkedIn URL</label><Input value={teamForm.linkedin} onChange={(e) => setTeamForm((p) => ({ ...p, linkedin: e.target.value }))} /></div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-sky-600 hover:bg-sky-700"><Save className="mr-2 h-4 w-4" />{editingMember ? "Update" : "Add Member"}</Button>
                      <Button type="button" variant="outline" onClick={() => setShowTeamForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map((m) => (
                <Card key={m.id} className={m.is_active ? "" : "opacity-60"}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <img src={m.image || "/placeholder.svg"} alt={m.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{m.name}</h3>
                        <p className="text-sm text-sky-600">{m.position}</p>
                        <p className="text-xs text-gray-500">{m.experience}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => handleEditMember(m)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteMember(m.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── SITE SETTINGS ──────────────────────────────────── */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
              <Button onClick={handleSaveSettings} disabled={settingsStatus === "saving"} className="bg-sky-600 hover:bg-sky-700">
                <Save className="mr-2 h-4 w-4" />
                {settingsStatus === "saving" ? "Saving..." : settingsStatus === "saved" ? "Saved!" : "Save All Changes"}
              </Button>
            </div>
            {settingsStatus === "saved" && <Alert className="border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">All settings saved successfully!</AlertDescription></Alert>}
            {settingsStatus === "error" && <Alert variant="destructive"><AlertDescription>Error saving settings.</AlertDescription></Alert>}

            {Object.entries(groupedSettings).map(([group, rows]) => (
              <Card key={group}>
                <CardHeader>
                  <CardTitle className="capitalize text-lg">{group.replace("_", " ")} Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rows.map((row) => {
                    const isLong = (row.setting_value ?? "").length > 100 || row.setting_key.includes("description") || row.setting_key.includes("content") || row.setting_key.includes("mission") || row.setting_key.includes("quote") || row.setting_key.includes("expertise") || row.setting_key.includes("hours")
                    const isImage = row.setting_key.includes("image") || row.setting_key.includes("photo")
                    return (
                      <div key={row.setting_key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {row.label}
                          <span className="ml-2 text-xs text-gray-400 font-mono">({row.setting_key})</span>
                        </label>
                        {isImage ? (
                          <ImageUpload
                            value={settingEdits[row.setting_key] ?? ""}
                            onChange={(url) => setSettingEdits((p) => ({ ...p, [row.setting_key]: url }))}
                          />
                        ) : isLong ? (
                          <Textarea
                            value={settingEdits[row.setting_key] ?? ""}
                            onChange={(e) => setSettingEdits((p) => ({ ...p, [row.setting_key]: e.target.value }))}
                            rows={4}
                            className="font-normal"
                          />
                        ) : (
                          <Input
                            value={settingEdits[row.setting_key] ?? ""}
                            onChange={(e) => setSettingEdits((p) => ({ ...p, [row.setting_key]: e.target.value }))}
                          />
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={settingsStatus === "saving"} className="bg-sky-600 hover:bg-sky-700" size="lg">
                <Save className="mr-2 h-4 w-4" />
                {settingsStatus === "saving" ? "Saving..." : "Save All Changes"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
