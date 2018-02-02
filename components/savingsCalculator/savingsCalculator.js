import React from 'react';
import Button from '../button';
import RangeInput from '../ant/rangeInput';
import SavingsResult from './savingsResult';
import SavingsGraph from './savingsGraph';
import ResultYearsTable from './resultYearsTable';
import InterestCalculator from '../../interestCalculator/interestCalculator';
import { Row, Col } from 'antd';

export default class extends React.Component {
  displayName = 'SavingsCalculator';
  constructor(props) {
    super(props);

    this.state = {
      startCapital: 10000,
      monthlyDeposit: 1000,
      interestRate: 8,
      savingsYears: 20,
      result: {},
      graphResult: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.InterestCalculator = new InterestCalculator();
    this.graphTimeout = undefined;
  }

  onSubmit(event) {
    event.preventDefault();
    this.calculateResult(true);
  }

  setAdvanced() {
    // TODO
  }

  calculateResult(full) {
    const data = {
      startCapital: this.state.startCapital,
      monthlyDeposit: this.state.monthlyDeposit,
      interestRate: this.state.interestRate,
      years: this.state.savingsYears,
    };
    const result = this.InterestCalculator.calculatePerYear(data);

    if (result.error) {
      // TODO
      return;
    }
    if (full) {
      clearTimeout(this.graphTimeout);
    } else {
      clearTimeout(this.graphTimeout);
      this.graphTimeout = setTimeout(() => {
        this.setState({ graphResult: this.state.result });
      }, 500);
    }
    const res = full ? { result, graphResult: result } : { result };
    this.setState(res);
  }

  handleInputChange({ name, value }) {
    this.setState({ [name]: value }, () => {
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
          <Row>
            <Col sm={24} md={12} className="test123">
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
                formatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                parser={value => value.replace(/\$\s?|( *)/g, '').replace(' kr', '')}
              />
            </Col>
            <Col sm={24} md={12} className="test123">
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
                formatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                parser={value => value.replace(/\$\s?|( *)/g, '').replace(' kr', '')}
              />
            </Col>
            <Col sm={24} md={12} className="test123">
              <RangeInput
                className="range-input-container"
                name="interestRate"
                label="Årsränta (i %)"
                value={this.state.interestRate}
                onChange={this.handleInputChange}
                placeholder=""
                labelAfter=""
                step={0.1}
                min={0}
                max={15}
                formatter={value => `${value} %`}
                parser={value => value.replace(' %', '')}
              />
            </Col>
            <Col sm={24} md={12} className="test123">
              <RangeInput
                className="range-input-container"
                name="savingsYears"
                label="Spartid i år"
                value={this.state.savingsYears}
                onChange={this.handleInputChange}
                placeholder=""
                labelAfter=""
                step={1}
                min={1}
                max={50}
                formatter={value => `${value} år`}
                parser={value => value.replace(' år', '')}
              />
            </Col>
            <Button type="button" className="toggle-advanced as-link" label="Visa avancerade inställningar" onClick={this.setAdvanced} />

            <div className="submit-container">
              <Button type="submit" className="cta" label="Beräkna" onClick={this.onSubmit} />
            </div>
          </Row>
        </form>
        <SavingsResult total={total} totalYield={totalYield} years={this.state.savingsYears} />
        <SavingsGraph returnEachYear={Object.getOwnPropertyNames(this.state.graphResult).length > 0 ? this.state.graphResult.totals : []} />
        <ResultYearsTable
          resultPerYear={Object.getOwnPropertyNames(this.state.graphResult).length > 0 ? this.state.graphResult.totals : []}
        />

        <style jsx>
          {`
            .savings-calc {
              width: 100%;
              min-height: 300px;
              padding: 1.25rem;
              max-width: 820px;
              margin: 50px auto 0;
              border-radius: 4px;
              border: 1px solid #ddd;
            }

            .toggle-advanced {
              margin-top: 1rem;
              display: inline-block;
            }

            .heading {
              margin: 0 0 16px 0;
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
        <style jsx global>
          {`
            .test123 {
              margin-top: 16px;
            }
          `}
        </style>
      </div>
    );
  }
}
