import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
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
      <Html>
        <Head>
          <meta charSet="utf-8" />
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
          <style dangerouslySetInnerHTML={{ __html: css }} />
          {styles || null}
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </Html>
    );
  }
}
