/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMAGE_PROTOCOL ?? "http",
        hostname: process.env.IMAGE_HOST ?? "localhost",
        port: process.env.IMAGE_PORT ?? "8080",
        pathname: "/api/files/download/**",
      },
    ],
  },
};

export default nextConfig;
