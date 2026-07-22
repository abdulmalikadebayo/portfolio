import { cn } from "@/lib/utils"

/**
 * Seamless horizontal ticker, modelled on brdge.ai's capability marquee.
 * The item list is rendered twice inside one track that slides to -50% on a
 * linear-infinite loop, so the loop is seamless. Pure CSS transform (see
 * `.animate-marquee` in globals.css); pauses on hover and for reduced-motion.
 *
 * `durationSec` tunes speed (larger = slower). `separator` sits between items.
 */
export function Marquee({
  items,
  durationSec = 32,
  separator = "◆",
  className,
}: {
  items: string[]
  durationSec?: number
  separator?: string
  className?: string
}) {
  const Track = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span className="px-6 text-sm font-bold uppercase tracking-widest whitespace-nowrap md:px-8">{item}</span>
          <span className="text-[8px] text-accent-teal" aria-hidden>
            {separator}
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={cn("marquee-pause group relative flex overflow-hidden", className)}
      role="marquee"
      aria-label="Capabilities"
    >
      <div className="animate-marquee flex w-max" style={{ ["--marquee-duration" as string]: `${durationSec}s` }}>
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  )
}
