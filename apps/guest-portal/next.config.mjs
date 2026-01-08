/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@c1rcle/core', '@c1rcle/ui'],
  // Disabled optimizePackageImports for framer-motion due to Next.js 14.2.x bug
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com', // Fix: External Single Point of Failure (Allowing Dicebear)
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/club/:path*',
        destination: '/venue/:path*',
        permanent: true,
      },
      {
        source: '/clubs/:path*',
        destination: '/venue/:path*',
        permanent: true,
      },
      {
        source: '/venues/:slug',
        destination: '/venue/:slug',
        permanent: true,
      },
      {
        source: '/hosts/:slug',
        destination: '/host/:slug',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
