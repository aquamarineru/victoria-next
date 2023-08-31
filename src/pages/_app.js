import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';

function App({ Component, pageProps }) {
  
  return (
    <>
    <header role="banner">
      <Navbar/>
    </header>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  );
}

export default appWithTranslation(App);