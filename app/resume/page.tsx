"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { IntroLoader } from "@/components/intro-loader"
import { ContactModal } from "@/components/contact-modal"
import { TechStack } from "@/components/tech-stack"
import { CareerTimeline } from "@/components/career-timeline"
import { FadeIn, LineReveal } from "@/components/animations/reveal-animations"
import { profile, experience } from "@/lib/data"

const GITHUB_URL = profile.github
const LINKEDIN_URL = profile.linkedin
const EMAIL = profile.email

// Swap this file in public/ to refresh the downloadable CV. Keep the same filename so the link stays valid.
const CV_PDF = "/Adebayo_Abdul-Malik.pdf"
const CV_FILENAME = "Adebayo_Abdul-Malik_CV.pdf"

export default function ResumePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const openContact = () => setIsContactModalOpen(true)

  return (
    <div className="home-redesign font-body">
      <IntroLoader brief />
      <Navigation />

      <main className="pt-16">
        {/* 1. HERO (dark) */}
        <section className="relative overflow-hidden bg-[#081a3d] text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-16 lg:py-20">
            <div className="space-y-5 md:space-y-7">
              <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-accent-teal">
                <span className="h-px w-8 bg-accent-teal" /> Resume
              </p>
              <LineReveal>
                <h1 className="font-display text-[clamp(2.25rem,7vw,3.75rem)] font-extrabold leading-[1.08]">
                  The full <br />
                  <span className="text-accent-teal italic">career history.</span>
                </h1>
              </LineReveal>
              <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                Every role, in full: the AI and backend systems I've shipped across San Francisco, London and the Gulf,
                from research through to reliable production.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={CV_PDF}
                    download={CV_FILENAME}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary sm:w-auto px-7 py-3.5 font-semibold text-primary-foreground transition-colors duration-150 hover:brightness-110"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                  <a
                    href={CV_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 sm:w-auto px-7 py-3.5 font-semibold transition-colors hover:border-white/60"
                  >
                    Open in new tab <ExternalLink className="h-4 w-4" />
                  </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. EXPERIENCE (light) */}
        <section id="experience" className="scroll-mt-20 bg-slate-50 py-12 px-5 sm:px-6 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Experience</p>
              <h2 className="mb-8 md:mb-12 font-display text-3xl font-bold sm:text-4xl text-slate-900 md:text-5xl">Roles &amp; impact.</h2>
            </FadeIn>
            <CareerTimeline experience={experience} variant="light" />
          </div>
        </section>

        {/* 3. SKILLS (light) */}
        <section className="bg-white py-12 px-5 sm:px-6 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Skills</p>
              <h2 className="mb-8 md:mb-12 font-display text-3xl font-bold sm:text-4xl text-slate-900 md:text-5xl">Tools I work with.</h2>
            </FadeIn>
            <TechStack />
            <FadeIn>
              <p className="mt-12 text-sm text-slate-600">
                Education, talks and community work live on the{" "}
                <Link href="/about" className="font-semibold text-primary hover:underline">
                  About page
                </Link>
                . Prefer a conversation?{" "}
                <button onClick={openContact} className="font-semibold text-primary hover:underline">
                  Get in touch
                </button>
                .
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 4. CONTACT CTA (dark) */}
        <section className="relative overflow-hidden bg-[#081a3d] py-12 px-5 sm:px-6 sm:py-16 lg:py-24 text-center text-white">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative mx-auto max-w-3xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-accent-teal">Let's talk</p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl leading-tight md:text-6xl">
                Let's build something <span className="text-accent-teal">ambitious.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
                Whether it's an AI system, a backend platform or a research collaboration, let's start a conversation.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                  onClick={openContact}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary sm:w-auto px-8 py-3.5 font-semibold text-primary-foreground transition-colors duration-150 hover:brightness-110"
                >
                  Get in touch <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 sm:w-auto px-8 py-3.5 font-semibold transition-colors hover:border-white/60"
                >
                  <Linkedin className="h-4 w-4" /> Connect on LinkedIn
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* 5. FOOTER (dark) */}
      <footer className="bg-[#081a3d] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold">Adebayo Abdul-Malik</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              AI &amp; Backend Engineer building production LLM systems, backends and cloud infrastructure.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Explore</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-accent-teal">Home</Link></li>
              <li><Link href="/about" className="inline-flex min-h-11 items-center hover:text-accent-teal">About</Link></li>
              <li><Link href="/resume" className="inline-flex min-h-11 items-center hover:text-accent-teal">Resume</Link></li>
              <li><Link href="/portfolio" className="inline-flex min-h-11 items-center hover:text-accent-teal">Portfolio</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Connect</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center gap-2 hover:text-accent-teal">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-accent-teal">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-accent-teal">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row">
          <span>© {new Date().getFullYear()} Adebayo Abdul-Malik.</span>
          <span>Lagos, Nigeria</span>
        </div>
      </footer>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
