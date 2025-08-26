"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectModal } from "@/components/project-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn, StaggerIn, ScaleIn } from "@/components/animations/reveal-animations"
import { ContactModal } from "@/components/contact-modal"

// ... existing interfaces and component code ...

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const handleEmailClick = () => {
    setIsContactModalOpen(true)
  }

  const categories = ["AI Research", "Backend Systems", "Innovative Solutions"]
  const projects = [
    { id: 1, name: "Project 1", category: "AI Research" },
    { id: 2, name: "Project 2", category: "Backend Systems" },
    { id: 3, name: "Project 3", category: "Innovative Solutions" },
  ]

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "" || project.category === selectedCategory,
  )

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold font-serif text-primary">Recent Works</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Portfolio showcase of my AI research projects, backend systems, and innovative solutions.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerIn staggerDelay={0.1}>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all duration-200 cursor-pointer"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </StaggerIn>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerIn staggerDelay={0.15}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ScaleIn key={project.id}>
                    <Card
                      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                      onClick={() => handleProjectClick(project)}
                    >
                      {/* ... existing card content ... */}
                    </Card>
                  </ScaleIn>
                ))}
              </div>
            </StaggerIn>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-6">Interested in collaborating?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always excited to work on innovative projects that push the boundaries of AI and backend development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleEmailClick} className="!cursor-pointer">
                Start a Project
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/resume">View My Resume</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
