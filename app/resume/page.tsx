"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ContactModal } from "@/components/contact-modal"
import { TechStack } from "@/components/tech-stack"
import { CareerTimeline, type Job } from "@/components/career-timeline"
import { Magnetic } from "@/components/magnetic"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollProgress } from "@/components/scroll-progress"
import { GridBackdrop } from "@/components/grid-backdrop"
import { FadeIn, LineReveal } from "@/components/animations/reveal-animations"

const GITHUB_URL = "https://github.com/abdulmalikadebayo"
const LINKEDIN_URL = "https://www.linkedin.com/in/abdul-malik-adebayo-294161174/"
const EMAIL = "abdulmalikadebayo1@gmail.com"

// Swap this file in public/ to refresh the downloadable CV. Keep the same filename so the link stays valid.
const CV_PDF = "/Adebayo_Abdul-Malik.pdf"
const CV_FILENAME = "Adebayo_Abdul-Malik_CV.pdf"

const experience: Job[] = [
  {
    company: "Supernomics",
    logo: "/supernomics-logo.svg",
    logoType: "wordmark",
    location: "San Francisco, US · Remote",
    employment: "Contract",
    period: "Jan 2026 – Present",
    roles: [
      {
        title: "Senior AI Engineer (LLM & Applied ML)",
        period: "Jan 2026 – Present",
        bullets: [
          "Built an LLM safety pipeline on Anthropic's Claude API with custom prompt-injection detection and content filtering, reducing harmful outputs at low latency.",
          "Modernised Electron.js desktop infrastructure for AI features: refactoring, activity tracking for ML training data, and standards for embedding LLM capabilities.",
        ],
      },
    ],
    tags: ["Claude API", "LLM Safety", "Electron.js"],
  },
  {
    company: "Axiomfuse",
    logo: "/axiomfuse-logo.png",
    location: "London, UK · Remote",
    employment: "Full-time",
    period: "Nov 2025 – Present",
    roles: [
      {
        title: "Software Engineer (AI & Backend)",
        period: "Nov 2025 – Present",
        bullets: [
          "Core of a two-person backend and blockchain team building DeFi wallet infrastructure (Aave, Morpho, Kamino, Jito) with real-time WebSocket position tracking across Ethereum and Solana, serving 5,000+ users.",
          "Delivered backend and AI for a UK NHS healthcare-staffing platform: intelligent job matching, a real-time staffing insights dashboard and scheduling, connecting 1,400+ medical professionals to 4,900+ filled jobs.",
          "Built an adaptive personality assessment platform using GPT-4o with confidence-based trait scoring across 35 attributes and intelligent, gap-driven question selection.",
        ],
      },
    ],
    tags: ["Solana", "Ethereum", "GPT-4o", "WebSockets"],
  },
  {
    company: "BRDGE",
    logo: "/brdge-logo.png",
    location: "London, UK · Remote",
    employment: "Full-time",
    period: "Jun 2024 – Nov 2025",
    roles: [
      {
        title: "AI Development Analyst",
        period: "Feb 2025 – Nov 2025",
        bullets: [
          "Led an end-to-end Arabic-English legal chatbot using Llama 3 and Legal GPT via AWS Bedrock, handling 200+ queries a day for a Saudi client with strict data-sovereignty needs.",
          "Delivered custom AI implementations for clients across Europe (Ireland, UK), Asia (China, Malaysia) and Africa (Nigeria).",
          "Aligned deployments with client and stakeholder goals around compliance, governance and real-time decision intelligence.",
        ],
      },
      {
        title: "AI Researcher & Engineer",
        period: "Jun 2024 – Feb 2025",
        bullets: [
          "Built the complete backend and API layer for Apprentago, an apprenticeship platform with 22,000+ users and 10,000+ job listings, through to live deployment.",
          "Developed LLM assistants using RAG pipelines and fine-tuned models, containerised with Docker for scalable deployment.",
          "Deployed on AWS and GCP with CI/CD via GitHub Actions, maintaining security and NDA compliance across confidential client projects.",
        ],
      },
    ],
    tags: ["Llama 3", "AWS Bedrock", "RAG", "Django"],
  },
  {
    company: "Synergy Solutions",
    location: "Remote",
    period: "Sep 2023 – Oct 2023",
    roles: [
      {
        title: "Data Scientist",
        period: "Sep 2023 – Oct 2023",
        bullets: [
          "Led technical initiatives at a growing marketing agency, introducing AI-powered tools to support campaign creation, automate routine tasks and boost client engagement.",
          "Developed custom internal systems for AI-generated captions, ad copy and campaign briefs, helping non-technical staff create content faster.",
          "Worked closely with non-technical staff to make AI accessible and practical, reducing content turnaround time and scaling output without adding headcount.",
        ],
      },
    ],
    tags: ["Python", "NLP"],
  },
  {
    company: "KPMG",
    logo: "/kpmg-logo.svg",
    logoType: "wordmark",
    location: "Remote",
    period: "Sep 2020 – Oct 2020",
    roles: [
      {
        title: "Data Analyst Intern",
        period: "Sep 2020 – Oct 2020",
        bullets: [
          "Completed the Data Quality Assessment, Data Insights and Presentation tasks as part of the KPMG virtual internship.",
        ],
      },
    ],
    tags: [],
  },
]

