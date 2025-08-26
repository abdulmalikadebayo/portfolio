"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Download, ExternalLink, Code, Brain, Server } from "lucide-react"
import Link from "next/link"
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  ScaleIn,
  StaggerIn,
  HeroTextAnimation,
  FloatingAnimation,
} from "@/components/animations/reveal-animations"
import { ContactModal } from "@/components/contact-modal"
import Image from "next/image"

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const handleEmailClick = () => {
    setIsContactModalOpen(true)
  }
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="w-full lg:grid lg:grid-cols-2 gap-12 items-center">
              <SlideInLeft>
                <div className="space-y-8 grid">
                  <HeroTextAnimation>
                    <div className="space-y-4">
                      <Badge variant="secondary" className="w-fit">
                        Available for new opportunities
                      </Badge>
                      <h1 className="text-5xl lg:text-7xl font-bold font-serif">
                        <span className="text-foreground">Adebayo</span>
                        <br />
                        <span className="text-primary">Abdul-Malik</span>
                      </h1>
                      <div className="flex items-center space-x-2 text-lg lg:text-2xl text-muted-foreground">
                        <Brain className="h-6 w-6 text-accent" />
                        <span>AI Researcher</span>
                        <span className="text-border">•</span>
                        <Server className="h-6 w-6 text-primary" />
                        <span>Backend Engineer</span>
                      </div>
                    </div>
                  </HeroTextAnimation>

                  <FadeIn delay={0.5}>
                    <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                      Passionate about developing intelligent systems and scalable backend architectures. Currently
                      advancing the field of AI research while building robust, enterprise-grade applications.
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.7}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" asChild className="group">
                        <Link href="/portfolio">
                          View My Work
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="/resume">
                          <Download className="mr-2 h-4 w-4" />
                          Download Resume
                        </Link>
                      </Button>
                    </div>
                  </FadeIn>

                  <StaggerIn delay={0.9} staggerDelay={0.1}>
                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">30K+</div>
                        <div className="text-sm text-muted-foreground">Users Served</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">4+</div>
                        <div className="text-sm text-muted-foreground">Years Experience</div>
                      </div>
                    </div>
                  </StaggerIn>
                </div>
              </SlideInLeft>

              <SlideInRight>
                <div className="mt-9 lg:mt-0 relative">
                  <ScaleIn delay={0.3}>
                    <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-colors">
                      <div className="space-y-6">
                        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border-2 border-primary/30">
                          <img 
                            src="https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756197152/OBD_1829_puui1n.jpg" 
                            alt="Avatar" 
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </div>

                        <div className="text-center space-y-2">
                          <h3 className="text-xl font-semibold">Currently at</h3>
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                              <span className="text-primary-foreground font-bold text-xs">B</span>
                            </div>
                            <span className="font-medium">BRDGE</span>
                            <Badge variant="outline">Remote</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">AI Development Analyst</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">📍 Lagos, Nigeria</p>
                        </div>
                      </div>
                    </Card>
                  </ScaleIn>

                  <FloatingAnimation>
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                      <Code className="h-8 w-8 text-primary" />
                    </div>
                  </FloatingAnimation>
                  <FloatingAnimation>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                  </FloatingAnimation>
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold font-serif">Featured Projects</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A glimpse into my recent work in AI research and backend development
                </p>
              </div>
            </FadeIn>

            <StaggerIn staggerDelay={0.2}>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">AI Research</Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold">Nigerian Sign Language Recognition</h3>
                    <p className="text-muted-foreground">
                      Developed an AI-powered system for recognizing Nigerian Sign Language using computer vision and
                      machine learning techniques.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">TensorFlow</Badge>
                      <Badge variant="outline">Computer Vision</Badge>
                    </div>
                  </div>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Backend Development</Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold">Apprentago Platform</h3>
                    <p className="text-muted-foreground">
                      Designed and developed the entire backend architecture for a large-scale apprenticeship platform
                      serving 10,000+ users.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">AWS</Badge>
                      <Badge variant="outline">Docker</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </StaggerIn>

            <FadeIn delay={0.5}>
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/portfolio">
                    View All Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-6">Let's Build Something Amazing Together</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm always interested in discussing new opportunities, innovative projects, and collaborations in AI
                research and backend development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="!cursor-pointer" onClick={handleEmailClick}>
                  Get In Touch
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More About Me</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
