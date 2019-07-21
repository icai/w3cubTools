import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { extractStyles } from "evergreen-ui";

interface DocumentProps {
  css: string;
  hydrationScript: React.ReactChild;
}

function trackingScript() {
  // @ts-ignore
  if (window.dataLayer) return;
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    // @ts-ignore
    window.dataLayer.push(arguments);
  }
  // @ts-ignore
  gtag("js", new Date());

  // @ts-ignore
  gtag("config", "UA-71174418-1");
}

export default class MyDocument extends Document<DocumentProps> {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const { css, hydrationScript } = extractStyles();

    return {
      ...page,
      css,
      hydrationScript
    };
  }

  render() {
    const { css, hydrationScript } = this.props;

    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          {/* <meta
            name="google-site-verification"
            content="bjJSOEahdert-7mwVScrwTTUVR3nSe0bEj5YjevUNn0"
          /> */}
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />

          {!__DEV__ && (
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-71174418-1"
            />
          )}
          <script>
            <>{!__DEV__ && IN_BROWSER && trackingScript()}</>
          </script>
        </body>
      </html>
    );
  }
}
