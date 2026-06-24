"use server"

import { executeQuery } from "./mysql"

export interface Service {
  id: number
  icon_name: string
  title: string
  description: string
  features: string[]
  full_description: string
  sort_order: number
  is_active: number
  created_at: string
  updated_at: string
}

function parseService(row: any): Service {
  return {
    ...row,
    features: typeof row.features === "string" ? JSON.parse(row.features) : (row.features ?? []),
  }
}

export async function getAllServices(): Promise<Service[]> {
  try {
    const rows = (await executeQuery(
      "SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC"
    )) as any[]
    return rows.map(parseService)
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export async function getAllServicesAdmin(): Promise<Service[]> {
  try {
    const rows = (await executeQuery(
      "SELECT * FROM services ORDER BY sort_order ASC"
    )) as any[]
    return rows.map(parseService)
  } catch (error) {
    console.error("Error fetching all services:", error)
    return []
  }
}

export async function getServiceById(id: number): Promise<Service | null> {
  try {
    const rows = (await executeQuery("SELECT * FROM services WHERE id = ?", [id])) as any[]
    return rows.length > 0 ? parseService(rows[0]) : null
  } catch (error) {
    console.error("Error fetching service:", error)
    return null
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const rows = (await executeQuery(
      "SELECT * FROM services WHERE LOWER(REPLACE(REPLACE(title, ' ', '-'), '&', 'and')) = ?",
      [slug]
    )) as any[]
    return rows.length > 0 ? parseService(rows[0]) : null
  } catch (error) {
    console.error("Error fetching service by slug:", error)
    return null
  }
}

export async function createService(data: {
  icon_name: string
  title: string
  description: string
  features: string[]
  full_description: string
  sort_order?: number
}): Promise<boolean> {
  try {
    await executeQuery(
      "INSERT INTO services (icon_name, title, description, features, full_description, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
      [
        data.icon_name,
        data.title,
        data.description,
        JSON.stringify(data.features),
        data.full_description,
        data.sort_order ?? 99,
      ]
    )
    return true
  } catch (error) {
    console.error("Error creating service:", error)
    return false
  }
}

export async function updateService(
  id: number,
  data: Partial<{
    icon_name: string
    title: string
    description: string
    features: string[]
    full_description: string
    sort_order: number
    is_active: number
  }>
): Promise<boolean> {
  try {
    const fields: string[] = []
    const values: any[] = []
    if (data.icon_name !== undefined) { fields.push("icon_name = ?"); values.push(data.icon_name) }
    if (data.title !== undefined) { fields.push("title = ?"); values.push(data.title) }
    if (data.description !== undefined) { fields.push("description = ?"); values.push(data.description) }
    if (data.features !== undefined) { fields.push("features = ?"); values.push(JSON.stringify(data.features)) }
    if (data.full_description !== undefined) { fields.push("full_description = ?"); values.push(data.full_description) }
    if (data.sort_order !== undefined) { fields.push("sort_order = ?"); values.push(data.sort_order) }
    if (data.is_active !== undefined) { fields.push("is_active = ?"); values.push(data.is_active) }
    if (fields.length === 0) return true
    values.push(id)
    await executeQuery(`UPDATE services SET ${fields.join(", ")} WHERE id = ?`, values)
    return true
  } catch (error) {
    console.error("Error updating service:", error)
    return false
  }
}

export async function deleteService(id: number): Promise<boolean> {
  try {
    await executeQuery("DELETE FROM services WHERE id = ?", [id])
    return true
  } catch (error) {
    console.error("Error deleting service:", error)
    return false
  }
}
