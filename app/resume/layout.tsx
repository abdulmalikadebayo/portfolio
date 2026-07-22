import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Adebayo Abdul-Malik's career: roles at Supernomics, Axiomfuse and BRDGE building LLM safety, DeFi and AI systems. Download the CV.",
  alternates: { canonical: "/resume" },
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
