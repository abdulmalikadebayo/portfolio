"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  BrainCircuit,
  Server,
  Sparkles,
  Cloud,
  ExternalLink,
  Mic,
  GraduationCap,
  Building2,
  Award,
  Scale,
  Wallet,
  Stethoscope,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ContactModal } from "@/components/contact-modal"
import { ImageCarousel, type CarouselImage } from "@/components/image-carousel"
import { FadeIn, SlideInLeft, SlideInRight, StaggerIn } from "@/components/animations/reveal-animations"

const GITHUB_URL = "https://github.com/abdulmalikadebayo"
const LINKEDIN_URL = "https://www.linkedin.com/in/abdul-malik-adebayo-294161174/"
const EMAIL = "abdulmalikadebayo1@gmail.com"

const heroStats = [
  { value: "28K+", label: "Users reached" },
  { value: "5", label: "Regions worldwide" },
  { value: "3", label: "Global companies" },
]

const impact = [
  {
    value: "22,000+",
    label: "Apprentago users",
    note: "Backend architecture and APIs I built for a live apprenticeship platform (10,000+ job listings).",
  },
  {
    value: "5,000+",
    label: "DeFi wallet users",
    note: "Wallet infrastructure across Ethereum & Solana, built at Axiomfuse.",
  },
  {
    value: "4,900+",
    label: "NHS jobs filled",
    note: "AI job-matching for a UK healthcare-staffing platform serving NHS Trusts.",
  },
  { value: "3,000+", label: "Keynote audience", note: "Reached in a single talk at Google Dev Fest, Ibadan." },
]

const experience = [
  {
    company: "Supernomics",
    website: "https://www.supernomics.ai",
    logo: "/supernomics-logo.svg",
    logoType: "wordmark",
    employment: "Contract",
    location: "San Francisco, US · Remote",
    period: "Jan 2026 – Present",
    roles: [
      {
        title: "Senior AI Engineer (LLM & Applied ML)",
        period: "Jan 2026 – Present",
        summary:
          "Building LLM safety pipelines on Anthropic's Claude API and modernising desktop infrastructure for AI feature deployment.",
      },
    ],
    tags: ["Claude API", "LLM Safety", "Electron.js"],
  },
  {
    company: "Axiomfuse",
    website: "https://axiomfuse.com",
    logo: "/axiomfuse-logo.png",
    employment: "Full-time",
    location: "London, UK · Remote",
    period: "Nov 2025 – Present",
    roles: [
      {
        title: "Software Engineer (AI & Backend)",
        period: "Nov 2025 – Present",
        summary:
          "DeFi wallet infrastructure across Ethereum & Solana (5,000+ users), plus AI features for an NHS healthcare-staffing platform.",
      },
    ],
    tags: ["Solana", "Ethereum", "GPT-4o", "WebSockets"],
  },
  {
    company: "BRDGE",
    website: "https://www.brdge.ai",
    logo: "/brdge-logo.png",
    employment: "Full-time",
    location: "London, UK · Remote",
    period: "Jun 2024 – Nov 2025",
    roles: [
      {
        title: "AI Development Analyst",
        period: "Feb 2025 – Nov 2025",
        summary:
          "Shipped an Arabic–English legal chatbot on AWS Bedrock (Llama 3, 200+ queries/day) for a Saudi client, and delivered custom AI for clients across Europe, Asia and Africa.",
      },
      {
        title: "AI Researcher & Engineer",
        period: "Jun 2024 – Feb 2025",
        summary:
          "Built Apprentago's entire backend and API layer (22,000+ users, 10,000+ job listings) with RAG-powered AI assistants shipped on AWS & GCP.",
      },
    ],
    tags: ["Llama 3", "AWS Bedrock", "RAG", "Django"],
  },
]

const education = {
  school: "Bowen University",
  degree: "BSc Computer Science",
  location: "Osun State, Nigeria",
  period: "2020 – 2024",
  thesis: "Development of a Nigerian Sign Language Recognition System",
  award: "Student Icon 360",
  awardDesc: "Awarded to outstanding students excelling in academics, leadership, and Community Impact",
}

