"use server"

import { executeQuery } from "./mysql"
import bcrypt from "bcryptjs"

export async function authenticateAdmin(username: string, password: string): Promise<boolean> {
  try {
    const results = (await executeQuery("SELECT password_hash FROM admin_users WHERE username = ?", [
      username,
    ])) as any[]

    if (results.length === 0) {
      return false
    }

    // Proper bcrypt comparison against the DB hash
    return await bcrypt.compare(password, results[0].password_hash)
  } catch (error) {
    console.error("Error authenticating admin:", error)
    return false
  }
}

export async function createAdminUser(userData: {
  username: string
  password: string
  email?: string
}): Promise<boolean> {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    await executeQuery("INSERT INTO admin_users (username, password_hash, email) VALUES (?, ?, ?)", [
      userData.username,
      hashedPassword,
      userData.email || null,
    ])

    return true
  } catch (error) {
    console.error("Error creating admin user:", error)
    return false
  }
}
