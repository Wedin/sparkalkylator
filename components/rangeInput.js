import React from 'react';
import PropTypes from 'prop-types';

export default class RangeInput extends React.Component {
  render() {
    return (
      <div className={this.props.className ? `${this.props.className} container` : 'container'}>
        <label htmlFor={(`${this.props.name}_range`, `${this.props.name}_number`)}>{this.props.label}</label>
        <input
          id={`${this.props.name}_range`}
          type="range"
          className="rangeInput"
          name={this.props.name}
          value={this.props.value}
          step={this.props.step}
          min={this.props.min}
          max={this.props.max}
          onChange={this.props.onChange}
        />
        <input
          id={`${this.props.name}_number`}
          type="number"
          className="text-input"
          name={this.props.name}
          value={this.props.value}
          placeholder={this.props.placeholder}
          step={this.props.step}
          onChange={this.props.onChange}
        />
        {this.props.labelAfter.length > 0 && <span className="after-label">{this.props.labelAfter}</span>}
        <span />
        <style jsx>{`
          .container {
            margin-top: 1.25rem;
            display: inline-flex;
            align-items: center;
            flex-wrap: wrap;
            width: 50%;
          }
          input {
            padding: 1rem;
            background-color: #f8f8f8;
            border: 1px solid #dfdfdf;
            border-radius: 2px;
            height: 50px;
            background-image: none;
            background-clip: padding-box;
            transition: background-color 0.25s ease;
            margin-top: 0.5rem;
            display: inline-block;
            font-size: 1rem;
          }
          .rangeInput {
            padding: 1rem 0;
            margin: 0.5rem 0 0 0;
            border: 0;
            width: calc(100% - 145px);
          }

          .text-input {
            margin-left: 1rem;
            max-width: 105px;
            padding-right: 0.5rem;
          }

          input:hover,
          input:focus {
            background-color: #eaeaea;
            outline: none;
          }

          label {
            display: block;
            width: 100%;
          }
          .after-label {
            padding: 1rem 0 1rem 0.375rem;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    );
  }
}

RangeInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  labelAfter: PropTypes.string
};

RangeInput.defaultProps = {
  className: '',
  placeholder: ''
};
