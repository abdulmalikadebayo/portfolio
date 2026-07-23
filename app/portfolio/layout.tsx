import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Production AI and backend systems by Adebayo Abdul-Malik: voice agents, RAG assistants and DeFi wallet infrastructure serving 23K+ users.",
  alternates: { canonical: "/portfolio" },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
