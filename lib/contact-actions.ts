"use server"

import { executeQuery } from "./mysql"
import type { ContactSubmission } from "./mysql"

export async function submitContactForm(formData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}): Promise<ContactSubmission> {
  try {
    const result = (await executeQuery(
      "INSERT INTO contact_submissions (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
      [formData.name, formData.email, formData.phone || null, formData.subject, formData.message],
    )) as any

    // Fetch the created submission
    const submissions = (await executeQuery("SELECT * FROM contact_submissions WHERE id = ?", [
      result.insertId,
    ])) as ContactSubmission[]

    if (submissions.length === 0) {
      throw new Error("Failed to retrieve created submission")
    }

    return submissions[0]
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw new Error("Failed to submit contact form")
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const results = await executeQuery("SELECT * FROM contact_submissions ORDER BY created_at DESC")
    return results as ContactSubmission[]
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return []
  }
}

export async function updateContactStatus(id: number, status: string): Promise<ContactSubmission> {
  try {
    await executeQuery("UPDATE contact_submissions SET status = ? WHERE id = ?", [status, id])

    const submissions = (await executeQuery("SELECT * FROM contact_submissions WHERE id = ?", [
      id,
    ])) as ContactSubmission[]

    if (submissions.length === 0) {
      throw new Error("Failed to retrieve updated submission")
    }

    return submissions[0]
  } catch (error) {
    console.error("Error updating contact status:", error)
    throw new Error("Failed to update contact status")
  }
}

export async function deleteContactSubmission(id: number): Promise<boolean> {
  try {
    await executeQuery("DELETE FROM contact_submissions WHERE id = ?", [id])
    return true
  } catch (error) {
    console.error("Error deleting contact submission:", error)
    throw new Error("Failed to delete contact submission")
  }
}
