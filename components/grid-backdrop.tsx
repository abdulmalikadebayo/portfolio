"use client"

/** Dependency-free animated grid backdrop for the black resume page: a slow panning grid + a receding "floor" grid + faint accent glow + vignette. Reduced-motion freezes it. */
export function GridBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#081a3d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(13,148,136,0.10),transparent_55%)]" />
      <div className="aa-grid absolute inset-0" />
      <div className="aa-grid-floor absolute inset-x-0 bottom-0 h-[46vh]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(6,6,6,0.94))]" />
      <style>{`
        .aa-grid {
          background-image:
            linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px);
          background-size: 64px 64px;
          animation: aa-grid-pan 20s linear infinite;
        }
        @keyframes aa-grid-pan {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 64px 0, 0 64px; }
        }
        .aa-grid-floor {
          background-image:
            linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px);
          background-size: 46px 46px;
          transform: perspective(320px) rotateX(64deg);
          transform-origin: bottom center;
          mask-image: linear-gradient(to top, rgba(0,0,0,0.9), transparent 85%);
          -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.9), transparent 85%);
          animation: aa-grid-floor 7s linear infinite;
        }
        @keyframes aa-grid-floor {
          from { background-position: 0 0; }
          to   { background-position: 0 46px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aa-grid, .aa-grid-floor { animation: none; }
        }
      `}</style>
    </div>
  )
}
