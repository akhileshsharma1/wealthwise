import { getAllTeamMembers } from "@/lib/team-actions"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default async function Team() {
  const teamMembers = await getAllTeamMembers()

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team at Wealthwise is composed of seasoned professionals with deep expertise in finance, tax, and
            compliance.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Link href={`/team/${member.slug}`} key={member.id}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-white cursor-pointer">
                <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-blue-50">
                  <div className="aspect-[4/5] relative">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      style={{ objectPosition: "center 20%" }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors">
                      <Linkedin className="h-4 w-4 text-sky-600" />
                    </button>
                    <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors">
                      <Mail className="h-4 w-4 text-sky-600" />
                    </button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 leading-tight">{member.name}</h3>
                  <p className="text-sky-600 font-medium mb-1">{member.position}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 border border-sky-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Team?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[
                { count: "3", label: "Full-time CAs", desc: "Fully qualified Chartered Accountants" },
                { count: "2", label: "Part-time CAs", desc: "Experienced practicing Chartered Accountants" },
                { count: "2", label: "Semi-qualified CAs", desc: "CA articleship completed professionals" },
                { count: "2", label: "MBA Professionals", desc: "Advanced business management degrees" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                    {item.count}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.label}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
