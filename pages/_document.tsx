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
