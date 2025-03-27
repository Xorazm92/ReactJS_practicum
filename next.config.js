
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['rc-util', 'antd', '@ant-design/icons'],
}

module.exports = nextConfig
