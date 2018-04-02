import React from "react";
import PropTypes from "prop-types";
import { localeRounded } from "../../utils/numberUtils";

export default class extends React.Component {
  static propTypes = {
    resultPerYear: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        year: PropTypes.number,
        deposited: PropTypes.number,
      })
    ).isRequired,
  };
  displayName = "ResultYearsTable";

  constructor(props) {
    super(props);
    this.asdf = props; // DUMMY
  }

  render() {
    const listItems = this.props.resultPerYear.map(yearResult => (
      <li key={yearResult.value} className="list-year">
        <span>{yearResult.year}</span>
        <span>{localeRounded(Math.round(yearResult.value))}</span>
        <span>{localeRounded(Math.round(yearResult.deposited))}</span>
      </li>
    ));
    return (
      <div className="wrapper">
        <ul>{listItems}</ul>
        <style jsx>
          {`
            p {
              margin: 0;
            }
            .wrapper {
              max-width: 720px;
              margin: 0 auto;
            }
            .list-year {
              display: flex;
              justifycontent: center;
              alignitems: center;
            }
          `}
        </style>
      </div>
    );
  }
}
