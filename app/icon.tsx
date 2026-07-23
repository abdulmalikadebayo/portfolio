import { ImageResponse } from "next/og"

// Branded favicon: white "A." monogram on Chelsea blue, matching the intro
// loader's brand beat. Generated at build time — replaces the generic globe
// Google/browsers show by default.
export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#034694",
          color: "#ffffff",
          fontSize: 44,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ display: "flex" }}>A</span>
        <span style={{ display: "flex", color: "#4f9cf9" }}>.</span>
      </div>
    ),
    { ...size },
  )
}
