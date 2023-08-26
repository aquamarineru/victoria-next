import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )

}