import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children, locale, menuData }) {
    return (
        <div>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )

}