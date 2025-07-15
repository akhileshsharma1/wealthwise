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
  ]

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-sky-600" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription className="text-sm">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-sky-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
