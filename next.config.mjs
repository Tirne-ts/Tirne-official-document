import withMDX from '@next/mdx'

const withMDXConfigured = withMDX({
  extension: /\.mdx?$/
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

export default withMDXConfigured(nextConfig)
