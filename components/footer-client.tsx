"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {
  description: string
  phone: string
  email: string
  address: string
  facebookUrl: string
  twitterUrl: string
  linkedinUrl: string
  instagramUrl: string
}

export default function FooterClient({
  description, phone, email, address,
  facebookUrl, twitterUrl, linkedinUrl, instagramUrl,
}: Props) {
  const pathname = usePathname()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const existingFooter = document.querySelector('footer')
    if (!existingFooter) {
      setShouldRender(true)
    } else {
      const hasContent = existingFooter.querySelector('.container, .grid, .space-y-6')
      if (!hasContent) setShouldRender(true)
    }
  }, [])

  const handleNavClick = (href: string, sectionId?: string) => {
    if (href.startsWith("#") && sectionId) {
      if (pathname !== "/") { window.location.href = `/${href}`; return }
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!shouldRender) return null

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/wealthwise-logo.png" alt="Wealthwise Logo" width={180} height={60} className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 leading-relaxed">{description}</p>
            <div className="flex space-x-4">
              <Link href={facebookUrl} className="p-2 bg-gray-800 hover:bg-sky-600 rounded-lg transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href={twitterUrl} className="p-2 bg-gray-800 hover:bg-sky-600 rounded-lg transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href={linkedinUrl} className="p-2 bg-gray-800 hover:bg-sky-600 rounded-lg transition-colors"><Linkedin className="h-5 w-5" /></Link>
              <Link href={instagramUrl} target="_blank" className="p-2 bg-gray-800 hover:bg-sky-600 rounded-lg transition-colors"><Instagram className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {["Tax Planning","Accounting Services","Business Registration","Payroll Management","Compliance Services"].map((svc) => (
                <li key={svc}>
                  <button onClick={() => handleNavClick("#services", "services")} className="text-gray-400 hover:text-white transition-colors text-left">{svc}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Regulatory Links</h3>
            <ul className="space-y-3">
              {[
                { label: "IRD - Inland Revenue Department", url: "https://ird.gov.np" },
                { label: "OCR - Office of Company Registrar", url: "https://ocr.gov.np" },
                { label: "NRB - Nepal Rastra Bank", url: "https://www.nrb.org.np" },
                { label: "ICAN - Chartered Accountants", url: "https://ican.org.np" },
                { label: "SEBON - Securities Board", url: "https://sebon.gov.np" },
              ].map((link) => (
                <li key={link.url}>
                  <Link href={link.url} target="_blank" className="text-gray-400 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-sky-600" /><span className="text-gray-400">{phone}</span></div>
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-sky-600" /><span className="text-gray-400">{email}</span></div>
              <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-sky-600 mt-1" /><span className="text-gray-400">{address}</span></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Wealthwise. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
