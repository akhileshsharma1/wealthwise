"use client"

import React, { useCallback, useState } from "react"
import { UploadCloud, Loader2, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      const data = await res.json()
      if (data.url) {
        onChange(data.url)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
      setIsDragOver(false)
    }
  }

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0])
    }
  }, [])

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0])
    }
  }, [])

  return (
    <div className="w-full">
      {value ? (
        <div className="relative inline-block border rounded-lg overflow-hidden group">
          <img src={value} alt="Uploaded" className="h-32 w-auto object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragOver ? "border-sky-500 bg-sky-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-sky-500 animate-spin mb-2" />
            ) : (
              <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
            )}
            <p className="mb-1 text-sm text-gray-500 font-medium">
              {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
            </p>
            {!isUploading && <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>}
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={onFileChange} disabled={isUploading} />
        </label>
      )}
    </div>
  )
}
