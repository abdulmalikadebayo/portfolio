"use client"

import { useRef, type ReactNode } from "react"
import { isFinePointer, prefersReducedMotion } from "@/lib/gsap"

/** 3D perspective tilt toward the cursor + a spotlight glow that follows the mouse. Desktop/fine-pointer only; static otherwise. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  const active = () => isFinePointer() && !prefersReducedMotion()

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el || !active()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 7}deg)`
    if (spotRef.current) {
      spotRef.current.style.opacity = "1"
      spotRef.current.style.background = `radial-gradient(320px circle at ${px * 100}% ${py * 100}%, rgba(45,212,191,0.16), transparent 60%)`
    }
  }

  const handleLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
    if (spotRef.current) spotRef.current.style.opacity = "0"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      {children}
    </div>
  )
}
