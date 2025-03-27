
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@ant-design/icons', '@ant-design/icons-svg'],
  modularizeImports: {
    '@ant-design/icons': {
      transform: '@ant-design/icons/lib/icons/${member}',
    },
  }
}

module.exports = nextConfig
