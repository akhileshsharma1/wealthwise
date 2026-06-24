import { getAllSettings } from "@/lib/site-actions"
import { CheckCircle, Users, Award, TrendingUp } from "lucide-react"

export default async function About() {
  const s = await getAllSettings()

  const stats = [
    { icon: Users,      label: "Team Members",    value: s.about_stat_team ?? "9+" },
    { icon: Award,      label: "Years Experience", value: s.about_stat_experience ?? "8+" },
    { icon: TrendingUp, label: "Clients Served",   value: s.about_stat_clients ?? "50+" },
    { icon: CheckCircle,label: "Success Rate",     value: s.about_stat_success ?? "100%" },
  ]

  const expertiseItems = (s.about_expertise ?? "")
    .split("|")
    .map((e) => e.trim())
    .filter(Boolean)

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">{s.about_heading ?? "About Wealthwise"}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{s.about_description1}</p>
              {s.about_description2 && (
                <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{s.about_description2}</p>
              )}
            </div>

            {expertiseItems.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Our Expertise</h3>
                <div className="grid grid-cols-1 gap-3">
                  {expertiseItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-sky-50 rounded-xl p-6 text-center">
                  <stat.icon className="h-8 w-8 text-sky-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="leading-relaxed whitespace-pre-line">{s.about_mission}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
