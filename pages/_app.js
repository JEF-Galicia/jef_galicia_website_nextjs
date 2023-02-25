import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getGlobalData } from '../utils/global-data';
import Layout, { GradientBackground } from '../components/Layout';
import { GlobalContext } from '../utils/context';
import { useContext, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [context, setContext] = useState({ name: 'JEF Galicia', footerText: '© 2023. Todos os dereitos reservados.' });
  return (
    <span className="theme-jef_galicia" style={{ minHeight: '100vh' }}>
      <GlobalContext.Provider value={[context, useContext]}>
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
          className="absolute bottom-0 opacity-20 dark:opacity-10"
        />
        </Layout>
        <Footer />
      </GlobalContext.Provider>
    </span>
  );
}

export default MyApp;
