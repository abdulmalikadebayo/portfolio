"use client"

import { useEffect, useRef, useState } from "react"
import { isFinePointer, prefersReducedMotion } from "@/lib/gsap"

/** Lerping dot + ring cursor that grows over interactive elements. Desktop + fine-pointer + no reduced-motion only. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return
    setEnabled(true)
    document.body.classList.add("cursor-none-desktop")

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: target.x, y: target.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement)?.closest("a,button,[data-cursor]")
      ringRef.current?.classList.toggle("cursor-ring-lg", Boolean(hit))
    }
    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.body.classList.remove("cursor-none-desktop")
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="aa-cursor-dot" aria-hidden />
      <div ref={ringRef} className="aa-cursor-ring" aria-hidden />
      <style>{`
        .aa-cursor-dot, .aa-cursor-ring { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 9999px; }
        .aa-cursor-dot { width: 6px; height: 6px; margin: -3px 0 0 -3px; background: #2dd4bf; }
        .aa-cursor-ring { width: 30px; height: 30px; margin: -15px 0 0 -15px; border: 1.5px solid rgba(45,212,191,0.55);
          transition: width .22s ease, height .22s ease, margin .22s ease, background-color .22s ease; }
        .aa-cursor-ring.cursor-ring-lg { width: 56px; height: 56px; margin: -28px 0 0 -28px; background: rgba(45,212,191,0.08); }
        body.cursor-none-desktop, body.cursor-none-desktop * { cursor: none !important; }
      `}</style>
    </>
  )
}
