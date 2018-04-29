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
          {/* <link rel="stylesheet" href="https://unpkg.com/antd@3.3.3/dist/antd.min.css" /> */}
          <link rel="stylesheet" href="static/antd.min.css" />
          <meta
            name="Description"
            content="Sparkalkylator för att beräkna ränta på ränta effekten. Se vad ett månadssparande kan ge för avkastning."
          />
          <meta name="theme-color" content="#0469ef" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
