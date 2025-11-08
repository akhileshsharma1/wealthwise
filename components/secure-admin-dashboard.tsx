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
import { PlusCircle, Edit, Trash2, Eye, LogOut, Shield, Mail, Phone } from "lucide-react"
import Image from "next/image"
import { getAllBlogPosts, createBlogPost, deleteBlogPost } from "@/lib/blog-actions"
import { getContactSubmissions, updateContactStatus, deleteContactSubmission } from "@/lib/contact-actions"
import type { BlogPost, ContactSubmission } from "@/lib/mysql"

export default function SecureAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("posts")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    image: "",
  })
  const router = useRouter()

  const categories = ["Tax", "Business", "Finance", "Compliance", "HR", "Technology"]
  const authors = ["CA Muskan Agrawal", "CA Manish Shrestha", "CA Kinjal Puri", "Jiban Prajuli"]

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("wealthwise_admin_token")
    if (token === "authenticated") {
      setIsAuthenticated(true)
      fetchData()
    } else {
      router.push("/admin/login")
    }
    setIsLoading(false)
  }, [router])

  const fetchData = async () => {
    try {
      const [posts, contacts] = await Promise.all([getAllBlogPosts(), getContactSubmissions()])
      setBlogPosts(posts)
      setContactSubmissions(contacts)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("wealthwise_admin_token")
    router.push("/admin/login")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus("idle")

    try {
      await createBlogPost(formData)
      setSubmitStatus("success")
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        author: "",
        image: "",
      })
      setShowCreateForm(false)
      // Refresh blog posts
      const posts = await getAllBlogPosts()
      setBlogPosts(posts)
    } catch (error) {
      console.error("Error creating post:", error)
      setSubmitStatus("error")
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDeletePost = async (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteBlogPost(id)
        setBlogPosts(blogPosts.filter((post) => post.id !== id))
      } catch (error) {
        console.error("Error deleting post:", error)
      }
    }
  }

  const handleUpdateContactStatus = async (id: number, status: string) => {
    try {
      await updateContactStatus(id, status)
      setContactSubmissions(contactSubmissions.map((contact) => (contact.id === id ? { ...contact, status } : contact)))
    } catch (error) {
      console.error("Error updating contact status:", error)
    }
  }

  const handleDeleteContact = async (id: number) => {
    if (confirm("Are you sure you want to delete this contact submission?")) {
      try {
        await deleteContactSubmission(id)
        setContactSubmissions(contactSubmissions.filter((contact) => contact.id !== id))
      } catch (error) {
        console.error("Error deleting contact:", error)
      }
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login redirect if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Secure Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/wealthwise-logo.png"
                alt="Wealthwise Logo"
                width={180}
                height={60}
                className="h-10 w-auto"
              />
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-sky-600" />
                <span className="text-lg font-semibold text-gray-900">Admin Dashboard</span>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
            <p className="text-gray-600">Manage your blog posts and contact submissions securely</p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex space-x-4 border-b">
              <button
                onClick={() => setActiveTab("posts")}
                className={`pb-2 px-1 ${
                  activeTab === "posts"
                    ? "border-b-2 border-sky-600 text-sky-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Blog Posts ({blogPosts.length})
              </button>
              <button
                onClick={() => setActiveTab("contacts")}
                className={`pb-2 px-1 ${
                  activeTab === "contacts"
                    ? "border-b-2 border-sky-600 text-sky-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Contact Submissions ({contactSubmissions.length})
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`pb-2 px-1 ${
                  activeTab === "analytics"
                    ? "border-b-2 border-sky-600 text-sky-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Analytics
              </button>
            </div>
          </div>

          {activeTab === "posts" && (
            <div>
              {submitStatus === "success" && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">Blog post created successfully!</AlertDescription>
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>Error creating blog post. Please try again.</AlertDescription>
                </Alert>
              )}

              {/* Create Post Button */}
              <div className="mb-6">
                <Button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-sky-600 hover:bg-sky-700">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Post
                </Button>
              </div>

              {/* Create Post Form */}
              {showCreateForm && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Create New Blog Post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <Input
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="Enter post title"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                          <Select value={formData.author} onValueChange={(value) => handleChange("author", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select author" />
                            </SelectTrigger>
                            <SelectContent>
                              {authors.map((author) => (
                                <SelectItem key={author} value={author}>
                                  {author}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                          <Input
                            value={formData.image}
                            onChange={(e) => handleChange("image", e.target.value)}
                            placeholder="Enter image URL"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                        <Textarea
                          value={formData.excerpt}
                          onChange={(e) => handleChange("excerpt", e.target.value)}
                          placeholder="Brief description of the post"
                          rows={3}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <Textarea
                          value={formData.content}
                          onChange={(e) => handleChange("content", e.target.value)}
                          placeholder="Write your blog post content here..."
                          rows={10}
                          required
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-sky-600 hover:bg-sky-700">
                          Publish Post
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Posts List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Blog Posts ({blogPosts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{post.title}</h3>
                            <Badge variant={post.status === "Published" ? "default" : "secondary"}>{post.status}</Badge>
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                          <div className="text-xs text-gray-500">
                            By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`/blog/${post.id}`} target="_blank" rel="noreferrer">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "contacts" && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Submissions ({contactSubmissions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contactSubmissions.map((contact) => (
                      <div key={contact.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                              <Badge variant={contact.status === "New" ? "default" : "secondary"}>
                                {contact.status}
                              </Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{contact.email}</span>
                              </div>
                              {contact.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  <span>{contact.phone}</span>
                                </div>
                              )}
                            </div>
                            <div className="mb-3">
                              <h4 className="font-medium text-gray-900 mb-1">Subject: {contact.subject}</h4>
                              <p className="text-gray-600 text-sm">{contact.message}</p>
                            </div>
                            <div className="text-xs text-gray-500">
                              Submitted on {new Date(contact.created_at).toLocaleDateString()} at{" "}
                              {new Date(contact.created_at).toLocaleTimeString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Select
                              value={contact.status}
                              onValueChange={(value) => handleUpdateContactStatus(contact.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="New">New</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteContact(contact.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {contactSubmissions.length === 0 && (
                      <div className="text-center py-8 text-gray-500">No contact submissions yet.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900">{blogPosts.length}</div>
                  <div className="text-sm text-gray-600">Total Posts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900">{contactSubmissions.length}</div>
                  <div className="text-sm text-gray-600">Contact Submissions</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900">
                    {contactSubmissions.filter((c) => c.status === "New").length}
                  </div>
                  <div className="text-sm text-gray-600">New Contacts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900">
                    {blogPosts.filter((p) => p.status === "Published").length}
                  </div>
                  <div className="text-sm text-gray-600">Published Posts</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
