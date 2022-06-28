/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fakeimg.pl', 'localhost', 'https://recipedia-ashen.vercel.app', 'res.cloudinary.com', 'http://res.cloudinary.com/'],
  },
}

module.exports = nextConfig
