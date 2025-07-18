import { notFound } from "next/navigation"
import { getTeamMemberBySlug } from "@/lib/team-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Phone, Linkedin, GraduationCap, Briefcase, Clock } from "lucide-react"
import Link from "next/link"

interface TeamMemberPageProps {
  params: Promise<{ slug: string }>
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params
  const member = getTeamMemberBySlug(slug)

  if (!member) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-8">
          <Link href="/#team">
            <Button 
              variant="ghost" 
              className="mb-0 hover:bg-sky-50 transition-all duration-200 hover:scale-[1.02] group"
            >
              <ArrowLeft className="h-4 w-4 mr-3 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Team
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 xl:gap-16">
            {/* Profile Card */}
            <div className="lg:col-span-4">
              <Card className="sticky top-8 shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
                <div className="relative">
                  <div className="aspect-[4/5] relative bg-gradient-to-br from-sky-100 to-blue-100">
                    <img
                      src={member.image || "/placeholder.svg?height=600&width=480"}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      style={{ objectPosition: "center 20%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>

                  {/* Contact Actions */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-white/95 hover:bg-white text-sky-600 border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/95 hover:bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{member.name}</h1>
                    <Badge variant="secondary" className="bg-sky-100 text-sky-700 hover:bg-sky-200 mb-4 px-4 py-2 text-sm font-medium">
                      {member.position}
                    </Badge>
                    <p className="text-gray-600 font-medium text-lg">{member.qualification}</p>
                  </div>

                  <Separator className="my-8" />

                  {/* Quick Stats */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">Experience</p>
                        <p className="text-gray-600 leading-relaxed">{member.experience}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">Email</p>
                        <p className="text-gray-600 leading-relaxed break-all">{member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">Phone</p>
                        <p className="text-gray-600 leading-relaxed">{member.phone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* About Section */}
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                      About {member.name.split(" ").slice(-2).join(" ")}
                    </h2>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    {member.fullDescription.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-6 last:mb-0 text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education Section */}
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">Education & Qualifications</h2>
                  </div>

                  <div className="space-y-5">
                    {member.education.map((edu, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-5 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                      >
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                        <p className="text-gray-800 font-medium text-lg leading-relaxed">{edu}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Expertise Highlights */}
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">Key Expertise</h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    {getExpertiseAreas(member.position).map((area, index) => (
                      <div key={index} className="flex items-center gap-4 p-5 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                        <div className="w-3 h-3 bg-sky-500 rounded-full shadow-sm flex-shrink-0"></div>
                        <span className="text-gray-800 font-medium text-lg">{area}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getExpertiseAreas(position: string): string[] {
  const expertiseMap: Record<string, string[]> = {
    Chairman: [
      "Financial Advisory",
      "Strategic Planning",
      "Audit Management",
      "Regulatory Compliance",
      "Business Consulting",
      "Cross-border Operations",
    ],
    "Managing Director": [
      "Financial Management",
      "Business Consulting",
      "Investment Planning",
      "Accounting Solutions",
      "Strategic Analysis",
      "Operational Excellence",
    ],
    "Consultant & Founding Shareholder": [
      "Business Valuation",
      "Statutory Audits",
      "Corporate Finance",
      "Strategic Consulting",
      "Entrepreneurship",
      "Financial Reporting",
    ],
    "Senior Accountant": [
      "Complex Accounting",
      "Financial Analysis",
      "Business Advisory",
      "Investment Consulting",
      "Taxation",
      "Online Consulting",
    ],
    "Finance Associate": [
      "Financial Reporting",
      "Internal Controls",
      "Audit Support",
      "Accounting Operations",
      "Compliance Management",
      "Financial Analysis",
    ],
    "Client Relationship Manager": [
      "Client Relations",
      "Service Coordination",
      "Mortgage Processing",
      "Communication",
      "Account Management",
      "Financial Solutions",
    ],
  }

  return (
    expertiseMap[position] || ["Financial Services", "Business Consulting", "Client Advisory", "Professional Services"]
  )
}

export async function generateStaticParams() {
  const { teamMembers } = await import("@/lib/team-data")
  return teamMembers.map((member) => ({
    slug: member.slug,
  }))
}