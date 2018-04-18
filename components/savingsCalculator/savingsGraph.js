import React from "react";
import PropTypes from "prop-types";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryVoronoiContainer, VictoryTooltip } from "victory";
import { localeRounded } from "../../utils/numberUtils";
import formatCurrency from "../../utils/formatCurrency";

const getYearsAxis = data => {
  // Shorten when long range
  data.map(v => v.year);
};

export default class extends React.Component {
  static propTypes = {
    startCapital: PropTypes.number,
    returnEachYear: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    startCapital: 0,
  };

  displayName = "Savings Graph";

  getFormattedReturnPerYear() {
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
      yield: Math.round(result.value - result.deposited),
    }));
  }

  getFormattedStartCapital() {
    const startObj = {
      startCapital: this.props.startCapital,
      formattedStartCapital: localeRounded(Math.round(this.props.startCapital)),
    };

    const arr = Array(this.props.returnEachYear.length - 1).fill(0);
    return arr.map((_val, i) => ({ ...startObj, year: i + 1 }));
  }

  render() {
    if (this.props.returnEachYear.length < 1) {
      return <div />;
    }

    const formattedData = this.getFormattedReturnPerYear();

    return (
      <div className="wrapper fade-in">
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={(point, index, points) => {
                if (index === 0) {
                  const pointToUse = points[1];
                  return `Värdeökning: ${localeRounded(Math.round(pointToUse.yield))} kr`;
                } else if (index === 1) {
                  return `Insatt: ${localeRounded(Math.round(point.deposited))} kr`;
                } else if (index === 2) {
                  const pointToUse = points[0];
                  return `Startkapital: ${localeRounded(Math.round(pointToUse.startCapital))} kr`;
                }
                return "";
              }}
              labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />}
            />
          }
          domainPadding={20}
          padding={{ left: 90, right: 0, top: 25, bottom: 50 }}
          width={775}
          domain={{
            x: [0, formattedData.length],
            y: [0, formattedData[formattedData.length - 1].value],
          }}
          animate={{
            duration: 250,
          }}
        >
          <VictoryAxis
            tickValues={getYearsAxis(formattedData)}
            style={{
              axisLabel: { fontSize: 12 },
              tickLabels: { fontSize: 12, padding: 5, angle: -50 },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={x => formatCurrency.formatCurrency(x)}
            style={{
              axisLabel: { fontSize: 12 },
              tickLabels: { fontSize: 12, padding: 5 },
            }}
          />

          <VictoryStack
            colorScale="qualitative"
            animate={{
              onLoad: { duration: 400 },
              onExit: {
                duration: 250,
                before: () => ({
                  _y: 0,
                }),
              },
            }}
          >
            {this.props.startCapital > 0 && <VictoryBar data={this.getFormattedStartCapital()} x="year" y="startCapital" />}
            <VictoryBar data={formattedData} x="year" y="deposited" />
            <VictoryBar data={formattedData} x="year" y="yield" />
          </VictoryStack>
        </VictoryChart>

        <style jsx>
          {`
            .wrapper {
              margin: 25px auto 0 auto;
              max-width: 820px;
              padding: 0 10px;
            }
          `}
        </style>
      </div>
    );
  }
}
