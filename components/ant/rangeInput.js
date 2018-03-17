import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber, Col } from 'antd';

export default class RangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.onChange({ name: this.props.name, value });
  }
  render() {
    const numberId = `${this.props.name}_number`;
    return (
      <label className="container" htmlFor={numberId}>
        <div className="label">{this.props.label}</div>
        <Col span={16}>
          <Slider
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            onChange={this.onChange}
            value={this.props.value}
            formatter={this.props.formatter}
            parser={this.props.parser}
            tipFormatter={this.props.tipFormatter}
          />
        </Col>
        <Col span={7}>
          <InputNumber
            id={numberId}
            min={this.props.min}
            defaultValue={this.props.defaultValue}
            max={this.props.max}
            step={this.props.step}
            style={{ marginLeft: 10, width: '90%' }}
            value={this.props.value}
            onChange={this.onChange}
            formatter={this.props.formatter}
            parser={this.props.parser}
          />
        </Col>

        <style jsx>
          {`
            .container {
              width: 100%;
            }
            .label {
              margin-left: 6px;
              display: block;
            }
          `}
        </style>
      </label>
    );
  }
}

RangeInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  defaultValue: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  formatter: PropTypes.func.isRequired,
  parser: PropTypes.func.isRequired,
  tipFormatter: PropTypes.func,
};

RangeInput.defaultProps = {
  tipFormatter: null,
};
