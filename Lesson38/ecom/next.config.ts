import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Turbopack drops the CJS `ConnectionString` export, so Prisma rejects a valid URL.
  serverExternalPackages: ['mongodb', 'mongodb-connection-string-url'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
