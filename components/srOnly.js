import React from "react";
import PropTypes from "prop-types";

export default class SrOnly extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  };

  static getDefaultProps = {
    children: null,
  };

  render() {
    return (
      <span className="sr-only">
        {this.props.children}
        <style jsx>
          {`
            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              border: 0;
            }
          `}
        </style>
      </span>
    );
  }
}
