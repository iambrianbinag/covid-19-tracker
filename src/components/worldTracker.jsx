import React from "react";
import Box from "./subcomponent/box";

const WorldTracker = ({ data, isLoading }) => {
  const {
    totalNewCases,
    totalCases,
    totalDeaths,
    totalRecovered,
    fatalityRate,
    recoveryRate,
    worldInfectedRateInfo,
  } = data;

  return (
    <div>
      <h4 className="mt-4 mb-3 text-center">
        <span className="bg-white">Worldwide Status</span>
      </h4>
      <div className="alert alert-secondary" role="alert">
        <div className="row mt-5 mb-3">
          <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
            <Box
              data={totalNewCases.toLocaleString()}
              title="New"
              textClass="text-info"
              isLoading={isLoading}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
            <Box
              data={totalCases.toLocaleString()}
              title="Cases"
              textClass="text-primary"
              isLoading={isLoading}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
            <Box
              data={totalDeaths.toLocaleString()}
              title="Deaths"
              textClass="text-secondary"
              isLoading={isLoading}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
            <Box
              data={totalRecovered.toLocaleString()}
              title="Recovered"
              textClass="text-success"
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="row mt-3 mb-4">
          <div className="col-md-12 col-lg-6 mb-3">
            <Box
              data={`${fatalityRate}%`}
              title="Fatality Rate"
              textClass="text-secondary"
              isLoading={isLoading}
            />
          </div>
          <div className="col-md-12 col-lg-6 mb-3">
            <Box
              data={`${recoveryRate}%`}
              title="Recovery Rate"
              textClass="text-success"
              isLoading={isLoading}
            />
          </div>
        </div>
        <hr />
        <p className="mb-0 mt-0 text-center">
          <small>
            Estimated Population:{" "}
            <strong>{`${worldInfectedRateInfo.population.toLocaleString()} (${
              worldInfectedRateInfo.rate
            }% Infected)`}</strong>{" "}
            Billion People
          </small>
        </p>
      </div>
    </div>
  );
};

export default WorldTracker;
