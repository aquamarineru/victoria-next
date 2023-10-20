import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {
  
  return (
    <>
    <header role="banner">
      <Navbar/>
    </header>
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
    </>
  );
}

export default appWithTranslation(App);