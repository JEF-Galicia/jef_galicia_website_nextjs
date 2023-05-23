import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getGlobalData } from '../utils/global-data';
import Layout, { GradientBackground } from '../components/Layout';
import { GlobalContext } from '../utils/context';
import { useContext, useState } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import SEO from '../next-seo.config';
import { GoogleAnalytics } from "nextjs-google-analytics";
import styles from './styles.scss';
import { DefaultSeo } from 'next-seo';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const [context, setContext] = useState({ name: 'JEF Galicia'});
  return (
    <span className="theme-jef_galicia" style={{ minHeight: '100vh' }}>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics trackPageViews />
      <GlobalContext.Provider value={{globalContext: context, setContext}}>
        <Navbar></Navbar>
        <Layout>
          <div className='mt-24 lg:mt-36'>
            <Component {...pageProps} />
          </div>
          <GradientBackground
            variant="large"
            className="fixed top-20 opacity-40 dark:opacity-60"
          />
          <GradientBackground
            variant="small"
            className="fixed bottom-0 opacity-30 dark:opacity-10"
          />
        </Layout>
        <Footer />
      </GlobalContext.Provider>
    </span>
  );
}

export default MyApp;
