"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getBlogPost } from "@/lib/blog-actions"
import type { BlogPost } from "@/lib/mysql"

interface BlogPostProps {
  postId: string
}

export default function BlogPostComponent({ postId }: BlogPostProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const postData = await getBlogPost(Number.parseInt(postId))
        setPost(postData)
      } catch (error) {
        console.error("Error fetching blog post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <div className="mb-8">
            <Badge className="bg-sky-600 hover:bg-sky-700 mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>5 min read</span>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-4">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt={post.author}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.author}</h3>
                <p className="text-gray-600 mb-4">
                  Senior Advisor at Wealthwise with extensive experience in taxation and compliance. Specializes in
                  helping businesses navigate complex regulations in Nepal.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
