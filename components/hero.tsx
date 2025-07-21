"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-20 bg-gradient-to-br from-sky-50 to-blue-100 min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Hero Text */}
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

          {/* RIGHT: Chairman's Statement with Tilt Effect */}
          <motion.div
            whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 max-w-xl mx-auto"
            style={{ perspective: 1000 }}
          >
            {/* Header */}
            <div className="flex items-center gap-6">
              <div className="w-28 h-32 overflow-hidden rounded-xl shadow-md border-2 border-sky-600">
                <img
                  src="/images/kinjal.jpg"
                  alt="Chairman Kinjal Puri"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-slate-800">Chairman's Statement</h3>
                <div className="h-1 w-16 bg-sky-600 mt-2 rounded-full" />
              </div>
            </div>

            {/* Statement */}
            <blockquote className="relative text-gray-700 text-base leading-relaxed pl-6 border-l-4 border-sky-500">
              “At WealthWise, sustainable financial growth is not just a destination—it’s a journey. Through insightful
              planning and unwavering commitment, we strive to shape a financially empowered Nepal.”
            </blockquote>

            {/* Signature & Name */}
            <div className="text-right mt-6">
              <h4 className="text-xl font-semibold text-slate-800">Kinjal Puri</h4>
              <p className="text-slate-500 text-sm">Chairman, WealthWise</p>
            </div>

            {/* Logo / Tag */}
            <div className="flex justify-end pt-2">
              <span className="text-sky-600 font-semibold tracking-wider text-sm">WEALTHWISE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
