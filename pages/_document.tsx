import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { extractStyles } from "evergreen-ui";
import flush from "styled-jsx/server";

interface DocumentProps {
  css: string;
  hydrationScript: React.ReactChild;
}

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const { renderPage } = ctx;
    const initialProps = await Document.getInitialProps(ctx);
    const page = renderPage();
    const styles = flush();
    const { css, hydrationScript } = extractStyles();

    return {
      ...initialProps,
      ...page,
      styles: (
        <>
          {styles}
          {initialProps.styles}
        </>
      ),
      css,
      hydrationScript
    };
  }

  render() {
    const { css, hydrationScript, styles } = this.props;
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          {/* <meta
            name="google-site-verification"
            content="bjJSOEahdert-7mwVScrwTTUVR3nSe0bEj5YjevUNn0"
          /> */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/site.webmanifest" />
          <meta
            property="og:title"
            content="W3cubTools | All Free, Collections of Tools For Developers and family"
          />
          <meta property="og:image" content="/static/logo.png" />
          <meta property="og:url" content="https://tools.w3cub.com" />
          <meta name="twitter:card" content="/static/logo.png" />
          <style dangerouslySetInnerHTML={{ __html: css }} />
          {styles || null}
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </html>
    );
  }
}
