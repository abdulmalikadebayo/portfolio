"use client"

import { useState } from "react"
import { ArrowUpRight, type LucideIcon } from "lucide-react"
import { LogoImage } from "@/components/logo-image"

export interface HighlightItem {
  href: string
  logo?: string
  icon?: LucideIcon // fallback mark when no logo (or logo fails to load)
  title: string
  label: string
}

function HighlightLogo({ logo, icon: Icon, alt }: { logo?: string; icon?: LucideIcon; alt: string }) {
  const [error, setError] = useState(false)
  if (logo && !error) {
    return (
      <LogoImage
        src={logo}
        alt={alt}
        width={160}
        height={48}
        sizes="160px"
        className="max-h-12 w-auto max-w-[160px] object-contain object-left"
        onError={() => setError(true)}
      />
    )
  }
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
      {Icon && <Icon className="h-5 w-5 text-primary" />}
    </span>
  )
}

/** Editorial row used across Home + About: logo, title, right-aligned label, ↗, white-card hover lift. */
export function HighlightRow({ item }: { item: HighlightItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-b border-slate-200 py-4 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:grid-cols-[96px_minmax(0,1fr)_auto] md:gap-4"
    >
      <span className="flex h-12 min-w-0 items-center [&_img]:max-w-full">
        <HighlightLogo logo={item.logo} icon={item.icon} alt={item.title} />
      </span>
      <span className="order-last col-span-2 min-w-0 font-display text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary md:order-none md:col-span-1 md:text-lg">
        {item.title}
      </span>
      <span className="flex items-center justify-end gap-2 whitespace-nowrap text-xs font-medium text-slate-500">
        {item.label}
        <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
      </span>
    </a>
  )
}
