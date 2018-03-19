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
    if (value <= min) {
      validatedValue = min;
    } else if (value >= max) {
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
      <div className="wrapper anim-2 fade-in">
        <form onSubmit={this.calculateResult} className="savings-calc">
          <h2 className="heading">Sparkalkylator</h2>
          <Row>
            <Col sm={24} md={12} className="slider-input">
              <RangeInput
                className="range-input-container"
                defaultValue={defaultValues.startCapital.value}
                formatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                label="Startkapital"
                max={defaultValues.startCapital.max}
                min={defaultValues.startCapital.min}
                name="startCapital"
                onChange={this.handleInputChange}
                parser={value => value.replace(/\$\s?|( *)/g, '').replace(/\D/g, '')}
                placeholder="10000"
                step={1000}
                tipFormatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                value={this.state.startCapital}
              />
            </Col>
            <Col sm={24} md={12} className="slider-input">
              <RangeInput
                className="range-input-container"
                defaultValue={defaultValues.monthlyDeposit.value}
                formatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                label="Sparbelopp per månad"
                max={defaultValues.monthlyDeposit.max}
                min={defaultValues.monthlyDeposit.min}
                name="monthlyDeposit"
                onChange={this.handleInputChange}
                parser={value => value.replace(/\$\s?|( *)/g, '').replace(/\D/g, '')}
                placeholder=""
                step={100}
                tipFormatter={value => `${value} kr`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                value={this.state.monthlyDeposit}
              />
            </Col>
            <Col sm={24} md={12} className="slider-input">
              <RangeInput
                className="range-input-container"
                defaultValue={defaultValues.interestRate.value}
                formatter={value => `${value} %`}
                label="Årsränta"
                max={defaultValues.interestRate.max}
                min={defaultValues.interestRate.min}
                name="interestRate"
                onChange={this.handleInputChange}
                parser={value => value.replace(/\D/g, '')}
                placeholder=""
                step={0.1}
                tipFormatter={value => `${value} %`}
                value={this.state.interestRate}
              />
            </Col>
            <Col sm={24} md={12} className="slider-input">
              <RangeInput
                className="range-input-container"
                defaultValue={defaultValues.savingsYears.value}
                formatter={value => `${value} år`}
                label="Spartid"
                max={defaultValues.savingsYears.max}
                min={defaultValues.savingsYears.min}
                name="savingsYears"
                onChange={this.handleInputChange}
                parser={value => value.replace(/\D/g, '')}
                placeholder=""
                step={1}
                tipFormatter={value => `${value} år`}
                value={this.state.savingsYears}
              />
            </Col>
            {/* <Button type="button" className="toggle-advanced as-link" label="Visa avancerade inställningar" onClick={this.setAdvanced} /> */}

            <div className="submit-container ant-col-sm-24">
              <Button type="submit" className="cta" label="Beräkna" onClick={this.onSubmit} />
            </div>
          </Row>
        </form>
        <SavingsResult total={total} totalYield={totalYield} years={this.state.savingsYears} />
        <SavingsGraph
          returnEachYear={Object.getOwnPropertyNames(this.state.graphResult).length > 0 ? this.state.graphResult.totals : []}
          startCapital={this.state.startCapital}
        />

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
