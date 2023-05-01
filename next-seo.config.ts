import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | JEF Galicia',
  defaultTitle: 'JEF Galicia',
  canonical: 'https://jef.gal/',
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