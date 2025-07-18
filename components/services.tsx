"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, FileText, Users, Building, TrendingUp, Shield, Briefcase, Globe } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: Calculator,
      title: "Tax Planning & Compliance",
      description:
        "Corporate and personal tax planning, assistance in preparation and submission of tax returns, VAT/Excise and Customs services.",
      features: ["Corporate Tax Planning", "Personal Tax Returns", "VAT/Excise Services", "Tax Compliance"],
    },
    {
      icon: FileText,
      title: "Accounting Services",
      description:
        "Complete accounting solutions including bookkeeping, financial statements, and accounting outsourcing services.",
      features: ["Bookkeeping Services", "Financial Statements", "Accounting Outsourcing", "Monthly Reporting"],
    },
    {
      icon: Users,
      title: "Payroll Management",
      description:
        "Comprehensive payroll services including PAN facilitation, PF/CIT/SSF registration and monthly processing.",
      features: ["PAN Facilitation", "PF/CIT/SSF Registration", "Monthly Payroll", "Compliance Management"],
    },
    {
      icon: Building,
      title: "Business Registration",
      description:
        "Complete business setup services including company registration, FDI registration, and liaison office setup.",
      features: ["Company Registration", "FDI Registration", "Liaison Office Setup", "Joint Ventures"],
    },
    {
      icon: TrendingUp,
      title: "Business Valuation",
      description:
        "Professional business valuation services and financial restructuring solutions for growing businesses.",
      features: ["Business Valuation", "Financial Restructuring", "Due Diligence", "Investment Advisory"],
    },
    {
      icon: Shield,
      title: "Compliance Services",
      description: "Ensure your business stays compliant with all regulatory requirements and statutory obligations.",
      features: ["Regulatory Compliance", "Statutory Audits", "Internal Audits", "Risk Assessment"],
    },
    {
      icon: Briefcase,
      title: "Representation Services",
      description: "Acting as official representatives for foreign or local entities in various business matters.",
      features: ["Official Representation", "Government Liaison", "Legal Compliance", "Documentation"],
    },
    {
      icon: Globe,
      title: "Deregistration Services",
      description: "Professional assistance with company closure and formal deregistration processes.",
      features: ["Company Closure", "Asset Liquidation", "Final Compliance", "Documentation Support"],
    },
    {
      icon: Globe,
      title: "Mortgage Facilitation Services",
      description: "Wealthwise aids brokers with loan docs, ApplyOnline, and smooth end-to-end processing.",
      features: ["Loan Docs","ApplyOnline","CRM (Nexus)","Full Loan Support"]
    },
    
  ]

  const handleFlip = (element, isHovered) => {
    if (element) {
      element.style.transform = isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)';
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial and business services tailored to meet your specific needs and help you achieve
            sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div key={index} className="group h-64 sm:h-72 md:h-80" style={{ perspective: '1000px' }}>
              <div 
                className="relative w-full h-full transition-transform duration-700 ease-in-out cursor-pointer"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(0deg)'
                }}
                onMouseEnter={(e) => handleFlip(e.currentTarget, true)}
                onMouseLeave={(e) => handleFlip(e.currentTarget, false)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                  <Card className="h-full w-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <CardHeader className="pb-3 px-4 sm:px-6">
                      <div className="w-10 h-15 sm:w-12 sm:h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-3">
                        <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
                      </div>
                      <CardTitle className="text-base sm:text-lg leading-tight">{service.title}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm line-clamp-3">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6">
                      <ul className="space-y-1.5 sm:space-y-2">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-sky-600 rounded-full flex-shrink-0"></div>
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 w-full h-full" 
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <Card className="h-full w-full border-0 shadow-md bg-gradient-to-br from-sky-50 to-blue-50 flex flex-col justify-center items-center overflow-hidden">
                    <CardContent className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 md:p-8 flex flex-col justify-center h-full">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sky-100 rounded-full flex items-center justify-center mb-2">
                        <service.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-sky-600" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-tight">{service.title}</h3>
                      {/* <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                        Get expert assistance with {service.title.toLowerCase()} tailored to your business needs.
                      </p> */}
                      <div className="space-y-2 sm:space-y-3 w-full mt-auto">
                        <button 
                          className="w-full bg-sky-600 text-white py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-medium hover:bg-sky-700 transition-colors duration-200 transform hover:scale-105"
                          onClick={() => console.log(`Book Now clicked for ${service.title}`)}
                        >
                          Book Now
                        </button>
                        <button 
                          className="w-full border-2 border-sky-600 text-sky-600 py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-medium hover:bg-sky-600 hover:text-white transition-all duration-200 transform hover:scale-105"
                          onClick={() => console.log(`Read More clicked for ${service.title}`)}
                        >
                          Read More
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}