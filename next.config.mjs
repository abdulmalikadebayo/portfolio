/** @type {import('next').NextConfig} */
const nextConfig = {
  // Type errors now fail the build so real bugs can't ship silently.
  typescript: {
    ignoreBuildErrors: false,
  },
  // Lint runs on build too; see .eslintrc.json for the (deliberately lean) rule set.
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    // Large content images (hero, about photo, carousel) go through next/image
    // and are optimized to AVIF/WebP. Cloudinary is the only remote host used.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
}

export default nextConfig
