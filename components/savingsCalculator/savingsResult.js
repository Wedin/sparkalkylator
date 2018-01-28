import React from 'react';
import PropTypes from 'prop-types';
import { localeRounded } from '../../utils/numberUtils';

export default class SavingsResult extends React.Component {
  constructor(props) {
    super(props);
    this.hasValidResult = this.hasValidResult.bind(this);
  }

  hasValidResult() {
    return this.props.total > 0 && this.props.years > 0;
  }

  render() {
    if (!this.hasValidResult()) {
      return <div />;
    }
    const totalWithoutYield = this.props.total - this.props.totalYield;
    const formattedTotalWithoutYield = localeRounded(totalWithoutYield, 0);
    const formattedTotal = localeRounded(this.props.total, 0);

    return (
      <div className="wrapper">
        <h2>
          Efter {this.props.years} år har dina pengar ökat till <span className="total">{formattedTotal} kr.</span>
        </h2>
        <h3>
          Utan ränta-på-ränta hade du endast sparat ihop <span>{formattedTotalWithoutYield} kr.</span>
        </h3>
        <style jsx>
          {`
            .wrapper {
              box-shadow: 0 20px 40px rgba(37, 37, 100, 0.05), 0 10px 20px rgba(37, 37, 100, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
              width: 100%;
              padding: 1.25rem;
              max-width: 720px;
              margin: 40px auto 0;
              border-radius: 4px;
            }
            h2 {
              font-size: 1.5rem;
              margin: 0;
            }
            h3 {
              font-size: 1.15rem;
              margin: 20px 0 0;
            }
            .total {
              text-decoration: underline;
            }
          `}
        </style>
      </div>
    );
  }
}

SavingsResult.propTypes = {
  total: PropTypes.number.isRequired,
  totalYield: PropTypes.number.isRequired,
  years: PropTypes.string.isRequired,
};
