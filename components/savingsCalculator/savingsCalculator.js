import React from 'react';
import Button from '../button';
import RangeInput from '../rangeInput';
import SavingsResult from './savingsResult';
import SavingsGraph from './savingsGraph';
import ResultYearsTable from './resultYearsTable';
import InterestCalculator from '../../interestCalculator/interestCalculator';

export default class extends React.Component {
  displayName = 'SavingsCalculator';
  constructor(props) {
    super(props);

    this.state = {
      startCapital: 10000,
      monthlyDeposit: 1000,
      interestRate: 8,
      savingsYears: '20',
      result: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.InterestCalculator = new InterestCalculator();
  }

  onSubmit(event) {
    event.preventDefault();
    this.calculateResult();
  }

  setAdvanced() {
    // TODO
  }

  calculateResult() {
    const data = {
      startCapital: this.state.startCapital,
      monthlyDeposit: this.state.monthlyDeposit,
      interestRate: this.state.interestRate,
      years: this.state.savingsYears,
    };
    const result = this.InterestCalculator.calculatePerYear(data);
    if (result.error) {
      return;
    }
    this.setState({
      result,
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [target.name]: value }, () => {
      this.calculateResult();
    });
  }

  render() {
    let total = 0;
    let totalYield = 0;

    if (Object.getOwnPropertyNames(this.state.result).length > 0 && this.state.result.totals.length) {
      const lastTotalResult = this.state.result.totals[this.state.result.totals.length - 1];
      total = lastTotalResult.value;
      totalYield = lastTotalResult.value - lastTotalResult.deposited;
    }

    return (
      <div className="wrapper">
        <form onSubmit={this.calculateResult} className="savings-calc">
          <h2 className="heading">Sparkalkylator</h2>

          <RangeInput
            className="range-input-container"
            name="startCapital"
            label="Startkapital"
            value={this.state.startCapital}
            onChange={this.handleInputChange}
            step={1000}
            placeholder="10000"
            labelAfter="Kr"
            min={0}
            max={200000}
          />

          <RangeInput
            className="range-input-container"
            name="monthlyDeposit"
            label="Sparbelopp per månad"
            value={this.state.monthlyDeposit}
            onChange={this.handleInputChange}
            placeholder=""
            labelAfter="Kr"
            step={100}
            min={0}
            max={15000}
          />

          <RangeInput
            className="range-input-container"
            name="interestRate"
            label="Årsränta (i %)"
            value={this.state.interestRate}
            onChange={this.handleInputChange}
            placeholder=""
            labelAfter="%"
            step={0.1}
            min={0}
            max={15}
          />

          <RangeInput
            className="range-input-container"
            name="savingsYears"
            label="Spartid i år"
            value={this.state.savingsYears}
            onChange={this.handleInputChange}
            placeholder=""
            labelAfter="Kr"
            step={1}
            min={1}
            max={50}
          />

          <Button type="button" className="toggle-advanced as-link" label="Visa avancerade inställningar" onClick={this.setAdvanced} />

          <div className="submit-container">
            <Button type="submit" className="cta" label="Beräkna" onClick={this.onSubmit} />
          </div>
        </form>
        <SavingsResult total={total} totalYield={totalYield} years={this.state.savingsYears} />
        <SavingsGraph returnEachYear={Object.getOwnPropertyNames(this.state.result).length > 0 ? this.state.result.totals : []} />
        <ResultYearsTable resultPerYear={Object.getOwnPropertyNames(this.state.result).length > 0 ? this.state.result.totals : []} />

        <style jsx>
          {`
            .savings-calc {
              box-shadow: 0 20px 40px rgba(37, 37, 100, 0.05), 0 10px 20px rgba(37, 37, 100, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
              width: 100%;
              min-height: 300px;
              padding: 1.25rem;
              max-width: 720px;
              margin: 50px auto 0;
              border-radius: 4px;
            }

            @media (min-width: 600px) {
              :global(.text-input + .text-input) {
                padding-left: 20px;
              }

              :global(.range-input-container:nth-child(odd)) {
                padding-left: 20px;
              }
            }

            .toggle-advanced {
              margin-top: 1rem;
              display: inline-block;
            }

            .heading {
              margin: 0 0 15px 0;
              font-size: 1.5rem;
            }

            .submit-container {
              margin-top: 1rem;
              text-align: center;
            }

            p {
              margin: 0;
            }
          `}
        </style>
      </div>
    );
  }
}
