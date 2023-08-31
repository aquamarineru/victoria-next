import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children  }) {
    return (
        <div>
            <main role="main">
                {children}
            </main>
            <footer role="contentinfo">
                <Footer />
            </footer>
        </div>
    )

}