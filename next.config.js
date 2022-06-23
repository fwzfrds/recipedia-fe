/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fakeimg.pl', 'localhost', 'vercel.app'],
  },
}

module.exports = nextConfig
