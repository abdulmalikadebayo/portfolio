import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Adebayo Abdul-Malik's career: LLM safety at Supernomics, DeFi and AI at Axiomfuse and BRDGE. Explore every role or download the CV.",
  alternates: { canonical: "/resume" },
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
