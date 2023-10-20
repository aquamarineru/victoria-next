import Footer from './Footer';
import Social from './Social';
import Head from "next/head";
import BuyMeCoffee from './BuyMeCoffee';

const serializers = {
    types: {
        block: props => props.children.join('')
    }
  };
  
  function blockToPlainText(blockContent) {
    if (!blockContent || !Array.isArray(blockContent)) {
        return '';
    }
  
    return blockContent
        .map(block => {
            if (block._type === 'block') {
                return block.children
                    .map(child => child.text || '')
                    .join('');
            }
            return '';
        })
        .join('\n');
  }

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>EmpowerHer | Educational writer and editor </title>
            <meta name="title" content="EmpowerHer | Educational writer and editor" />
            <meta name="og:description" content="Welcome! I provide writing and editing services to people working in all sectors of education, and academic writing coaching to students and early career researchers." />
            <meta name="description" content="Welcome! I provide writing and editing services to people working in all sectors of education, and academic writing coaching to students and early career researchers." />
            <meta property="og:type" content="website" />
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