/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  output: 'export', // ← 必須：Cloudflare Functions対応
}

module.exports = nextConfig
