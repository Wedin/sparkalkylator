import Document, { Head, Main, NextScript } from "next/document";
// styled-jsx comes bundled with nextjs
import flush from "styled-jsx/server"; // eslint-disable-line

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html lang="sv">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://unpkg.com/antd@3.3.3/dist/antd.min.css" />
          <meta name="Description" content="Sparkalkylator med ränta på ränta effekten." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
