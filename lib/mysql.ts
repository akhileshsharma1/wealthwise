import mysql from "mysql2/promise"

// Database configuration
const dbConfig = {
  host: process.env.MYSQL_HOST ?? "localhost",
  user: process.env.MYSQL_USER ?? "wealthwise",
  password: process.env.MYSQL_PASSWORD ?? "gorkhali",
  database: process.env.MYSQL_DATABASE ?? "wealthwise_db",
  port: parseInt(process.env.MYSQL_PORT ?? "3306", 10),
  ssl: process.env.MYSQL_SSL === "true" ? { rejectUnauthorized: false } : undefined,
};


// Create connection pool for better performance
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Test connection function
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    console.log("✅ MySQL database connected successfully")
    return true
  } catch (error) {
    console.error("❌ MySQL connection failed:", error)
    return false
  }
}

// Execute query function
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Types for our database tables
export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  image?: string
  status: string
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: number
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: string
  created_at: string
}

export interface AdminUser {
  id: number
  username: string
  email?: string
  role: string
  created_at: string
}

export default pool
