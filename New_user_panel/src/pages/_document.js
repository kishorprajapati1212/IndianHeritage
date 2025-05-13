import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link
            rel="preload"
            href="/just_test/Hpage.mp4"   
            as="video"
            type="video/mp4"  
            crossorigin="anonymous"  
          />
        </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
