import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work: production AI and backend systems by Adebayo Abdul-Malik, from voice agents and RAG assistants to DeFi wallet infrastructure.",
  alternates: { canonical: "/portfolio" },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
