/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignorer les erreurs ESLint pendant le build pour tester rapidement
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorer les erreurs TypeScript pendant le build pour tester rapidement
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
