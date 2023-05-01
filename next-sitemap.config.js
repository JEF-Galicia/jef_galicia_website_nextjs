/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://jef.gal',
  generateRobotsTxt: true, // (optional)
  exclude: '/posts/*'
}