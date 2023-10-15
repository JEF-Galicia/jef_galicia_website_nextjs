import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import 'prismjs/themes/prism-tomorrow.css';
import { useMemo, useState } from 'react';
import CookieConsent, {
  getCookieConsentValue
} from 'react-cookie-consent';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { GoogleDirectory } from '../api/client';
import Footer from '../components/Footer';
import Layout, { GradientBackground } from '../components/Layout';
import Navbar from '../components/Navbar';
import English from '../content/compiled-locales/en.json';
import Spanish from '../content/compiled-locales/es.json';
import Galician from '../content/compiled-locales/gl.json';
import SEO from '../next-seo.config';
import '../styles/globals.css';
import { GlobalContext } from '../utils/context';
config.autoAddCss = false;

export async function getInitialProps() {
  /*const teams = await GoogleDirectory.groups.list({
    domain: 'teams.jef.gal',
  }).then((res) => res.data).catch(() => ({
    groups: []
  }));

  const projects = await GoogleDirectory.groups.list({
    domain: 'projects.jef.gal',
  }).then((res) => res.data).catch(() => ({
    groups: []
  }));*/

  const teams = {
    groups: []
  };

  const projects = {
    groups: []
  };

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
            teams={teams ?? { groups: [] }}
            projects={projects ?? { groups: [] }}
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
