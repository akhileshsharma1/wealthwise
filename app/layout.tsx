import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'WealthWise',
  description: 'Financial Consultancy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" type="image/png" sizes="512x512" />
      </head>
       <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