const services = [
  {
    no: "01",
    title: "AI Research & Development",
    icon: BrainCircuit,
    desc: "Building and evaluating ML, NLP and computer-vision systems with a focus on correctness and real-world use.",
    tags: ["NLP", "Computer Vision", "Fine-tuning"],
  },
  {
    no: "02",
    title: "Backend Engineering",
    icon: Server,
    desc: "Scalable, high-performance APIs and services that stay reliable under real production load.",
    tags: ["Django", "Node.js", "PostgreSQL"],
  },
  {
    no: "03",
    title: "LLM, RAG & Agentic Systems",
    icon: Sparkles,
    desc: "LLM assistants and agents using RAG, the Model Context Protocol and multi-model orchestration.",
    tags: ["RAG", "Agents", "MCP"],
  },
  {
    no: "04",
    title: "Cloud & DevOps",
    icon: Cloud,
    desc: "Containerised deployments and CI/CD pipelines on AWS and GCP, built for scale and repeatability.",
    tags: ["AWS", "GCP", "Docker"],
  },
]

type WorkItem = {
  clientLogo?: string // shown only where public / permitted
  icon?: LucideIcon // fallback mark for confidential clients
  title: string
  desc: string
  role: string
  employer: string
  employerLogo: string
  caseStudyUrl?: string // if the client is public (e.g. an employer case study), link it
}

const BRDGE_LOGO = "/brdge-logo.png"
const AXIOMFUSE_LOGO = "/axiomfuse-logo.png"
const SUPERNOMICS_LOGO = "/supernomics-mark.png" // square ring mark (the wordmark looks off at footer size)

const work: WorkItem[] = [
  {
    clientLogo: "/shyft-logo.png",
    icon: Stethoscope,
    title: "Shyft",
    desc: "Contributed to the backend and AI features of a cross-platform NHS healthcare-staffing ecosystem: intelligent job-matching, a real-time staffing insights dashboard and scheduling, connecting 1,492+ professionals to 4,990+ jobs.",
    role: "Backend & AI",
    employer: "Axiomfuse",
    employerLogo: AXIOMFUSE_LOGO,
    caseStudyUrl: "https://axiomfuse.com/case-studies/shyft-healthcare",
  },
  {
    clientLogo: "/apprentago-logo.png",
    title: "Apprentago",
    desc: "AI-powered apprenticeship platform. I built the complete backend and API layer for 22,000+ users and 10,000+ job listings.",
    role: "Backend & API · 2024–25",
    employer: "BRDGE",
    employerLogo: BRDGE_LOGO,
  },
  {
    clientLogo: "/xcare-logo.svg",
    icon: Wallet,
    title: "XCARE Capital",
    desc: "Core member of the two-person backend & blockchain team. Built the self-custodial wallet infrastructure from inception, integrating Aave, Morpho, Kamino & Jito with real-time position tracking across Ethereum & Solana, plus in-app calls and messaging.",
    role: "Backend Engineer",
    employer: "Axiomfuse",
    employerLogo: AXIOMFUSE_LOGO,
    caseStudyUrl: "https://axiomfuse.com/case-studies/xcare-capital",
  },
  {
    icon: Scale,
    title: "Arabic–English Legal Chatbot",
    desc: "Llama 3 + Legal GPT on AWS Bedrock, handling 200+ queries a day for a client with strict data-sovereignty needs.",
    role: "LLM Engineer",
    employer: "BRDGE",
    employerLogo: BRDGE_LOGO,
  },
  {
    icon: ShieldCheck,
    title: "LLM Safety Pipeline",
    desc: "Prompt-injection detection and content filtering on Anthropic's Claude API, tuned to reduce harmful outputs at low latency.",
    role: "AI Engineer",
    employer: "Supernomics",
    employerLogo: SUPERNOMICS_LOGO,
  },
  {
    icon: Sparkles,
    title: "Adaptive Personality Assessment",
    desc: "GPT-4o assessment with confidence-based trait scoring across 35 attributes and adaptive, gap-driven question selection.",
    role: "AI Engineer",
    employer: "Axiomfuse",
    employerLogo: AXIOMFUSE_LOGO,
  },
]

