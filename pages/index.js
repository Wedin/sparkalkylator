import React from "react";
import Intro from "../components/intro";
import Layout from "../components/layout";
import SavingsCalculator from "../components/savingsCalculator/savingsCalculator";

export default class extends React.PureComponent {
  displayName = "Index";
  render() {
    return (
      <Layout title="Sparkalkylatorn - räkna på ränta på ränta">
        <Intro />
        <SavingsCalculator />
      </Layout>
    );
  }
}
