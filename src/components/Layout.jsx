import Footer from './Footer';
import Navbar from './Navbar';
import Social from './Social';
import BuyMeCoffee from './BuyMeCoffee';

export default function Layout({ children  }) {
    return (
        <div className="flex flex-col min-h-screen">
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