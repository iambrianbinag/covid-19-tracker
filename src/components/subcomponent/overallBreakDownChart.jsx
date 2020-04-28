import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Chart from "../common/chart";

class OverallBreakDownChart extends Component {
  state = {
    optionsChart: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: "Total",
          colorByPoint: true,
          data: [
            {
              name: "Cases",
              y: 0,
              sliced: true,
              selected: true,
            },
            {
              name: "Deaths",
              y: 0,
            },
            {
              name: "Recovered",
              y: 0,
            },
          ],
        },
      ],
    },
  };

  generateSeriesData({ totalCases, totalDeaths, totalRecovered }) {
    return [
      {
        name: "Total",
        colorByPoint: true,
        data: [
          {
            name: "Cases",
            y: totalCases,
            sliced: true,
            selected: true,
          },
          {
            name: "Deaths",
            y: totalDeaths,
          },
          {
            name: "Recovered",
            y: totalRecovered,
          },
        ],
      },
    ];
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      const series = this.generateSeriesData(data);
      this.setState({ optionsChart: { series } });
    }
  }

  componentDidMount() {
    const series = this.generateSeriesData(this.props.data);
    this.setState({ optionsChart: { series } });
  }

  render() {
    return <Chart isExportReporting options={this.state.optionsChart} />;
  }
}

OverallBreakDownChart.propTypes = {
  data: PropTypes.object.isRequired,
};
export default OverallBreakDownChart;
