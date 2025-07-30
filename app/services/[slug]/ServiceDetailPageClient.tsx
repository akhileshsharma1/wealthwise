"use client"

import { getBannerUrl } from "@/lib/service-banner"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { services } from "@/lib/services-data"
import { slugify } from "@/lib/utils"
import { notFound } from "next/navigation"

export default function ServiceDetailPageClient({ params }: { params: { slug: string } }) {
  const service = services.find((s) => slugify(s.title) === params.slug)

  if (!service) {
    notFound()
  }

  const ServiceIcon = service.icon

  return (
    <>
      {/* Back Button - Positioned Below Fixed Header */}
      <div className="container mx-auto px-4 pt-20 md:pt-24 pb-4">
        <Link href="/#services">
          <div className="inline-block rounded-xl bg-gradient-to-r from-sky-50 to-blue-100 shadow hover:shadow-md transition-all duration-300">
            <span className="inline-flex items-center text-sky-700 hover:text-sky-900 hover:scale-[1.03] px-4 py-2 transition-all duration-300 group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Services
            </span>
          </div>
        </Link>
      </div>

      {/* Service Banner */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-sky-100 to-blue-100">
            <img
              src={getBannerUrl(params.slug) || "/placeholder.svg"}
              alt={`${service.title} banner`}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                const fallbackUrl = `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(service.title + " professional service banner")}`

                // Only change src if it's not already the fallback to prevent infinite loop
                if (target.src !== fallbackUrl) {
                  console.log(`Failed to load banner for ${service.title}, using fallback`)
                  target.src = fallbackUrl
                }
              }}
              onLoad={(e) => {
                const target = e.target as HTMLImageElement
                target.style.opacity = "1"
              }}
              loading="lazy"
              style={{ opacity: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                <ServiceIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">{service.title}</h1>
              <p className="text-lg text-white/90 max-w-2xl drop-shadow-md">{service.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardContent className="px-6 md:px-8 pb-8">
              <div className="text-gray-700 leading-relaxed mb-8">
                {service.fullDescription ? (
                  <>
                    {service.fullDescription.split("\n\n").map((section, idx) => {
                      // Check if this section contains bullet points
                      if (section.includes("• ")) {
                        const lines = section.split("\n")
                        const heading = lines[0] // First line before bullets
                        const bulletItems = lines.slice(1).filter((line) => line.startsWith("• "))

                        return (
                          <div key={idx} className="mb-8">
                            {heading && <p className="mb-4 font-medium">{heading}</p>}
                            <ul className="space-y-3 ml-4">
                              {bulletItems.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-sky-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="leading-relaxed">{item.substring(2)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      } else {
                        // Regular paragraphs
                        return (
                          <p key={idx} className="mb-6 leading-relaxed">
                            {section}
                          </p>
                        )
                      }
                    })}
                  </>
                ) : (
                  <p className="leading-relaxed">{service.description}</p>
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
