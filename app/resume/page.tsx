"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Download,
  Printer as Print,
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  ExternalLink,
} from "lucide-react"

export default function ResumePage() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/Adebayo_Abdul-Malik.pdf'
    link.download = 'Adebayo_Abdul-Malik.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const techStack = [
    "Python",
    "JavaScript",
    "Node.js",
    "TensorFlow",
    "PyTorch",
    "Docker",
    "AWS",
    "GCP",
    "PostgreSQL",
    "Redis",
    "Git",
    "Linux",
    "API Development",
    "Machine Learning",
    "NLP",
    "Computer Vision",
    "Backend Architecture",
  ]

  const workExperience = [
    {
      company: "BRDGE",
      location: "London, United Kingdom (Remote)",
      positions: [
        {
          title: "AI Development Analyst",
          period: "February 2025 – Present",
          responsibilities: [
            "Led the end-to-end development of a multilingual AI chatbot for a Saudi-based client, integrating an open-source model with Legal GPT to handle English and Arabic legal queries.",
            "Delivered custom AI implementations for global clients across Europe (Ireland, UK), Asia (China, Malaysia), and Africa (Nigeria).",
            "Collaborated directly with clients and stakeholders to align AI deployments with business goals, emphasizing compliance, governance, and real-time decision intelligence.",
          ],
        },
        {
          title: "AI Researcher and Engineer",
          period: "June 2024 – February 2025",
          responsibilities: [
            "Designed and developed the entire backend architecture and API endpoints for Apprentago, a large-scale apprenticeship platform with 10,000+ active users and job listings, combined, ensuring scalability, efficiency, and a successful live deployment.",
            "Developed LLM-powered AI assistants using Retrieval-Augmented Generation (RAG) pipelines and fine-tuned models, deploying APIs and containerizing them with Docker for scalable deployment.",
            "Deployed services using AWS and GCP, implemented CI/CD pipelines via GitHub Actions, and maintained security and NDA compliance while delivering confidential client projects.",
          ],
        },
      ],
    },
    {
      company: "SYNERGY SOLUTIONS IMC LIMITED",
      location: "Remote",
      positions: [
        {
          title: "Data Scientist",
          period: "September 2023 – October 2023",
          responsibilities: [
            "Lead all technical initiatives at a growing marketing agency, introducing AI-powered tools to support campaign creation, automate routine tasks, and boost client engagement.",
            "Developed custom internal systems for AI-generated captions, ad copy, and campaign briefs, helping non-technical staff create compelling content faster.",
            "Worked closely with non-technical staff to make AI accessible and practical, reducing content turnaround time and scaling marketing output without increasing headcount.",
          ],
        },
      ],
    },
    {
      company: "KPMG",
      location: "Remote",
      positions: [
        {
          title: "Data Analyst Intern",
          period: "September 2020 – October 2020",
          responsibilities: [
            "Completed the Data Quality Assessment, Data Insights and Presentation task as part of the KPMG virtual internship",
          ],
        },
      ],
    },
  ]

  const projects = [
    {
      title: "AI-Powered News Summarization Tool",
      description:
        "Developed an AI-powered news summarization tool using Python, Natural Language Processing (NLP), and Machine Learning (ML) techniques.",
      details: [
        "Implemented advanced algorithms to extract key information from news articles, generating concise and coherent summaries.",
        "Integrated the tool with a web interface for easy access and usability.",
        "Improved news consumption efficiency by providing users with quick and informative summaries.",
      ],
      technologies: ["Python", "NLP", "Machine Learning", "Web Interface"],
    },
    {
      title: "AI-Powered Plagiarism Checker",
      description:
        "Developed an AI-powered plagiarism checker using Python, Natural Language Processing (NLP), and Machine Learning (ML) techniques.",
      details: [
        "Implemented advanced algorithms to detect plagiarism in text documents, providing accurate and reliable results.",
        "Integrated the tool with a web interface for easy access and usability.",
        "Improved academic integrity by providing students and educators with a tool to detect and prevent plagiarism.",
      ],
      technologies: ["Python", "NLP", "Machine Learning", "Text Analysis"],
    },
  ]

  const awards = [
    {
      title: "Student Icon 360",
      organization: "Bowen University",
      year: "2024",
      description: "Awarded to outstanding students excelling in academics, leadership, and Community Impact",
    },
    {
      title: "MTN Foundation Science and Technology Scholarship",
      organization: "MTN Foundation",
      year: "2023",
      description: "Scholarship recipient for excellence in Science and Technology",
    },
    {
      title: "Most Outstanding Student in Computer Science",
      organization: "Bowen University",
      year: "2022",
      description: "Recognition for academic excellence in Computer Science",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="py-12 bg-gradient-to-br from-background via-muted/30 to-primary/5 print:bg-white print:py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl lg:text-5xl font-bold font-serif text-primary print:text-black">Resume</h1>
                  <p className="text-lg text-muted-foreground print:text-gray-600">
                    Learn more about my skills, qualifications and experiences.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 print:hidden">
                <Button onClick={handleDownload} size="lg" className="!cursor-pointer">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Content */}
        <section className="py-12 print:py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 print:px-8">
            {/* Personal Information */}
            <Card className="p-8 mb-8 print:shadow-none print:border-2 print:border-gray-300">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold font-serif">Adebayo Abdul-Malik</h2>
                <p className="text-xl text-primary font-medium print:text-black">AI Researcher & Backend Engineer</p>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground print:text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Lagos, Nigeria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+2348036561316</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>abdulmalikadebayo1@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span>github.com/AdebayoAbdulmalik</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    <span>linkedin.com/in/adebayo-abdul-malik-</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Education */}
            <Card className="p-6 mb-8 print:shadow-none print:border print:border-gray-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center print:bg-gray-100">
                  <GraduationCap className="h-5 w-5 text-primary print:text-black" />
                </div>
                <h3 className="text-2xl font-bold font-serif">Education</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-primary/20 pl-6 print:border-gray-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-semibold">Bachelor of Science, Computer Science</h4>
                      <p className="text-primary font-medium print:text-black">Bowen University</p>
                      <p className="text-sm text-muted-foreground print:text-gray-600">Osun State, Nigeria</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="print:bg-gray-100 print:text-black">
                        2020-2024
                      </Badge>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground print:text-gray-600">
                    <strong>Thesis:</strong> Development of a Nigerian Sign Language Recognition System
                  </p>
                </div>
              </div>
            </Card>

            {/* Professional Experience */}
            <Card className="p-6 mb-8 print:shadow-none print:border print:border-gray-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center print:bg-gray-100">
                  <Briefcase className="h-5 w-5 text-primary print:text-black" />
                </div>
                <h3 className="text-2xl font-bold font-serif">Professional Experience</h3>
              </div>

              <div className="space-y-8">
                {workExperience.map((company, companyIndex) => (
                  <div key={companyIndex} className="border-l-2 border-primary/20 pl-6 print:border-gray-300">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">{company.company}</h4>
                      <p className="text-sm text-muted-foreground print:text-gray-600">{company.location}</p>
                    </div>

                    {company.positions.map((position, positionIndex) => (
                      <div key={positionIndex} className="mb-6 last:mb-0">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                          <h5 className="font-medium text-primary print:text-black">{position.title}</h5>
                          <Badge variant="outline" className="w-fit print:border-gray-400">
                            {position.period}
                          </Badge>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground print:text-gray-700">
                          {position.responsibilities.map((responsibility, respIndex) => (
                            <li key={respIndex} className="flex gap-2">
                              <span className="text-primary print:text-black">•</span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Card>

            {/* Tech Stack */}
            <Card className="p-6 mb-8 print:shadow-none print:border print:border-gray-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center print:bg-gray-100">
                  <Code className="h-5 w-5 text-primary print:text-black" />
                </div>
                <h3 className="text-2xl font-bold font-serif">Tech Stack</h3>
                <p className="text-sm text-muted-foreground print:text-gray-600 ml-auto">TOOLS & TECHNOLOGIES</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <Badge key={index} variant="outline" className="print:border-gray-400">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Projects */}
            <Card className="p-6 mb-8 print:shadow-none print:border print:border-gray-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center print:bg-gray-100">
                  <ExternalLink className="h-5 w-5 text-primary print:text-black" />
                </div>
                <h3 className="text-2xl font-bold font-serif">Projects</h3>
              </div>

              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-6 print:border-gray-300">
                    <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 print:text-gray-600">{project.description}</p>
                    <ul className="space-y-1 text-sm text-muted-foreground mb-3 print:text-gray-700">
                      {project.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex gap-2">
                          <span className="text-primary print:text-black">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs print:bg-gray-100 print:text-black"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Awards */}
            <Card className="p-6 print:shadow-none print:border print:border-gray-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center print:bg-gray-100">
                  <Award className="h-5 w-5 text-primary print:text-black" />
                </div>
                <h3 className="text-2xl font-bold font-serif">Awards</h3>
              </div>

              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-6 print:border-gray-300">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{award.title}</h4>
                        <p className="text-sm text-primary print:text-black">{award.organization}</p>
                        <p className="text-sm text-muted-foreground print:text-gray-600">{award.description}</p>
                      </div>
                      <Badge variant="secondary" className="w-fit print:bg-gray-100 print:text-black">
                        {award.year}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { 
            font-size: 12px !important; 
            line-height: 1.4 !important;
            color: black !important;
          }
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background-color: white !important; }
          .print\\:bg-gray-100 { background-color: #f3f4f6 !important; }
          .print\\:text-black { color: black !important; }
          .print\\:text-gray-600 { color: #4b5563 !important; }
          .print\\:text-gray-700 { color: #374151 !important; }
          .print\\:border { border: 1px solid #d1d5db !important; }
          .print\\:border-2 { border: 2px solid #d1d5db !important; }
          .print\\:border-gray-300 { border-color: #d1d5db !important; }
          .print\\:border-gray-400 { border-color: #9ca3af !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:px-8 { padding-left: 2rem !important; padding-right: 2rem !important; }
          .print\\:py-8 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
          * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
        }
      `}</style>
    </div>
  )
}
