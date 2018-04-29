import React from "react";
import Intro from "../components/intro";
import Layout from "../components/layout";
import SavingsCalculator from "../components/savingsCalculator/savingsCalculator";

class Index extends React.PureComponent {
  render() {
    return (
      <Layout title="Sparkalkylatorn - räkna på ränta på ränta">
        <Intro />
        <SavingsCalculator />
      </Layout>
    );
  }
}

export default Index;
