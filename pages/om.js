import React from 'react';
import Layout from '../components/layout';

export default class extends React.PureComponent {
  displayName = 'about';
  render() {
    return (
      <Layout title="Sparkalkylatorn">
        <div className="wrapper anim-1 fade-in">
          <h1>About stuff</h1>
          <p>some text here</p>
        </div>
        <style jsx>
          {`
            .wrapper {
              margin: 40px auto 0 auto;
            }
            @media (max-width: 840px) {
              .wrapper {
                padding: 0 16px;
              }
            }

            @media (min-width: 576px) {
              .wrapper {
                max-width: 820px;
              }
            }
          `}
        </style>
      </Layout>
    );
  }
}
