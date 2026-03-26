/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === 'production' ? '/Portfolio' : '';
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