const highlights: { logo?: string; icon: LucideIcon; title: string; label: string; href: string }[] = [
  {
    logo: "/gdg-logo.png",
    icon: Mic,
    title: "Google DevFest · From Lagos to the World: Building Scalable AI Systems That Deliver Impact.",
    label: "Talk · 3K+ attendees",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7406264295312945153/",
  },
  {
    logo: "/linkedin-logo.svg",
    icon: FileText,
    title: "Shipping AI Solutions from Lagos to the World",
    label: "Article · 4K+ impressions",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7344298946644574209/",
  },
  {
    logo: "/nyp-logo.jpg",
    icon: Mic,
    title: "Nigeria Youth Parliament: AI & the Future of Work",
    label: "Talk · 150+ attendees",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7425463424467464193/",
  },
  {
    logo: "/nacos-logo.jpg",
    icon: Award,
    title: "Nigeria Association of Computing Students, Bowen University · President",
    label: "Leadership · 800+ members",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7231974579848531968/",
  },
  {
    logo: "/axiomfuse-logo.png",
    icon: Building2,
    title: "Meet Abdul-Malik Adebayo: Software Engineer at Axiom Fuse",
    label: "Feature",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7426573116140773376/",
  },
  {
    logo: "/brdge-logo.png",
    icon: Building2,
    title: "Tech Journeys That Inspire: Abdul-Malik at Bowen Tech Week 2.0",
    label: "Feature",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7335357587925688321/",
  },
]

const speakingImages: CarouselImage[] = [
  {
    src: "https://res.cloudinary.com/x78tb87x/image/upload/f_auto,q_auto:good,c_limit,w_1920/v1782981329/_80A8658_Original_x4gywk.jpg",
    alt: "Speaking at Google DevFest, Ibadan",
    caption: "Google DevFest, Ibadan",
    fit: "contain",
  },
  {
    src: "https://res.cloudinary.com/x78tb87x/image/upload/f_auto,q_auto:good,c_limit,w_1920/v1782980810/IMG_2766_x8id0d.jpg",
    alt: "Speaking at Google DevFest, Ibadan",
    caption: "Google DevFest, Ibadan",
  },
  {
    src: "https://res.cloudinary.com/x78tb87x/image/upload/f_auto,q_auto:good,c_limit,w_1920/nyp1_eazyrn",
    alt: "Speaking at the Nigeria Youth Parliament",
    caption: "Nigeria Youth Parliament",
  },
  {
    src: "https://res.cloudinary.com/x78tb87x/image/upload/f_auto,q_auto:good,c_limit,w_1920/v1782980354/nyp2_tnqmfs.jpg",
    alt: "Speaking at the Nigeria Youth Parliament",
    caption: "Nigeria Youth Parliament",
  },
  {
    src: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756196080/IMG_0711_cbcnks.jpg",
    alt: "Speaking at Bowen Tech Week",
    caption: "Bowen Tech Week",
  },
  {
    src: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756196078/IMG_0713_zfi7bj.jpg",
    alt: "Speaking at Bowen Tech Week",
    caption: "Bowen Tech Week",
  },
  {
    src: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756196078/IMG_0712_hdy03t.jpg",
    alt: "Speaking at Bowen Tech Week",
    caption: "Bowen Tech Week",
  },
]

