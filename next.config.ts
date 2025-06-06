import withPWA from 'next-pwa'
import type { NextConfig } from 'next'
import runtimeCaching from 'next-pwa/cache'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'goldbelly.imgix.net',
      },
    ],
  },
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
})(nextConfig)