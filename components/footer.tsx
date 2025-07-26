"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Footer() {
  const pathname = usePathname()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Check if footer already exists on the page
    const existingFooter = document.querySelector('footer')
    if (!existingFooter) {
      setShouldRender(true)
    } else {
      // If footer exists but it's empty or just contains basic HTML, render this one
      const hasContent = existingFooter.querySelector('.container, .grid, .space-y-6')
      if (!hasContent) {
        setShouldRender(true)
      }
    }
  }, [])

  const handleNavClick = (href: string, sectionId?: string) => {
    if (href.startsWith("#") && sectionId) {
      // If we're on a different page, navigate to home first
      if (pathname !== "/") {
        window.location.href = `/${href}`
        return
      }

      // Smooth scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Don't render if footer already exists or if we haven't checked yet
  if (!shouldRender) {
    return null
  }

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/wealthwise-logo.png"
                alt="Wealthwise Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Trusted financial advisory and consulting firm specializing in tax, accounting, compliance, and business
              support services in Nepal.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-gray-800 hover:bg-sky-600 rounded-lg transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-gray-800 hover:bg-sky-600 rounded-lg transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-gray-800 hover:bg-sky-600 rounded-lg transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/wealthwiseconsultingpvt/?igsh=cDFkNmp2NDVlc282#" className="p-2 bg-gray-800 hover:bg-sky-600 rounded-lg transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavClick("#services", "services")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Tax Planning
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#services", "services")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Accounting Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#services", "services")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Business Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#services", "services")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Payroll Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#services", "services")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Compliance Services
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Regulatory Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://ird.gov.np"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  IRD - Inland Revenue Department
                </Link>
              </li>
              <li>
                <Link
                  href="https://ocr.gov.np"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  OCR - Office of Company Registrar
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.nrb.org.np"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  NRB - Nepal Rastra Bank
                </Link>
              </li>
              <li>
                <Link
                  href="https://ican.org.np"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ICAN - Institute of Chartered Accountants
                </Link>
              </li>
              <li>
                <Link
                  href="https://sebon.gov.np"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  SEBON - Securities Board of Nepal
                </Link>
              </li>
              <li>
                <Link
                  href="https://ibn.gov.np/"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  NIADDA - Nepal Investment Board
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavClick("#about", "about")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#services", "services")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#team", "team")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Our Team
                </button>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#contact", "contact")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-sky-600" />
                <span className="text-gray-400">+977 9843066123</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-sky-600" />
                <span className="text-gray-400">info@wealthwise.com.np</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-sky-600 mt-1" />
                <span className="text-gray-400">Gyaneshwor-30, Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Wealthwise. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}