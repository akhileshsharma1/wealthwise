import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"

export default function Team() {
  const teamMembers = [
    {
      name: "Mr. Kinjal Puri",
      position: "Chairman",
      qualification: "CA, MBA",
      image: "/images/kinjal.jpg",
      description: "Leading the firm with extensive experience in financial advisory and strategic planning.",
    },
    {
      name: "Mr. Bibek Parajuli",
      position: "Managing Director",
      qualification: "Chartered Accountant",
      image: "/images/bibek.jpg",
      description: "Expert in taxation, compliance, and financial reporting with 8+ years of experience.",
    },
    {
      name: "Mr. Ramesh Shrestha",
      position: "Consultant & Founding Shareholder",
      qualification: "Chartered Accountant",
      image: "/images/ramesh.jpg",
      description: "Specializes in business valuation, audit, and corporate finance solutions.",
    },
    {
      name: "Mr. Mausam Agrawal",
      position: "Consultant & Founding Shareholder",
      qualification: "MBA Finance",
      image: "/images/mausam.jpg",
      description: "Oversees operations and client relationships with focus on business development.",
    },
    {
      name: "Mr. Bishal Dangol",
      position: "Senior Accountant",
      qualification: "MBA Finance",
      image: "/images/bishal.jpg",
      description: "Oversees operations and client relationships with focus on business development.",
    },
    {
      name: "Mr. Nabraj Baral",
      position: "Finance Associate",
      qualification: "MBA Finance",
      image: "/images/nabraj.jpg",
      description: "Oversees operations and client relationships with focus on business development.",
    },   
    {
      name: "Mr. Mohit Kharel",
      position: "Client Relationship Manager",
      qualification: "MBA Finance",
      image: "/images/mohit.jpg",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-white"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-blue-50">
                <div className="aspect-[4/5] relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    style={{
                      objectPosition: 'center 20%'
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Social icons overlay */}
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
                <p className="text-sm text-gray-500 mb-3">{member.qualification}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 border border-sky-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Team?</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Chartered Accountants</h4>
                <p className="text-gray-600 text-sm">Fully qualified CAs with extensive experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  5
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Advanced Degrees</h4>
                <p className="text-gray-600 text-sm">MBA and MBS qualified professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  7
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