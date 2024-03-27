/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'rc-util',
    '@ant-design',
    '@ant-design/icons',
    'antd',
    "@babel/runtime",
    'rc-pagination',
    'rc-picker',
    "rc-tree",
    "rc-table",
  ],
};

export default nextConfig;
