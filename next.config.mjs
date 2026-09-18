const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGitHubPages
    ? {
        basePath: "/northline",
        assetPrefix: "/northline/",
      }
    : {}),
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
