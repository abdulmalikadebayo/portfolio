import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "About",
  description:
    "From AI research to production: Adebayo Abdul-Malik ships LLM and backend systems for clients on four continents, plus talks, writing and leadership.",
  alternates: { canonical: "/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
