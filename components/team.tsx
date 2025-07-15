import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export default function Team() {
  const teamMembers = [
    {
      name: "Kinjal Puri",
      position: "Chairman",
      qualification: "CA, MBA",
      image: "/placeholder.svg?height=300&width=300",
      description: "Leading the firm with extensive experience in financial advisory and strategic planning.",
    },
    {
      name: "CA Muskan Agrawal",
      position: "Senior Advisor",
      qualification: "Chartered Accountant",
      image: "/placeholder.svg?height=300&width=300",
      description: "Expert in taxation, compliance, and financial reporting with 8+ years of experience.",
    },
    {
      name: "CA Manish Shrestha",
      position: "Senior Advisor",
      qualification: "Chartered Accountant",
      image: "/placeholder.svg?height=300&width=300",
      description: "Specializes in business valuation, audit, and corporate finance solutions.",
    },
    {
      name: "Jiban Prajuli",
      position: "Director",
      qualification: "MBA Finance",
      image: "/placeholder.svg?height=300&width=300",
      description: "Oversees operations and client relationships with focus on business development.",
    },
  ]

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sky-600 font-medium mb-1">{member.position}</p>
                <p className="text-sm text-gray-500 mb-3">{member.qualification}</p>
                <p className="text-sm text-gray-600 mb-4">{member.description}</p>
                <div className="flex gap-3">
                  <button className="p-2 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors">
                    <Linkedin className="h-4 w-4 text-sky-600" />
                  </button>
                  <button className="p-2 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors">
                    <Mail className="h-4 w-4 text-sky-600" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-sky-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Team?</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Chartered Accountants</h4>
                <p className="text-gray-600 text-sm">Fully qualified CAs with extensive experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Advanced Degrees</h4>
                <p className="text-gray-600 text-sm">MBA and MBS qualified professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  9+
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Total Team Members</h4>
                <p className="text-gray-600 text-sm">Dedicated support staff and professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
