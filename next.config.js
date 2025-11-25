const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
    remotePatterns: [],
    domains: ['admin.globens.uz', 'globens.test'],
  },
}

module.exports = withNextIntl(nextConfig);
