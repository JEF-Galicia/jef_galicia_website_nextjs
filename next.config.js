module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },
  i18n: {
    locales: ['gl', 'es', 'en'],
    defaultLocale: 'es',
  },
}