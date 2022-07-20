/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "media.discordapp.net",
    ],
  },
};

module.exports = nextConfig;
