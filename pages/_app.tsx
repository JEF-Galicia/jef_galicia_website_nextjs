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
import { GoogleAnalytics } from 'nextjs-google-analytics';
import styles from './styles.scss';
import { DefaultSeo } from 'next-seo';
config.autoAddCss = false;
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from 'react-cookie-consent';
import English from '../content/compiled-locales/en.json';
import Spanish from '../content/compiled-locales/es.json';
import Galician from '../content/compiled-locales/gl.json';
import { useRouter } from 'next/router';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { useMemo } from 'react';
import { GoogleDirectory } from '../api/client';

// getServerSideProps
export async function getServerSideProps() {
  const teams = await GoogleDirectory.groups.list({
    domain: 'teams.jef.gal',
  }).then((res) => res.data);

  const projects = await GoogleDirectory.groups.list({
    domain: 'projects.jef.gal',
  }).then((res) => res.data);

  return {
    props: {
      teams,
      projects,
    },
  };
}

function MyApp({ Component, pageProps, teams, projects }) {
  const [context, setContext] = useState({ name: 'JEF Galicia' });
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split('-') : ['en'];

  const messages = useMemo(() => {
    switch (shortLocale) {
      case 'en':
        return English;
      case 'es':
        return Spanish;
      case 'gl':
        return Galician;
      default:
        return Spanish;
    }
  }, [shortLocale]);

  return (
    <IntlProvider locale={shortLocale} messages={messages} onError={() => null}>
      <span className="theme-jef_galicia" style={{ minHeight: '100vh' }}>
        <DefaultSeo {...SEO} />
        {getCookieConsentValue() ? <GoogleAnalytics trackPageViews /> : <></>}
        <GlobalContext.Provider value={{ globalContext: context, setContext }}>
          <Navbar
            projects={projects}
            teams={teams}
          />
          <Layout>
            <main className="mt-24 lg:mt-36 min-w-full">
              <Component {...pageProps} />
            </main>
            <GradientBackground
              variant="large"
              className="fixed top-20 opacity-40 dark:opacity-60"
            />
            <GradientBackground
              variant="small"
              className="fixed bottom-0 opacity-30 dark:opacity-10"
            />
          </Layout>
          <CookieConsent
            location="bottom"
            disableButtonStyles
            disableStyles
            containerClasses="fixed flex w-full items-center justify-between flex-wrap p-6 backdrop-blur bg-white dark:bg-black bg-opacity-10 dark:bg-opacity-30 transition border-t border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50"
            buttonClasses="text-sm px-4 py-2 leading-none border rounded transition text-black border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30 hover:border-transparent hover:text-white hover:bg-primary mt-4 lg:mt-0"
            enableDeclineButton
            declineButtonText={
              <FormattedMessage defaultMessage="Non quero cookies 🙅‍♂️" />
            }
            declineButtonClasses="text-sm px-4 py-2 leading-none border rounded transition text-black border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30 hover:border-transparent hover:text-white hover:bg-primary mt-4 lg:mt-0 mr-4"
            buttonText={<FormattedMessage defaultMessage="Xenial! 😍" />}
            expires={150}
          >
            <FormattedMessage defaultMessage="Empregamos cookies para mellorar a túa experiencia de usuario 🪄" />
          </CookieConsent>
          <Footer />
        </GlobalContext.Provider>
      </span>
    </IntlProvider>
  );
}

export default MyApp;
