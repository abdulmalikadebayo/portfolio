"use client"

import { useId, useState } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"
import { LogoImage } from "@/components/logo-image"
import { type Recommendation } from "@/lib/data"

function Avatar({ rec }: { rec: Recommendation }) {
  const [error, setError] = useState(false)
  if (rec.photo && !error) {
    return (
      <Image
        src={rec.photo}
        alt={rec.name}
        width={48}
        height={48}
        sizes="48px"
        className="h-12 w-12 shrink-0 rounded-full object-cover"
        onError={() => setError(true)}
      />
    )
  }
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
      {rec.initials}
    </span>
  )
}

/**
 * Testimonial card: pull-quote plus attribution (photo/initials, name, role and
 * how they worked with me), with a link out to the recommender's LinkedIn so a
 * reader can verify it. Mirrors the WorkCard visual language.
 */
export function RecommendationCard({ rec, compact = false }: { rec: Recommendation; compact?: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const quoteId = useId()
  const firstSentence = rec.quote.split(". ")[0]
  const excerpt = firstSentence.endsWith(".") ? firstSentence : `${firstSentence}.`
  const canExpand = compact && excerpt.length < rec.quote.length

  return (
    <figure className="flex h-full min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-150 hover:shadow-lg sm:p-8">
      <Quote className="h-8 w-8 shrink-0 text-primary/20" aria-hidden="true" />
      <blockquote id={quoteId} className="mt-3 flex-1 leading-relaxed text-slate-600">
        <p>{canExpand && !expanded ? excerpt : rec.quote}</p>
      </blockquote>
      {canExpand && (
        <button type="button" aria-expanded={expanded} aria-controls={quoteId} onClick={() => setExpanded(!expanded)} className="mt-2 inline-flex min-h-11 items-center self-start rounded-md text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          {expanded ? "Show less" : "Read full recommendation"}
        </button>
      )}
      <figcaption className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4">
        <Avatar rec={rec} />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-slate-900">{rec.name}</p>
          <p className="text-sm leading-snug text-slate-500">{rec.title}</p>
          <p className="mt-0.5 text-xs font-medium text-primary">{rec.relationship}</p>
        </div>
        <a
          href={rec.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${rec.name} on LinkedIn`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <LogoImage src="/linkedin-logo.svg" alt="LinkedIn" className="h-5 w-5" />
        </a>
      </figcaption>
    </figure>
  )
}
