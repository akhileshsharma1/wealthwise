"use server"

import { executeQuery } from "./mysql"
import { revalidatePath } from "next/cache"

export interface TeamMember {
  id: number
  name: string
  position: string
  qualification: string
  image: string
  description: string
  full_description: string
  experience: string
  education: string[]
  email: string
  phone: string
  linkedin: string
  slug: string
  sort_order: number
  is_active: number
  created_at: string
  updated_at: string
}

function parseMember(row: any): TeamMember {
  return {
    ...row,
    education: typeof row.education === "string" ? JSON.parse(row.education) : (row.education ?? []),
  }
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  try {
    const rows = (await executeQuery(
      "SELECT * FROM team_members WHERE is_active = 1 ORDER BY sort_order ASC"
    )) as any[]
    return rows.map(parseMember)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return []
  }
}

export async function getAllTeamMembersAdmin(): Promise<TeamMember[]> {
  try {
    const rows = (await executeQuery(
      "SELECT * FROM team_members ORDER BY sort_order ASC"
    )) as any[]
    return rows.map(parseMember)
  } catch (error) {
    console.error("Error fetching all team members:", error)
    return []
  }
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  try {
    const rows = (await executeQuery(
      "SELECT * FROM team_members WHERE slug = ?",
      [slug]
    )) as any[]
    return rows.length > 0 ? parseMember(rows[0]) : null
  } catch (error) {
    console.error("Error fetching team member by slug:", error)
    return null
  }
}

export async function createTeamMember(data: {
  name: string
  position: string
  qualification: string
  image: string
  description: string
  full_description: string
  experience: string
  education: string[]
  email: string
  phone: string
  linkedin: string
  slug: string
  sort_order?: number
}): Promise<boolean> {
  try {
    await executeQuery(
      `INSERT INTO team_members
        (name, position, qualification, image, description, full_description,
         experience, education, email, phone, linkedin, slug, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name, data.position, data.qualification, data.image,
        data.description, data.full_description, data.experience,
        JSON.stringify(data.education), data.email, data.phone,
        data.linkedin, data.slug, data.sort_order ?? 99,
      ]
    )
    revalidatePath("/", "layout")
    return true
  } catch (error) {
    console.error("Error creating team member:", error)
    return false
  }
}

export async function updateTeamMember(
  id: number,
  data: Partial<Omit<TeamMember, "id" | "created_at" | "updated_at">>
): Promise<boolean> {
  try {
    const fields: string[] = []
    const values: any[] = []
    const allowed = [
      "name", "position", "qualification", "image", "description",
      "full_description", "experience", "email", "phone", "linkedin",
      "slug", "sort_order", "is_active",
    ] as const
    for (const key of allowed) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`)
        values.push(data[key])
      }
    }
    if (data.education !== undefined) {
      fields.push("education = ?")
      values.push(JSON.stringify(data.education))
    }
    if (fields.length === 0) return true
    values.push(id)
    await executeQuery(`UPDATE team_members SET ${fields.join(", ")} WHERE id = ?`, values)
    revalidatePath("/", "layout")
    return true
  } catch (error) {
    console.error("Error updating team member:", error)
    return false
  }
}

export async function deleteTeamMember(id: number): Promise<boolean> {
  try {
    await executeQuery("DELETE FROM team_members WHERE id = ?", [id])
    revalidatePath("/", "layout")
    return true
  } catch (error) {
    console.error("Error deleting team member:", error)
    return false
  }
}
