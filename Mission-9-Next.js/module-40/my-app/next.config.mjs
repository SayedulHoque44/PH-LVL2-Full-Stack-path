/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", //that's allow all domain support
      },
    ],

    // domains: ["buffer.com"],
  },
};

export default nextConfig;
