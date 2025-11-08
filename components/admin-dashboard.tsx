"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("posts")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    image: "",
  })

  const categories = ["Tax", "Business", "Finance", "Compliance", "HR", "Technology"]
  const authors = ["CA Muskan Agrawal", "CA Manish Shrestha", "CA Kinjal Puri", "Jiban Prajuli"]

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Understanding VAT Implementation in Nepal: A Complete Guide",
      excerpt: "Learn about the latest VAT regulations and how they affect your business operations in Nepal.",
      author: "CA Muskan Agrawal",
      date: "2024-01-15",
      category: "Tax",
      status: "Published",
    },
    {
      id: 2,
      title: "Business Registration Process in Nepal: Step by Step",
      excerpt:
        "A comprehensive guide to registering your business in Nepal, including required documents and procedures.",
      author: "Jiban Prajuli",
      date: "2024-01-10",
      category: "Business",
      status: "Published",
    },
    {
      id: 3,
      title: "Digital Banking Regulations in Nepal 2024",
      excerpt: "New regulations for digital banking and fintech companies operating in Nepal.",
      author: "CA Manish Shrestha",
      date: "2024-01-08",
      category: "Finance",
      status: "Draft",
    },
    {
      id: 4,
      title: "ESG Compliance for Nepali Corporations",
      excerpt: "Environmental, Social, and Governance compliance requirements for modern businesses.",
      author: "CA Kinjal Puri",
      date: "2024-01-05",
      category: "Compliance",
      status: "Published",
    },
    {
      id: 5,
      title: "Remote Work Tax Implications",
      excerpt: "Tax considerations for businesses adopting remote work policies in Nepal.",
      author: "CA Muskan Agrawal",
      date: "2024-01-03",
      category: "Tax",
      status: "Published",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPost = {
      id: blogPosts.length + 1,
      ...formData,
      date: new Date().toISOString().split("T")[0],
      status: "Published",
    }
    setBlogPosts([newPost, ...blogPosts])
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      image: "",
    })
    setShowCreateForm(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const deletePost = (id: number) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== id))
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your blog posts and website content</p>
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
              Blog Posts
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
                          By {post.author} • {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
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

        {activeTab === "analytics" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-gray-900">1,234</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-gray-900">89</div>
                <div className="text-sm text-gray-600">Comments</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-gray-900">456</div>
                <div className="text-sm text-gray-600">Subscribers</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
