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
            formatter={this.props.formatter}
            max={this.props.max}
            min={this.props.min}
            onChange={this.onChange}
            parser={this.props.parser}
            step={this.props.step}
            tipFormatter={this.props.tipFormatter}
            value={this.props.value}
          />
        </Col>
        <Col span={7}>
          <InputNumber
            defaultValue={this.props.defaultValue}
            formatter={this.props.formatter}
            id={numberId}
            max={this.props.max}
            min={this.props.min}
            onChange={this.onChange}
            parser={this.props.parser}
            step={this.props.step}
            style={{ marginLeft: 10, width: '90%' }}
            value={this.props.value}
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
