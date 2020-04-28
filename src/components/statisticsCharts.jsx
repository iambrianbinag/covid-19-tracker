import React from "react";
import { PropTypes } from "prop-types";
import OverallBreakDownChart from "./subcomponent/overallBreakDownChart";
import OutbreakTrendChart from "./subcomponent/outbreakTrendChart";

const StatisticsCharts = ({ data, dataTrend }) => {
  return (
    <div className="row">
      <div className="col-lg-6 mb-3">
        <div className="card text-center">
          <h5 className="card-header">Overall Breakdown</h5>
          <div className="card-body">
            <OverallBreakDownChart data={data} />
          </div>
        </div>
      </div>
      <div className="col-lg-6 mb-3">
        <div className="card text-center">
          <h5 className="card-header">Outbreak Trend Over Time</h5>
          <div className="card-body">
            <OutbreakTrendChart dataTrend={dataTrend} />
          </div>
        </div>
      </div>
    </div>
  );
};

StatisticsCharts.propTypes = {
  data: PropTypes.object.isRequired,
};

export default StatisticsCharts;
