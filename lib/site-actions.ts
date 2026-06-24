"use server"

import { executeQuery } from "./mysql"

export interface SiteSetting {
  id: number
  setting_key: string
  setting_value: string | null
  setting_group: string
  label: string
}

// Fetch all settings as a flat key→value map
export async function getAllSettings(): Promise<Record<string, string>> {
  try {
    const rows = (await executeQuery("SELECT setting_key, setting_value FROM site_settings")) as any[]
    const map: Record<string, string> = {}
    for (const row of rows) {
      map[row.setting_key] = row.setting_value ?? ""
    }
    return map
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return {}
  }
}

// Fetch settings for a specific group
export async function getSettingsByGroup(group: string): Promise<SiteSetting[]> {
  try {
    const rows = await executeQuery(
      "SELECT * FROM site_settings WHERE setting_group = ? ORDER BY id",
      [group]
    )
    return rows as SiteSetting[]
  } catch (error) {
    console.error("Error fetching settings group:", error)
    return []
  }
}

// Fetch all settings rows (for admin editor)
export async function getAllSettingRows(): Promise<SiteSetting[]> {
  try {
    const rows = await executeQuery(
      "SELECT * FROM site_settings ORDER BY setting_group, id"
    )
    return rows as SiteSetting[]
  } catch (error) {
    console.error("Error fetching all setting rows:", error)
    return []
  }
}

// Update a single setting
export async function updateSetting(key: string, value: string): Promise<boolean> {
  try {
    await executeQuery(
      "UPDATE site_settings SET setting_value = ? WHERE setting_key = ?",
      [value, key]
    )
    return true
  } catch (error) {
    console.error("Error updating setting:", error)
    return false
  }
}

// Bulk update settings (used by admin save button)
export async function bulkUpdateSettings(
  updates: Record<string, string>
): Promise<boolean> {
  try {
    for (const [key, value] of Object.entries(updates)) {
      await executeQuery(
        "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)",
        [key, value]
      )
    }
    return true
  } catch (error) {
    console.error("Error bulk updating settings:", error)
    return false
  }
}
