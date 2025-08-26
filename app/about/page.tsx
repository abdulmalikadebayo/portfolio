"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Award, MapPin, Calendar, Brain, Server, Globe, Users, Target, Lightbulb, ChevronLeft, ChevronRight, Play, Pause, LucideIcon } from "lucide-react"
import Link from "next/link"
import React, { useState, useEffect } from 'react'
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  ScaleIn,
  StaggerIn,
  FloatingAnimation,
} from "@/components/animations/reveal-animations"
import { ContactModal } from "@/components/contact-modal"

interface CarouselImage {
  src: string;
  alt: string;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Achievement {
  title: string;
  description: string;
  year: string;
  icon: LucideIcon;
}

interface ExpertiseArea {
  title: string;
  description: string;
  icon: LucideIcon;
  technologies: string[];
}

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const images: CarouselImage[] = [
    {
      src: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756196080/IMG_0711_cbcnks.jpg",
      alt: "BTW 2.0"
    },
    {
      src: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756196078/IMG_0713_zfi7bj.jpg",
      alt: "BTW 2.0"
    },
    {
      src: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756196078/IMG_0712_hdy03t.jpg",
      alt: "BTW 2.0"
    }
  ];

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex: number) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex: number) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = (): void => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentIndex]);

  return (
    <FadeIn>
      <div className="w-full max-w-6xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-primary/20">
        <div className="relative h-96 md:h-[700px] overflow-hidden bg-muted">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image: CarouselImage, index: number) => (
              <div
                key={index}
                className="w-full flex-shrink-0 relative"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center hover:bg-background/30 transition-all duration-200 group cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-primary" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center hover:bg-background/30 transition-all duration-200 group cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-primary" />
          </button>

          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 w-10 h-10 bg-background/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center hover:bg-background/30 transition-all duration-200 cursor-pointer"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_: CarouselImage, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

const AboutPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const handleEmailClick = () => {
    setIsContactModalOpen(true)
  }

  const skills: Skill[] = [
    { name: "Python", level: 95, category: "Programming" },
    { name: "Machine Learning", level: 90, category: "AI/ML" },
    { name: "Natural Language Processing", level: 88, category: "AI/ML" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Docker", level: 82, category: "DevOps" },
    { name: "AWS/GCP", level: 80, category: "Cloud" },
    { name: "PostgreSQL", level: 85, category: "Database" },
    { name: "API Development", level: 90, category: "Backend" },
  ]

  const achievements: Achievement[] = [
    {
      title: "Student Icon 360",
      description: "Outstanding student excelling in academics, leadership, and community impact",
      year: "2024",
      icon: Award,
    },
    {
      title: "MTN Foundation Scholarship",
      description: "Science and Technology Scholarship recipient",
      year: "2023",
      icon: GraduationCap,
    },
    {
      title: "Most Outstanding Student",
      description: "Computer Science Department, Bowen University",
      year: "2022",
      icon: Target,
    },
  ]

  const expertise: ExpertiseArea[] = [
    {
      title: "AI Research & Development",
      description: "Specializing in machine learning, NLP, and computer vision with focus on practical applications",
      icon: Brain,
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
    },
    {
      title: "Backend Engineering",
      description: "Building scalable, high-performance backend systems and APIs for enterprise applications",
      icon: Server,
      technologies: ["Node.js", "Python", "PostgreSQL", "Redis"],
    },
    {
      title: "Cloud & DevOps",
      description: "Deploying and managing applications on cloud platforms with CI/CD best practices",
      icon: Globe,
      technologies: ["AWS", "GCP", "Docker", "GitHub Actions"],
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <SlideInLeft>
                <div className="relative">
                  <ScaleIn>
                    <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
                      <div className="text-center space-y-6">
                        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border-4 border-primary/30">
                          <img 
                            src="https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756197152/OBD_1848_cvlyxt.jpg" 
                            alt="Avatar" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <h1 className="text-3xl font-bold font-serif">Adebayo Abdul-Malik</h1>
                          <p className="text-lg text-primary font-medium">AI Researcher & Backend Engineer</p>
                          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>Lagos, Nigeria</span>
                          </div>
                        </div>

                        <div className="flex justify-center space-x-4">
                          <Badge variant="secondary">Available for hire</Badge>
                          <Badge variant="outline">Remote friendly</Badge>
                        </div>
                      </div>
                    </Card>
                  </ScaleIn>

                  <FloatingAnimation>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20">
                      <Lightbulb className="h-6 w-6 text-accent" />
                    </div>
                  </FloatingAnimation>
                </div>
              </SlideInLeft>

              <SlideInRight>
                <div className="space-y-8">
                  <FadeIn>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-bold font-serif text-primary">Who am I?</h2>
                      <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                        <p>
                          I'm a passionate AI researcher and backend engineer with a strong foundation in computer
                          science and a drive to solve complex problems through innovative technology solutions.
                        </p>
                        <p>
                          Currently working as an AI Development Analyst at BRDGE, where I lead the development of
                          multilingual AI chatbots and custom AI implementations for global clients across Europe, Asia,
                          and Africa.
                        </p>
                        <p>
                          My expertise spans from developing machine learning models for sign language recognition to
                          building scalable backend architectures that serve thousands of users.
                        </p>
                      </div>
                    </div>
                  </FadeIn>

                  <StaggerIn staggerDelay={0.1}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Education</div>
                          <div className="text-sm text-muted-foreground">BSc Computer Science</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Experience</div>
                          <div className="text-sm text-muted-foreground">4+ Years</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Users Served</div>
                          <div className="text-sm text-muted-foreground">30,000+</div>
                        </div>
                      </div>
                    </div>
                  </StaggerIn>
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageCarousel />
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-4xl font-bold font-serif text-primary">What I do?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  I specialize in developing intelligent systems and robust backend solutions that drive innovation and
                  create meaningful impact.
                </p>
              </div>
            </FadeIn>

            <StaggerIn staggerDelay={0.2}>
              <div className="grid md:grid-cols-3 gap-8">
                {expertise.map((item: ExpertiseArea, index: number) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech: string) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </StaggerIn>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-4xl font-bold font-serif text-primary">Skills & Expertise</h2>
                <p className="text-lg text-muted-foreground">
                  Technical proficiencies developed through academic research and professional experience
                </p>
              </div>
            </FadeIn>

            <StaggerIn staggerDelay={0.3}>
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skill: Skill, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="outline">{skill.category}</Badge>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </StaggerIn>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-4xl font-bold font-serif text-primary">Achievements & Recognition</h2>
                <p className="text-lg text-muted-foreground">
                  Awards and honors recognizing academic excellence and leadership
                </p>
              </div>
            </FadeIn>

            <StaggerIn staggerDelay={0.4}>
              <div className="grid md:grid-cols-3 gap-8">
                {achievements.map((achievement: Achievement, index: number) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                        <achievement.icon className="h-8 w-8 text-accent" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <Badge variant="secondary">{achievement.year}</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </StaggerIn>
          </div>
        </section>

        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-6">Ready to collaborate?</h2>
            </FadeIn>
            <FadeIn>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, research collaborations, and innovative projects in AI
                and backend development.
              </p>
            </FadeIn>
            {/* <FadeIn delay={0.2}> */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleEmailClick} className="!cursor-pointer">
                  Get In Touch
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">View My Work</Link>
                </Button>
              </div>
            {/* </FadeIn> */}
          </div>
        </section>
        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      </main>
    </div>
  )
}

export default AboutPage