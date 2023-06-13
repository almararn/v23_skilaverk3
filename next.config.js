/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.themealdb.com",
      },
      {
        hostname: "images.punkapi.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
