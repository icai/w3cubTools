import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
import { extractStyles } from "evergreen-ui";
import {
  StyleRegistry,
  useStyleRegistry,
  createStyleRegistry
} from "styled-jsx";

const registry = createStyleRegistry();

function Styles() {
  const styles = registry.styles(); // access styles
  // const registry = useStyleRegistry()
  // const styles = registry.styles()
  return <>{styles}</>;
}

interface DocumentProps {
  css: string;
  hydrationScript: React.ReactChild;
}

// https://github.com/vercel/next.js/blob/7b73f1137b21c7b1fb1612c3389caaaadd18da65/examples/with-styletron/pages/_document.js#L7



export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(context) {
    const renderPage = () =>
      context.renderPage({
        enhanceApp: App => props => (
          <StyleRegistry registry={registry}>
            <App {...props} />
          </StyleRegistry>
        )
      });

    const initialProps = await Document.getInitialProps({
      ...context,
      renderPage
    });
    const { css, hydrationScript } = extractStyles();
    return { ...initialProps, css, hydrationScript };
  }
  render() {
    const { css, hydrationScript, styles } = this.props;
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <Styles />
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
