/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL ?? "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOST ?? "localhost",
        port: process.env.NEXT_PUBLIC_IMAGE_PORT ?? "8080",
        pathname: "/api/files/download/**",
      },
    ],
  },
};

export default nextConfig;
