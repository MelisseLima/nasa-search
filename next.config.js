/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeImages: true,
  images: {
    domains: ['images-assets.nasa.gov'],
  },
}

module.exports = nextConfig
