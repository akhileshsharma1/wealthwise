import { CheckCircle, Users, Award, TrendingUp } from "lucide-react"

export default function About() {
  const stats = [
    { icon: Users, label: "Team Members", value: "9+" },
    { icon: Award, label: "Years Experience", value: "8+" },
    { icon: TrendingUp, label: "Clients Served", value: "50+" },
    { icon: CheckCircle, label: "Success Rate", value: "100%" },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">About Wealthwise</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Wealthwise is a trusted financial advisory and consulting firm specializing in tax, accounting,
                compliance, and business support services.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
               At Wealthwise Consulting Pvt. Ltd., we offer a full spectrum of financial, compliance, and business advisory services designed to empower individuals and businesses alike. From tax planning, accounting, and payroll management to business registration, valuation, and regulatory compliance, we deliver tailored solutions that simplify operations and drive growth.

We also specialize in mortgage facilitation services for clients in Australia, supporting licensed mortgage brokers with end-to-end loan processing—from document preparation using ApplyOnline to CRM coordination via Mercury Nexus. Though not licensed brokers ourselves, we manage the entire backend process to ensure timely, compliant, and seamless home loan submissions.

With Wealthwise, you gain a reliable and experienced partner committed to excellence, precision, and long-term success across both domestic and international operations.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Our Expertise</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-sky-600" />
                  <span className="text-gray-700">Chartered Accountants: 2</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-sky-600" />
                  <span className="text-gray-700">Semi-qualified CAs: 3</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-sky-600" />
                  <span className="text-gray-700">MBA (Marketing & Finance): 1</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-sky-600" />
                  <span className="text-gray-700">MBS (Finance & Accounts): 1</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-sky-600" />
                  <span className="text-gray-700">Support Staff: 3</span>
                </div>
              </div>
            </div>
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
              <p className="leading-relaxed">
               At Wealthwise, our mission is to deliver reliable, accurate, and client-focused financial and advisory solutions that exceed expectations. We are committed to ensuring complete client satisfaction by providing personalized services, timely support, and expert guidance across every area of our work—whether it’s tax, accounting, compliance, business setup, or mortgage facilitation. Your success is our purpose.
              At Wealthwise, our mission is to deliver reliable, accurate, and client-focused financial and advisory solutions that exceed expectations. We are committed to ensuring complete client satisfaction by providing personalized services, timely support, and expert guidance across every area of our work—whether it’s tax, accounting, compliance, business setup, or mortgage facilitation. Your success is our purpose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
