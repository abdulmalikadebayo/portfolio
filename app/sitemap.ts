import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = ["", "/about", "/resume", "/portfolio"]
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}
