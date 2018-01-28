import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { localeRounded } from '../../utils/numberUtils';

export default class extends React.Component {
  static propTypes = {
    returnEachYear: PropTypes.array.isRequired,
  };

  displayName = 'Savings Graph';

  shouldComponentUpdate(nextProps) {
    return nextProps.returnEachYear.length > 1;
  }

  getFormattedData() {
    if (this.props.returnEachYear.length < 1) {
      return [];
    }
    return this.props.returnEachYear.map(result => ({
      name: `${result.year}`,
      Värde: Math.round(result.value),
      formatted: localeRounded(Math.round(result.value)),
      Inbetalt: result.deposited,
    }));
  }

  getDimentions() {
    const wrapperWidth = 720;
    const oneSidePadding = 25;
    let width = 0;
    let height = 0;
    if (window.screen.width < wrapperWidth) {
      width = window.screen.width - oneSidePadding;
    } else {
      width = wrapperWidth - 2 * oneSidePadding;
    }
    height = width * 9 / 16;

    return { width, height };
  }

  render() {
    if (this.props.returnEachYear.length < 1) {
      return <div />;
    }

    const formattedData = this.getFormattedData();

    const dimensions = this.getDimentions();

    return (
      <div className="wrapper">
        <LineChart
          width={dimensions.width}
          height={dimensions.height}
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {' '}
          <XAxis dataKey="name" />
          <YAxis dataKey="Värde" name="formatted" tickLine={false} interval="preserveEnd" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Värde" stroke="#784BA0" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="Inbetalt" stroke="#3B6F57" dot={false} />
        </LineChart>

        <style jsx>
          {`
            .wrapper {
              margin-top: 50px;
              display: flex;
              justify-content: center;
            }
          `}
        </style>
      </div>
    );
  }
}
