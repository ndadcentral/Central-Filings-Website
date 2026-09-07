import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@shadergradient/react'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shadergradient/react': path.resolve(
        process.cwd(),
        'node_modules/@shadergradient/react/dist/index.mjs'
      ),
    }
    return config
  },
}

export default nextConfig