export default function ResumePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const openContact = () => setIsContactModalOpen(true)

  return (
    <div className="home-redesign font-body relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <CustomCursor />
      <ScrollProgress />

      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <GridBackdrop />
      </div>

      <div className="relative z-10">
        <Navigation />

        <main className="pt-20">
          {/* 1. HERO */}
          <section className="relative px-6 py-28 md:py-36">
            <div className="mx-auto max-w-4xl space-y-8">
              <p className="flex items-center gap-3 font-code text-sm font-bold uppercase tracking-widest text-accent-teal">
                <span className="h-px w-8 bg-accent-teal" /> Resume
              </p>
              <LineReveal>
                <h1 className="font-display text-6xl font-extrabold leading-[1.02] md:text-8xl">
                  The full <span className="text-primary italic">career history.</span>
                </h1>
              </LineReveal>
              <p className="text-lg font-medium text-slate-300">Senior AI &amp; Backend Engineer · Lagos, Nigeria</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Magnetic>
                  <a
                    href={CV_PDF}
                    download={CV_FILENAME}
                    className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={CV_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold transition-colors hover:border-white/60"
                  >
                    Open in new tab <ExternalLink className="h-4 w-4" />
                  </a>
                </Magnetic>
              </div>
              <FadeIn className="pt-10">
                <span className="font-code text-[10px] uppercase tracking-[0.3em] text-slate-500">
                  Scroll to explore
                </span>
              </FadeIn>
            </div>
          </section>

          {/* 2. EXPERIENCE */}
          <section className="relative px-6 py-24">
            <div className="mx-auto max-w-5xl">
              <p className="mb-4 font-code text-sm font-bold uppercase tracking-widest text-accent-teal">Experience</p>
              <LineReveal>
                <h2 className="mb-14 font-display text-4xl font-bold md:text-6xl">Roles &amp; impact.</h2>
              </LineReveal>
              <CareerTimeline experience={experience} />
            </div>
          </section>

          {/* 3. SKILLS */}
          <section className="relative px-6 py-24">
            <div className="mx-auto max-w-5xl">
              <p className="mb-4 font-code text-sm font-bold uppercase tracking-widest text-accent-teal">Skills</p>
              <LineReveal>
                <h2 className="mb-14 font-display text-4xl font-bold md:text-6xl">Tools I work with.</h2>
              </LineReveal>
              <TechStack variant="dark" />
              <FadeIn>
                <p className="mt-12 text-sm text-slate-400">
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
        </main>

        {/* 4. FOOTER */}
        <footer className="border-t border-white/10 px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_1fr_1fr]">
            <div>
              <p className="font-display text-2xl font-extrabold">Adebayo Abdul-Malik</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                Senior AI &amp; Backend Engineer building production LLM systems, backends and cloud infrastructure.
              </p>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Explore</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/" className="hover:text-primary">Home</Link></li>
                <li><Link href="/about" className="hover:text-primary">About</Link></li>
                <li><Link href="/resume" className="hover:text-primary">Resume</Link></li>
                <li><Link href="/portfolio" className="hover:text-primary">Portfolio</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Connect</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-primary">
                    <Mail className="h-4 w-4" /> Email
                  </a>
                </li>
                <li>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
            <span>© {new Date().getFullYear()} Adebayo Abdul-Malik.</span>
            <span>Lagos, Nigeria</span>
          </div>
        </footer>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
