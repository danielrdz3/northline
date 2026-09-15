/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  ...(process.env.GITHUB_PAGES === "true"
    ? {
        output: "export",
        images: { unoptimized: true },
        typescript: { ignoreBuildErrors: true },
      }
    : {}),
};

export default nextConfig;
