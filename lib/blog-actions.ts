"use server"

import { executeQuery } from "./mysql"
import type { BlogPost } from "./mysql"

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const results = await executeQuery("SELECT * FROM blog_posts WHERE status = ? ORDER BY created_at DESC", [
      "Published",
    ])
    return results as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const results = await executeQuery("SELECT * FROM blog_posts ORDER BY created_at DESC")
    return results as BlogPost[]
  } catch (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }
}

export async function getBlogPost(id: number): Promise<BlogPost | null> {
  try {
    const results = await executeQuery("SELECT * FROM blog_posts WHERE id = ?", [id])
    const posts = results as BlogPost[]
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function createBlogPost(postData: {
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  image?: string
}): Promise<BlogPost> {
  try {
    const result = (await executeQuery(
      "INSERT INTO blog_posts (title, excerpt, content, author, category, image) VALUES (?, ?, ?, ?, ?, ?)",
      [postData.title, postData.excerpt, postData.content, postData.author, postData.category, postData.image || null],
    )) as any

    // Fetch the created post
    const createdPost = await getBlogPost(result.insertId)
    if (!createdPost) {
      throw new Error("Failed to retrieve created post")
    }

    return createdPost
  } catch (error) {
    console.error("Error creating blog post:", error)
    throw new Error("Failed to create blog post")
  }
}

export async function updateBlogPost(id: number, postData: Partial<BlogPost>): Promise<BlogPost> {
  try {
    const updateFields = []
    const updateValues = []

    if (postData.title) {
      updateFields.push("title = ?")
      updateValues.push(postData.title)
    }
    if (postData.excerpt) {
      updateFields.push("excerpt = ?")
      updateValues.push(postData.excerpt)
    }
    if (postData.content) {
      updateFields.push("content = ?")
      updateValues.push(postData.content)
    }
    if (postData.author) {
      updateFields.push("author = ?")
      updateValues.push(postData.author)
    }
    if (postData.category) {
      updateFields.push("category = ?")
      updateValues.push(postData.category)
    }
    if (postData.image !== undefined) {
      updateFields.push("image = ?")
      updateValues.push(postData.image)
    }
    if (postData.status) {
      updateFields.push("status = ?")
      updateValues.push(postData.status)
    }

    updateFields.push("updated_at = CURRENT_TIMESTAMP")
    updateValues.push(id)

    await executeQuery(`UPDATE blog_posts SET ${updateFields.join(", ")} WHERE id = ?`, updateValues)

    const updatedPost = await getBlogPost(id)
    if (!updatedPost) {
      throw new Error("Failed to retrieve updated post")
    }

    return updatedPost
  } catch (error) {
    console.error("Error updating blog post:", error)
    throw new Error("Failed to update blog post")
  }
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  try {
    await executeQuery("DELETE FROM blog_posts WHERE id = ?", [id])
    return true
  } catch (error) {
    console.error("Error deleting blog post:", error)
    throw new Error("Failed to delete blog post")
  }
}
