/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['better-auth'],
    serverActions: {
      allowedOrigins: ['localhost:3000', 'gpa-tracker-sigma.vercel.app'],
    },
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
