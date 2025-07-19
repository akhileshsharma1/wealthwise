import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
