import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-[tracking-id]" /> {/* Global Site Tag (gtag.js) - Google Analytics здесь нужно добавть id вот так G-1234567890*/}
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
            
          gtag('config', 'G-[tracking-id]');
          `} {/* Global Site Tag (gtag.js) - Google Analytics здесь нужно добавть id вот так G-1234567890*/}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
