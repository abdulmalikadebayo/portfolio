import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind the work: Adebayo Abdul-Malik's path from AI research to shipping production LLM and backend systems, plus talks, writing and community leadership.",
  alternates: { canonical: "/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
