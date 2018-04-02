import React from "react";
import PropTypes from "prop-types";

export default class Button extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  static defaultProps = {
    className: "",
  };

  render() {
    return (
      <button className={`${this.props.className} button`} type={this.props.type} onClick={this.props.onClick}>
        {this.props.label}
        <style jsx>
          {`
            .button {
              display: inline-block;
              height: 50px;
              min-width: 250px;
              font-size: 0.8rem;
              border: 0;
              color: white;
              margin-top: 25px;
              border-radius: 2px;
              cursor: pointer;
              transition: transform 0.2s ease-out;
            }
            .button:hover {
              transform: translateY(-2px);
            }
            .button.primary {
            }
            .button.cta {
              background: #363636;
            }
            .button.as-link {
              background: white;
              color: #4772e5;
              transition: color 0.25s;
              min-width: 0;
            }
            .button.as-link:hover {
              color: #244291;
              transform: translateY(0);
            }
          `}
        </style>
      </button>
    );
  }
}
