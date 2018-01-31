import React from 'react';
import Layout from '../components/layout';

export default class extends React.PureComponent {
  displayName = 'about';
  render() {
    return (
      <Layout title="Sparkalkylatorn">
        <h1>about stuff</h1>
        <p>some text here</p>
      </Layout>
    );
  }
}
