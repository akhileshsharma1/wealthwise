"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react"
import { submitContactForm } from "@/lib/contact-actions"

interface Props {
  phone: string
  email: string
  address: string
  hoursLines: string[]
}

export default function ContactClient({ phone, email, address, hoursLines }: Props) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    try {
      await submitContactForm(formData)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEmailConsultation = () => {
    const subject = encodeURIComponent("Consultation Request - WealthWise")
    const body = encodeURIComponent(`Hello,\n\nI would like to schedule a consultation.\n\nBest regards,`)
    window.open(`mailto:${email}?subject=${subject}&body=${body}`)
  }

  const handlePhoneConsultation = () => {
    window.open(`tel:${phone.replace(/\s/g, "")}`)
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to take your business to the next level? Contact us today for a consultation.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {submitStatus === "success" && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Thank you for your message! We will get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}
                {submitStatus === "error" && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>There was an error submitting your message. Please try again.</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" disabled={isSubmitting} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your.email@example.com" disabled={isSubmitting} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+977 98XXXXXXXX" disabled={isSubmitting} />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help you?" disabled={isSubmitting} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell us about your requirements..." disabled={isSubmitting} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-sky-600 hover:bg-sky-700" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-sky-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">{phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-sky-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-sky-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-sky-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">
                      {hoursLines.map((line, i) => (
                        <span key={i}>{line}{i < hoursLines.length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-sky-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
                <p className="mb-4 opacity-90">
                  Schedule a free consultation with our experts to discuss your financial needs.
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="w-full">Book Consultation</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-[200px]" align="center">
                    <DropdownMenuItem onClick={handleEmailConsultation} className="cursor-pointer">
                      <Mail className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">Email Consultation</span>
                        <span className="text-xs text-gray-500">Send us an email</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlePhoneConsultation} className="cursor-pointer">
                      <Phone className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">Phone Consultation</span>
                        <span className="text-xs text-gray-500">Call us directly</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
