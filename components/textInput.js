import React from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const eventCopy = event;
    eventCopy.target.value = event.target.value.replace(/\s/g, '');
    this.props.onChange(eventCopy);
  }

  render() {
    return (
      <div className={this.props.className ? `${this.props.className} container` : 'container'}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          id={this.props.name}
          type="number"
          name={this.props.name}
          value={this.props.value}
          placeholder={this.props.placeholder}
          step={this.props.step}
          onChange={this.onChange}
        />
        <style jsx>{`
          .container {
            margin-top: 20px;
            display: inline-block;
            width: 50%;
          }
          input {
            padding: 14px;
            height: 50px;
            background-color: #f8f8f8;
            border: 1px solid #dfdfdf;
            border-radius: 2px;
            background-image: none;
            background-clip: padding-box;
            transition: background-color 0.25s ease;
            margin-top: 7px;
            display: block;
            font-size: 1rem;
            min-width: 220px;
            width: 100%;
          }

          input:hover,
          input:focus {
            background-color: #eaeaea;
            outline: none;
          }

          label {
            display: inline-block;
          }
        `}</style>
      </div>
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  placeholder: PropTypes.string
};

TextInput.defaultProps = {
  className: '',
  placeholder: ''
};
