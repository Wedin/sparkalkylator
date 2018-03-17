import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { localeRounded } from '../../utils/numberUtils';
import { formatCurrency } from '../../utils/formatCurrency';

export default class extends React.Component {
  static propTypes = {
    returnEachYear: PropTypes.array.isRequired,
  };

  displayName = 'Savings Graph';
  constructor(props) {
    super(props);
    this.state = {
      chartWidth: 775,
    };
  }

  componentDidMount() {
    this.setChartWidth();
    window.addEventListener('resize', this.setChartWidth.bind(this));
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.returnEachYear.length > 1;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setChartWidth.bind(this));
  }

  getFormattedData() {
    if (this.props.returnEachYear.length < 2) {
      return [];
    }

    // Remove year 0 from graph
    return this.props.returnEachYear.slice(1).map(result => ({
      name: `${result.year}`,
      year: result.year,
      value: Math.round(result.value),
      formatted: localeRounded(Math.round(result.value)),
      deposited: result.deposited,
    }));
  }

  getYearsAxis(data) {
    // Shorten when long range
    return data.map(v => v.year);
  }

  getDimentions() {
    const wrapperWidth = 820;
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

  setChartWidth() {
    const maxWidth = 775;
    const space = 20;
    let newWidth = maxWidth;

    if (window.screen.width < maxWidth) {
      newWidth = window.screen.width - space * 2;
    }

    this.setState({ chartWidth: newWidth });
  }

  render() {
    if (this.props.returnEachYear.length < 1) {
      return <div />;
    }

    const formattedData = this.getFormattedData();

    return (
      <div className="wrapper">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          padding={{ left: 90, right: 0, top: 25, bottom: 50 }}
          width={this.state.chartWidth}
          domain={{
            x: [0, formattedData.length],
            y: [0, formattedData[formattedData.length - 1].value],
          }}
          animate={{ duration: 250 }}
        >
          <VictoryAxis
            tickValues={this.getYearsAxis(formattedData)}
            style={{
              axisLabel: { fontSize: 12 },
              tickLabels: { fontSize: 12, padding: 5, angle: -50 },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={x => formatCurrency(x)}
            style={{
              axisLabel: { fontSize: 12 },
              tickLabels: { fontSize: 12, padding: 5 },
            }}
          />

          <VictoryBar
            data={formattedData}
            x="year"
            y="value"
            animate={{
              onLoad: { duration: 400 },
              onExit: {
                duration: 250,
                before: () => ({
                  _y: 0,
                  // fill: 'orange',
                }),
              },
            }}
          />
        </VictoryChart>

        <style jsx>
          {`
            .wrapper {
              margin: 25px auto 0 auto;
              width: ${this.state.chartWidth || 820}px;
            }
          `}
        </style>
      </div>
    );
  }
}
