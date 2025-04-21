declare module 'next-pwa' {
    import { NextConfig } from 'next'
  
    interface PWAOptions {
      dest: string
      disable?: boolean
      register?: boolean
      skipWaiting?: boolean
      [key: string]: unknown
    }
  
    function withPWA(options: PWAOptions): (nextConfig: NextConfig) => NextConfig
  
    export default withPWA
  }