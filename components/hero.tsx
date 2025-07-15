"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="pt-20 bg-gradient-to-br from-sky-50 to-blue-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Expert Financial
                <span className="text-sky-600 block">Advisory Services</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Wealthwise is a trusted financial advisory and consulting firm specializing in tax, accounting,
                compliance, and business support services in Nepal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-sky-600 hover:bg-sky-700"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-sky-600" />
                <span className="text-gray-700">+977 9843066123</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-sky-600" />
                <span className="text-gray-700">info.wealthwise31@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-sky-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                    W
                  </div>
                  <span className="text-sm text-gray-500">Professional Services</span>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-sky-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-600 rounded-full w-4/5"></div>
                  </div>
                  <div className="h-4 bg-sky-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-600 rounded-full w-3/5"></div>
                  </div>
                  <div className="h-4 bg-sky-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-600 rounded-full w-5/6"></div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Trusted by businesses across Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
