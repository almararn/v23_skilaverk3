/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.themealdb.com",
      },
    ],
  },
}

module.exports = nextConfig