function CompanyIdentity({
  company,
  logo,
  website,
  logoType,
}: {
  company: string
  logo?: string
  website?: string
  logoType?: string // "wordmark" = logo already includes the name; otherwise a square mark
}) {
  const [error, setError] = useState(false)
  const showLogo = Boolean(logo) && !error
  const wordmark = logoType === "wordmark"
  const showName = !showLogo || !wordmark

  const mark = !showLogo ? (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
      <Building2 className="h-5 w-5 text-primary" />
    </span>
  ) : wordmark ? (
    <span className="inline-flex items-center">
      <img src={logo} alt={`${company} logo`} className="h-7 w-auto" onError={() => setError(true)} />
    </span>
  ) : (
    <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
      <img src={logo} alt={`${company} logo`} className="h-full w-full object-contain" onError={() => setError(true)} />
    </span>
  )

  const inner = (
    <>
      {mark}
      {showName && (
        <span className="text-xl font-bold text-slate-900 transition-colors group-hover/link:text-primary">
          {company}
        </span>
      )}
      {website && (
        <ExternalLink className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover/link:text-primary" />
      )}
    </>
  )

  if (website) {
    return (
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-center gap-3"
      >
        {inner}
      </a>
    )
  }
  return <div className="flex items-center gap-3">{inner}</div>
}

