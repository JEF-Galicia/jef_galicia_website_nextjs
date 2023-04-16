import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | JEF Galicia',
  defaultTitle: 'JEF Galicia',
  openGraph: {
    type: 'website',
    locale: 'gl',
    url: 'https://jef.gal/',
    siteName: 'JEF Galicia',
  },
  twitter: {
    handle: '@jef_galicia',
    cardType: 'summary_large_image',
  },
};

export default config;