"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()

  // Check if we're on the blog page
  const isBlogPage = pathname.startsWith("/blog")

  useEffect(() => {
    if (isBlogPage) {
      setActiveSection("blog")
      return
    }

    const handleScroll = () => {
      const sections = ["home", "about", "services", "team", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isBlogPage])

  const handleNavClick = (href: string, sectionId?: string) => {
    setIsMenuOpen(false)

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

  const getLinkClass = (section: string) => {
    return `text-gray-700 hover:text-sky-600 transition-colors ${
      activeSection === section ? "text-sky-600 font-semibold" : ""
    }`
  }

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/wealthwise-logo.png"
              alt="Wealthwise Logo"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/#home"
              className={getLinkClass("home")}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#home", "home")
              }}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className={getLinkClass("about")}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#about", "about")
              }}
            >
              About
            </Link>
            <Link
              href="/#services"
              className={getLinkClass("services")}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#services", "services")
              }}
            >
              Services
            </Link>
            <Link
              href="/#team"
              className={getLinkClass("team")}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#team", "team")
              }}
            >
              Team
            </Link>
            <Link href="/blog" className={getLinkClass("blog")}>
              Blog
            </Link>
            <Link
              href="/#contact"
              className={getLinkClass("contact")}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#contact", "contact")
              }}
            >
              Contact
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#home"
                className={getLinkClass("home")}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("#home", "home")
                }}
              >
                Home
              </Link>
              <Link
                href="/#about"
                className={getLinkClass("about")}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("#about", "about")
                }}
              >
                About
              </Link>
              <Link
                href="/#services"
                className={getLinkClass("services")}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("#services", "services")
                }}
              >
                Services
              </Link>
              <Link
                href="/#team"
                className={getLinkClass("team")}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("#team", "team")
                }}
              >
                Team
              </Link>
              <Link href="/blog" className={getLinkClass("blog")}>
                Blog
              </Link>
              <Link
                href="/#contact"
                className={getLinkClass("contact")}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("#contact", "contact")
                }}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
