import React from 'react';
import { Row, Col } from 'antd';
import Button from '../button';
import RangeInput from '../ant/rangeInput';
import SavingsResult from './savingsResult';
import SavingsGraph from './savingsGraph';
import InterestCalculator from '../../interestCalculator/interestCalculator';

const defaultValues = {
  startCapital: { value: 10000, min: 0, max: 200000 },
  monthlyDeposit: { value: 1000, min: 0, max: 15000 },
  interestRate: { value: 8, min: 0, max: 20 },
  savingsYears: { value: 20, min: 1, max: 50 },
};

export default class extends React.Component {
  displayName = 'SavingsCalculator';
  constructor(props) {
    super(props);

    this.state = {
      startCapital: defaultValues.startCapital.value,
      monthlyDeposit: defaultValues.monthlyDeposit.value,
      interestRate: defaultValues.interestRate.value,
      savingsYears: defaultValues.savingsYears.value,
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
      }, 250);
    }
    const res = full ? { result, graphResult: result } : { result };
    this.setState(res);
  }

  handleInputChange({ name, value }) {
    const { min, max, value: defaultValue } = defaultValues[name];
    let validatedValue = value || defaultValue;
    if (value < min) {
      validatedValue = min;
    } else if (value > max) {
      validatedValue = max;
    }
    this.setState({ [name]: validatedValue }, () => {
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
            <Col sm={24} md={12} className="slider-input">
              <RangeInput
                className="range-input-container"
                name="startCapital"
                label="Startkapital"
                value={this.state.startCapital}
                defaultValue={defaultValues.startCapital.value}
                onChange={this.handleInputChange}
                step={1000}
                placeholder="10000"
                min={defaultValues.startCapital.min}
                max={defaultValues.startCapital.max}
                formatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                parser={value => value.replace(/\$\s?|( *)/g, '').replace(/\D/g, '')}
                tipFormatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
              />
            </Col>
            <Col sm={24} md={12} className="slider-input">
              <RangeInput
                className="range-input-container"
                name="monthlyDeposit"
                label="Sparbelopp per månad"
                value={this.state.monthlyDeposit}
                defaultValue={defaultValues.monthlyDeposit.value}
                onChange={this.handleInputChange}
                placeholder=""
                step={100}
                min={defaultValues.monthlyDeposit.min}
                max={defaultValues.monthlyDeposit.max}
                formatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                parser={value => value.replace(/\$\s?|( *)/g, '').replace(/\D/g, '')}
                tipFormatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
              />
            </Col>
            <Col sm={24} md={12} className="slider-input">
              <RangeInput
                className="range-input-container"
                name="interestRate"
                label="Årsränta"
                value={this.state.interestRate}
                defaultValue={defaultValues.interestRate.value}
                onChange={this.handleInputChange}
                placeholder=""
                step={0.1}
                min={defaultValues.interestRate.min}
                max={defaultValues.interestRate.max}
                formatter={value => `${value} %`}
                parser={value => value.replace(/\D/g, '')}
                tipFormatter={value => `${value} %`}
              />
            </Col>
            <Col sm={24} md={12} className="slider-input">
              <RangeInput
                className="range-input-container"
                name="savingsYears"
                label="Spartid"
                value={this.state.savingsYears}
                defaultValue={defaultValues.savingsYears.value}
                onChange={this.handleInputChange}
                placeholder=""
                step={1}
                min={defaultValues.savingsYears.min}
                max={defaultValues.savingsYears.max}
                formatter={value => `${value} år`}
                parser={value => value.replace(/\D/g, '')}
                tipFormatter={value => `${value} år`}
              />
            </Col>
            {/* <Button type="button" className="toggle-advanced as-link" label="Visa avancerade inställningar" onClick={this.setAdvanced} /> */}

            <div className="submit-container ant-col-sm-24">
              <Button type="submit" className="cta" label="Beräkna" onClick={this.onSubmit} />
            </div>
          </Row>
        </form>
        <SavingsResult total={total} totalYield={totalYield} years={this.state.savingsYears} />
        <SavingsGraph returnEachYear={Object.getOwnPropertyNames(this.state.graphResult).length > 0 ? this.state.graphResult.totals : []} />

        <style jsx>
          {`
            .savings-calc {
              width: 100%;
              min-height: 300px;
              padding: 16px;
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
              margin-top: 15px;
              text-align: center;
            }

            p {
              margin: 0;
            }
          `}
        </style>
        <style jsx global>
          {`
            .slider-input {
              margin-top: 24px;
              display: flex;
            }
          `}
        </style>
      </div>
    );
  }
}
