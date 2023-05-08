import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | JEF Galicia',
  defaultTitle: 'JEF Galicia - Xeración Europea Federalista Galicia',
  canonical: 'https://jef.gal/',
  description: 'JEF Galicia, ou Xeración Europea Federalista Galicia, é unha asociación sen ánimo de lucro adicada ao fomento da participación da xuventude galega na construción dunha Europa federal.',
  openGraph: {
    type: 'website',
    locale: 'gl',
    url: 'https://jef.gal/',
    siteName: 'JEF Galicia',
    title: 'JEF Galicia'
  },
  twitter: {
    handle: '@jef_galicia',
    cardType: 'summary_large_image',
    site: '@jef_galicia'
  },
};

export default config;