function HighlightLogo({ logo, icon: Icon, alt }: { logo?: string; icon: LucideIcon; alt: string }) {
  const [error, setError] = useState(false)
  if (logo && !error) {
    return (
      <img
        src={logo}
        alt={alt}
        className="max-h-12 w-auto max-w-[160px] object-contain object-left"
        onError={() => setError(true)}
      />
    )
  }
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </span>
  )
}

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const openContact = () => setIsContactModalOpen(true)

  return (
    <div className="home-redesign font-body">
      <Navigation />

      <main className="pt-20">
        {/* 1. HERO (dark) */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
            <SlideInLeft className="space-y-8">
              <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-accent-teal">
                <span className="h-px w-8 bg-accent-teal" /> Adebayo Abdul-Malik
              </p>
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] md:text-7xl">
                Where AI meets <br />
                <span className="text-primary italic">real-world impact.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                Senior AI &amp; Backend Engineer building production LLM systems and scalable infrastructure for clients
                across the US, Europe, Asia, the Gulf and Africa: RAG pipelines, agentic workflows and cloud, shipped
                with reliability, security and scale.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/resume"
                  className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <FileText className="h-4 w-4" /> View Resume
                </Link>
                <button
                  onClick={openContact}
                  className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold transition-colors hover:border-white/60"
                >
                  Work with me <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </SlideInLeft>

            <SlideInRight className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 bg-primary/20 blur-[90px]" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756197152/OBD_1829_puui1n.jpg"
                  alt="Adebayo Abdul-Malik"
                  className="h-[30rem] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="font-display text-lg font-bold">Adebayo Abdul-Malik</p>
                  <p className="text-sm text-slate-300">Senior AI &amp; Backend Engineer · Lagos, Nigeria</p>
                </div>
              </div>
            </SlideInRight>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-slate-500">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </section>

        {/* 2. SELECTED IMPACT (dark) */}
        <section className="bg-slate-900 py-24 px-6 text-white">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-accent-teal">Selected Impact</p>
              <h2 className="mb-14 font-display text-4xl font-bold md:text-5xl">Outcomes, not slideware.</h2>
            </FadeIn>
            <StaggerIn staggerDelay={0.12} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impact.map((item) => (
                <div key={item.label} className="border-t-2 border-primary bg-slate-800/50 p-8">
                  <div className="font-display text-4xl font-bold text-primary">{item.value}</div>
                  <div className="mt-2 font-semibold">{item.label}</div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.note}</p>
                </div>
              ))}
            </StaggerIn>
          </div>
        </section>

        {/* 4. EXPERIENCE / CAREER (light) */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Experience</p>
              <h2 className="mb-14 font-display text-4xl font-bold text-slate-900 md:text-5xl">Where I've built.</h2>
            </FadeIn>

            <div className="relative">
              {/* timeline line */}
              <div className="absolute bottom-6 left-[11px] top-6 w-px bg-slate-200 md:left-[15px]" />
              <StaggerIn staggerDelay={0.15} className="space-y-6">
                {experience.map((job) => (
                  <div key={`${job.company}-${job.period}`} className="relative pl-10 md:pl-14">
                    {/* teal node */}
                    <span className="absolute left-0 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 ring-4 ring-slate-50 md:h-8 md:w-8">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <CompanyIdentity
                          company={job.company}
                          logo={job.logo}
                          website={job.website}
                          logoType={job.logoType}
                        />
                        <div className="flex flex-wrap items-center gap-2">
                          {job.employment && (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                              {job.employment}
                            </span>
                          )}
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {job.period}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">{job.location}</p>
                      <div className="mt-4 space-y-0">
                        {job.roles.map((role, i) => {
                          const multi = job.roles.length > 1
                          return (
                            <div key={i} className={multi ? "relative pl-6 pb-5 last:pb-0" : ""}>
                              {multi && (
                                <>
                                  <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                                  {i < job.roles.length - 1 && (
                                    <span className="absolute left-[4px] top-4 h-full w-px bg-slate-200" />
                                  )}
                                </>
                              )}
                              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                <p className="font-semibold text-slate-900">{role.title}</p>
                                {multi && <span className="text-xs font-medium text-slate-500">{role.period}</span>}
                              </div>
                              <p className="mt-1.5 leading-relaxed text-slate-600">{role.summary}</p>
                            </div>
                          )
                        })}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </StaggerIn>
            </div>

            <div className="mt-10">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
              >
                See full resume <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. EDUCATION (light) */}
        <section className="bg-white py-24 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Education</p>
              <h2 className="mb-14 font-display text-4xl font-bold text-slate-900 md:text-5xl">Where it started.</h2>
            </FadeIn>
            <FadeIn>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm md:p-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{education.school}</h3>
                      <p className="font-medium text-primary">{education.degree}</p>
                      <p className="text-sm text-slate-500">{education.location}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary md:mt-1">
                    {education.period}
                  </span>
                </div>
                <dl className="mt-6 grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-slate-400">Thesis</dt>
                    <dd className="mt-1 text-sm text-slate-600">{education.thesis}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-slate-400">Honors &amp; awards</dt>
                    <dd className="mt-2 flex items-start gap-2.5">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="min-w-0">
                        <span className="block font-semibold text-slate-900">{education.award}</span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-slate-500">
                          {education.awardDesc}
                        </span>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 6. WHY I BUILD (dark) */}
        <section className="relative overflow-hidden bg-slate-950 py-24 px-6 text-white">
          <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />
          <div className="relative mx-auto max-w-5xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-accent-teal">Why I build</p>
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Research rigour. <span className="text-primary">Production reality.</span>
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
                I started in AI research, building a Nigerian Sign Language recognition system and NLP models where
                correctness and evaluation are everything. Then I moved into shipping backends and LLM systems for real
                users, where scale, latency and reliability decide whether the work actually matters.
              </p>
            </FadeIn>

            <StaggerIn staggerDelay={0.15} className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent-teal">
                  <span className="h-2 w-2 rounded-full bg-accent-teal" /> Research
                </p>
                <h3 className="mb-2 text-xl font-bold">How to do things right.</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  Evaluation, correctness and reproducibility: the discipline to build models and systems that hold up
                  when real people depend on them.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Production
                </p>
                <h3 className="mb-2 text-xl font-bold">What actually ships.</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  APIs, scale, latency and cost under load: turning a working prototype into a service that stays up and
                  performs for thousands of users.
                </p>
              </div>
            </StaggerIn>

            <FadeIn>
              <p className="mt-12 border-t border-white/10 pt-10 text-2xl font-medium leading-snug md:text-3xl">
                The best AI work sits where research rigour meets production reality:{" "}
                <span className="text-primary">that's where I build.</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 6. WHAT I DO + TECH (light) */}
        <section className="bg-white py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">What I do</p>
              <h2 className="mb-14 max-w-2xl font-display text-4xl font-bold text-slate-900 md:text-5xl">
                Four ways I help teams ship AI.
              </h2>
            </FadeIn>
            <StaggerIn staggerDelay={0.12} className="grid gap-6 md:grid-cols-2">
              {services.map((s) => (
                <div
                  key={s.no}
                  className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-primary">{s.no}</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{s.title}</h3>
                  <p className="mb-5 leading-relaxed text-slate-600">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </StaggerIn>
          </div>
        </section>

        {/* 7. SELECTED WORK (light) */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Selected Work</p>
              <h2 className="mb-14 font-display text-4xl font-bold text-slate-900 md:text-5xl">
                Where I put the work in.
              </h2>
            </FadeIn>

            <StaggerIn staggerDelay={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {work.slice(0, 3).map((p) => {
                const cardClass =
                  "group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                const body = (
                  <>
                    {p.caseStudyUrl && (
                      <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-slate-300 transition-colors group-hover:text-primary" />
                    )}
                    {/* client / product */}
                    <div className="mb-5 flex h-12 items-center gap-3">
                      {p.clientLogo ? (
                        <img
                          src={p.clientLogo}
                          alt={p.title}
                          className="max-h-9 w-auto max-w-[160px] object-contain object-left"
                        />
                      ) : (
                        <>
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            {p.icon && <p.icon className="h-6 w-6 text-primary" />}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                            Confidential
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                    <p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">{p.role}</p>
                    {/* employer credit */}
                    <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-4">
                      <span className="text-xs text-slate-500">
                        Built at <span className="font-semibold text-slate-900">{p.employer}</span>
                      </span>
                      <img src={p.employerLogo} alt={p.employer} className="h-5 w-auto max-w-[72px] object-contain" />
                    </div>
                  </>
                )
                return p.caseStudyUrl ? (
                  <a key={p.title} href={p.caseStudyUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {body}
                  </a>
                ) : (
                  <div key={p.title} className={cardClass}>
                    {body}
                  </div>
                )
              })}
            </StaggerIn>

            <FadeIn>
              <div className="mt-12 flex justify-center">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  See more of my work <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 8. SPEAKING & COMMUNITY (light) */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Speaking &amp; Community</p>
              <h2 className="mb-4 font-display text-4xl font-bold text-slate-900 md:text-5xl">Ideas worth sharing.</h2>
              <p className="mb-12 max-w-2xl text-lg text-slate-600">
                From keynote stages to student leadership, sharing what I learn building AI, and helping others get
                there faster.
              </p>
            </FadeIn>

            <FadeIn>
              <ImageCarousel images={speakingImages} className="mb-12" />
            </FadeIn>

            <StaggerIn staggerDelay={0.08} className="border-t border-slate-200">
              {highlights.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-slate-200 px-1.5 py-6 transition-[background-color,padding,box-shadow,border-radius] duration-300 hover:z-10 hover:rounded-2xl hover:border-transparent hover:bg-white hover:px-6 hover:shadow-[0_24px_50px_-38px_rgba(16,18,40,0.5)] md:grid-cols-[96px_1fr_auto] md:gap-6"
                >
                  <span className="flex h-14 items-center">
                    <HighlightLogo logo={item.logo} icon={item.icon} alt={item.title} />
                  </span>
                  <span className="order-last col-span-2 font-display text-lg font-medium leading-snug tracking-tight text-slate-900 md:order-none md:col-span-1 md:text-xl">
                    {item.title}
                  </span>
                  <span className="flex items-center justify-end gap-3 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
                  </span>
                </a>
              ))}
            </StaggerIn>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
              >
                More talks, writing &amp; impact <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 9. CONTACT CTA (dark) */}
        <section className="relative overflow-hidden bg-slate-950 py-28 px-6 text-center text-white">
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

      {/* 10. FOOTER (dark) */}
      <footer className="bg-slate-950 px-6 py-16 text-white">
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
