import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate a unique filename keeping the original extension
    const extension = file.name.split('.').pop() || "jpg"
    const uniqueFilename = `${crypto.randomUUID()}.${extension}`

    // Path to save inside public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads")
    const filePath = join(uploadDir, uniqueFilename)

    await writeFile(filePath, buffer)

    return NextResponse.json({ url: `/uploads/${uniqueFilename}` })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "File upload failed." }, { status: 500 })
  }
}
