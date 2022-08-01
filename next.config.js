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
  env: {
    API_AUTH_LINK: "https://api.veezen.com/api/v1/account",
    API_SESSION_LINK: "https://veezen-backend.herokuapp.com",
  },
};

module.exports = nextConfig;
