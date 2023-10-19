import Footer from './Footer';
import Social from './Social';
import Head from "next/head";
import BuyMeCoffee from './BuyMeCoffee';

export default function Layout({ children  }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                
            </Head>
            <main role="main" className="flex-grow">
                {children}
                <Social />
                <BuyMeCoffee />
            </main>
            <footer role="contentinfo">
                <Footer />
            </footer>
        </div>
    )
}