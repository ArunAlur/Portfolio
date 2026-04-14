/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/Portfolio" : "";
const siteUrl = `https://arunalur.me${basePath}`;

const nextConfig = {
  ...(isGithubPages && { output: "export" }),
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
