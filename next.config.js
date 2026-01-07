/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
}

module.exports = withNextIntl(nextConfig);
