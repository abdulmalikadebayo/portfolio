"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

export interface CarouselImage {
  src: string
  alt: string
  caption?: string
  /** "cover" (default) fills the frame; "contain" shows the whole image on a blurred fill (for tall portraits). */
  fit?: "cover" | "contain"
}

interface ImageCarouselProps {
  images: CarouselImage[]
  /** Auto-advance interval in ms. Set to 0 to disable autoplay. */
  interval?: number
  className?: string
  compact?: boolean
}

export function ImageCarousel({ images, interval = 4000, className = "", compact = false }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(interval > 0)
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(preference.matches)
    update()
    preference.addEventListener("change", update)
    return () => preference.removeEventListener("change", update)
  }, [])

  const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))

  useEffect(() => {
    if (reducedMotion || !isAutoPlaying || interval <= 0 || images.length <= 1) return
    const id = setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [reducedMotion, isAutoPlaying, interval, images.length])

  if (images.length === 0) return null

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl ${className}`}>
      <div
        className="flex h-full transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => {
          const contain = image.fit === "contain"
          return (
            <div key={index} aria-hidden={index !== currentIndex} className={`relative w-full flex-shrink-0 overflow-hidden bg-muted ${compact ? "h-64 sm:h-80 lg:h-[480px]" : "h-96 md:h-[640px]"}`}>
              {index === currentIndex && <>
              {contain && (
                // blurred fill so tall portraits look intentional instead of leaving bars
                <Image
                  src={image.src}
                  alt={image.alt}
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 768px) 1152px, 100vw"
                  className="scale-110 object-cover opacity-40 blur-2xl"
                />
              )}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 1152px, 100vw"
                className={`relative ${contain ? "object-contain" : "object-cover"}`}
              />
              </>}
              {image.caption && (
                <span className="absolute bottom-14 left-4 max-w-[calc(100%-2rem)] rounded-xl bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {image.caption}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {interval > 0 && !reducedMotion && (
            <button
              onClick={() => setIsAutoPlaying((v) => !v)}
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          )}

          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
                className="flex h-11 w-9 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    index === currentIndex ? "scale-110 bg-white" : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
