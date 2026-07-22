"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ContactModal } from "@/components/contact-modal"
import { TechStack } from "@/components/tech-stack"
import { CareerTimeline, type Job } from "@/components/career-timeline"
import { Magnetic } from "@/components/magnetic"
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
    tags: ["Claude API", "LLM Safety", "Prompt Injection", "Content Filtering", "Electron.js", "Python"],
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
    tags: [
      "Django",
      "PostgreSQL",
      "Ethereum",
      "Solana",
      "WebSockets",
      "Celery",
      "Redis",
      "GPT-4o",
      "React",
      "AWS",
      "Docker",
      "GitHub Actions",
    ],
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
    tags: [
      "Django",
      "RAG",
      "Llama 3",
      "AWS Bedrock",
      "LlamaIndex",
      "FAISS",
      "OpenAI",
      "Whisper",
      "React",
      "PostgreSQL",
      "GCP",
      "Docker",
      "GitHub Actions",
    ],
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
    <div className="home-redesign font-body">
      <Navigation />

      <main className="pt-20">
        {/* 1. HERO (dark) */}
        <section className="relative overflow-hidden bg-[#081a3d] text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative mx-auto max-w-3xl px-6 py-24">
            <div className="space-y-8">
              <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-accent-teal">
                <span className="h-px w-8 bg-accent-teal" /> Resume
              </p>
              <LineReveal>
                <h1 className="font-display text-5xl font-extrabold leading-[1.05] md:text-6xl">
                  The full <br />
                  <span className="text-primary italic">career history.</span>
                </h1>
              </LineReveal>
              <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                Every role, in full: the AI and backend systems I've shipped across San Francisco, London and the Gulf,
                from research through to reliable production.
              </p>
              <div className="flex flex-wrap gap-4">
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
            </div>
          </div>
        </section>

        {/* 2. EXPERIENCE (light) */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Experience</p>
              <h2 className="mb-14 font-display text-4xl font-bold text-slate-900 md:text-5xl">Roles &amp; impact.</h2>
            </FadeIn>
            <CareerTimeline experience={experience} variant="light" />
          </div>
        </section>

        {/* 3. SKILLS (light) */}
        <section className="bg-white py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Skills</p>
              <h2 className="mb-14 font-display text-4xl font-bold text-slate-900 md:text-5xl">Tools I work with.</h2>
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
        <section className="relative overflow-hidden bg-[#081a3d] py-28 px-6 text-center text-white">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative mx-auto max-w-3xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-accent-teal">Let's talk</p>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
                Let's build something <span className="text-primary">ambitious.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
                Whether it's an AI system, a backend platform or a research collaboration, let's start a conversation.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                  onClick={openContact}
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Get in touch <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 font-semibold transition-colors hover:border-white/60"
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

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
