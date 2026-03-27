/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

// Custom domain arunalur.me serves from the root — no basePath needed.
// (basePath was '/Portfolio' only when hosting under github.io/Portfolio without a custom domain)
const basePath = '';

const nextConfig = {
  ...(isGithubPages && { output: 'export' }),
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
