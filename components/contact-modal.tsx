"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Send, CheckCircle, AlertCircle, User, MessageSquare, Phone, MapPin, Globe } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const EMAIL = "abdulmalikadebayo1@gmail.com"

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
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`

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

  const contactRows = [
    { icon: Mail, value: EMAIL },
    { icon: Phone, value: "+2348036561316" },
    { icon: MapPin, value: "Lagos, Nigeria" },
    { icon: Globe, value: "Available for remote work" },
  ]

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="home-redesign font-body max-h-[90vh] max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 sm:p-8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 font-display text-2xl font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </span>
            Get in touch
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact information */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Contact information</h3>
            <ul className="mt-3 space-y-2.5">
              {contactRows.map((row) => (
                <li key={row.value} className="flex items-center gap-3 text-sm text-slate-600">
                  <row.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span>{row.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick templates */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Quick templates</h3>
            <div className="flex flex-wrap gap-2">
              {quickTemplates.map((template) => {
                const active = formData.subject === template.subject
                return (
                  <button
                    key={template.label}
                    type="button"
                    onClick={() => handleTemplateSelect(template)}
                    className={
                      active
                        ? "rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors"
                        : "rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary"
                    }
                  >
                    {template.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <User className="h-3.5 w-3.5 text-primary" /> Name <span className="text-primary">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Mail className="h-3.5 w-3.5 text-primary" /> Email <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <MessageSquare className="h-3.5 w-3.5 text-primary" /> Subject <span className="text-primary">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                required
                disabled={isSubmitting}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                Message <span className="text-primary">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project, opportunity, or question..."
                rows={5}
                required
                disabled={isSubmitting}
                className={`${inputClass} resize-y`}
              />
            </div>

            {submitStatus === "success" && (
              <div className="flex items-center gap-2 rounded-xl bg-primary/10 p-3 text-sm text-primary">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <span>Message ready. Your email client should open shortly.</span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>Something went wrong. Please try again or email me directly.</span>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send message
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="space-y-3 border-t border-slate-200 pt-5 text-center">
            <p className="text-sm text-slate-500">I typically respond within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["AI & LLM Systems", "Backend Engineering", "Collaborations"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
