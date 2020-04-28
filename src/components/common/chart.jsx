import React from "react";
import { PropTypes } from "prop-types";
import Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

Highcharts.setOptions({
  //Allow commas in numbers
  lang: {
    thousandsSep: ",",
  },
});

const Chart = ({ isExportReporting, options, ...rest }) => {
  if (isExportReporting) {
    HC_exporting(Highcharts); // Enable printing/downloading and viewing of chart
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={options} {...rest} />
  );
};

Chart.prototype = {
  isExportReporting: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
};

export default Chart;
