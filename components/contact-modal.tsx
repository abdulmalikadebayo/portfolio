"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, CheckCircle, AlertCircle, User, MessageSquare } from "lucide-react"
import { FadeIn } from "@/components/animations/reveal-animations"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const subject = encodeURIComponent(formData.subject || "Portfolio Contact")
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )
      const mailtoLink = `mailto:abdulmalikadebayo1@gmail.com?subject=${subject}&body=${body}`

      window.location.href = mailtoLink

      setSubmitStatus("success")

      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setSubmitStatus("idle")
        onClose()
      }, 2000)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const quickTemplates = [
    {
      label: "Collaboration",
      subject: "Collaboration Opportunity",
      message:
        "Hi Adebayo,\n\nI'm interested in discussing a potential collaboration opportunity. I'd love to learn more about your work and explore how we might work together.\n\nBest regards,",
    },
    {
      label: "Job Opportunity",
      subject: "Job Opportunity",
      message:
        "Hi Adebayo,\n\nI came across your portfolio and I'm impressed by your work in AI research and backend development. We have an exciting opportunity that might interest you.\n\nBest regards,",
    },
    {
      label: "General Inquiry",
      subject: "General Inquiry",
      message: "Hi Adebayo,\n\nI have a question about your work and would love to connect.\n\nBest regards,",
    },
  ]

  const handleTemplateSelect = (template: (typeof quickTemplates)[0]) => {
    setFormData((prev) => ({
      ...prev,
      subject: template.subject,
      message: template.message,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-serif text-primary flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Get In Touch
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <FadeIn>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Contact Information</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>📧 abdulmalikadebayo1@gmail.com</p>
                <p>📱 +2348036561316</p>
                <p>📍 Lagos, Nigeria</p>
                <p>🌐 Available for remote work</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-3">
              <h3 className="font-semibold">Quick Templates</h3>
              <div className="flex flex-wrap gap-2">
                {quickTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTemplateSelect(template)}
                    className="text-xs !cursor-pointer"
                  >
                    {template.label}
                  </Button>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project, opportunity, or question..."
                  rows={6}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span>Message sent successfully! Your email client should open shortly.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span>Something went wrong. Please try again or contact me directly.</span>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1 !cursor-pointer" size="lg">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={onClose} size="lg" className="!cursor-pointer">
                  Cancel
                </Button>
              </div>
            </form>
          </FadeIn>

          {/* <FadeIn delay={0.3}> */}
            <div className="text-center text-sm text-muted-foreground border-t space-y-2 pt-4">
              <p>I typically respond within 24 hours.</p>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="secondary">AI Research</Badge>
                <Badge variant="secondary">Backend Development</Badge>
                <Badge variant="secondary">Collaborations</Badge>
              </div>
            </div>
          {/* </FadeIn> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
