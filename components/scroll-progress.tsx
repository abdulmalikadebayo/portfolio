"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

/** Thin fixed scroll-progress bar (teal). Works on touch. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
      })
    })
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])
  return <div ref={ref} className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left scale-x-0 bg-primary" aria-hidden />
}
