import React, { Component } from "react";
import Chart from "../common/chart";
import utilities from "../../services/utilities";

class OutbreakTrendChart extends Component {
  state = {
    optionsChart: {
      chart: {
        type: "spline",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: [
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
          "0000-0-00",
        ],
      },
      yAxis: {
        title: {
          text: "Total",
        },
      },
      tooltip: {
        crosshairs: true,
        shared: true,
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: "#666666",
            lineWidth: 1,
          },
        },
      },
      series: [
        {
          name: "Cases",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Deaths",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Recovered",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    },
  };

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;

    const { dataTrend } = this.props;
    const cases = utilities.compressedTimelineDataForChart(
      dataTrend,
      "cases",
      7
    );
    const deaths = utilities.compressedTimelineDataForChart(
      dataTrend,
      "deaths",
      7
    );
    const recovered = utilities.compressedTimelineDataForChart(
      dataTrend,
      "recovered",
      7
    );

    const xAxis = { categories: cases.daysRange };
    const series = [
      { name: "Cases", data: cases.value },
      { name: "Deaths", data: deaths.value },
      { name: "Recovered", data: recovered.value },
    ];

    this.setState({ optionsChart: { xAxis, series } });
  }

  render() {
    return <Chart isExportReporting options={this.state.optionsChart} />;
  }
}

export default OutbreakTrendChart;
