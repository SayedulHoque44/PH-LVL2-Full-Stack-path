/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // all images from https
        hostname: "**", // hostname can be any
      },
    ],
  },
};

module.exports = nextConfig;
