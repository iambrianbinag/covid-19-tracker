import React, { Component } from "react";
import Card from "./common/card";
import Select from "./common/select";
import Chart from "./common/chart";
import { PropTypes } from "prop-types";
import utilities from "../services/utilities";
import http from "../services/httpService";
import { toast } from "react-toastify";

class CountryOutbreak extends Component {
  state = {
    data: [
      /* FORMAT */
      // {
      //   updated: "",
      //   country: "",
      //   countryInfo: {
      //     _id: 0,
      //     iso2: "",
      //     iso3: "",
      //     lat: 0,
      //     long: 0,
      //     flag: "",
      //   },
      //   cases: 0,
      //   todayCases: 0,
      //   deaths: 0,
      //   todayDeaths: 0,
      //   recovered: 0,
      //   active: 0,
      //   critical: 0,
      //   casesPerOneMillion: 0,
      //   deathsPerOneMillion: 0,
      //   tests: 0,
      //   testsPerOneMillion: 0,
      //   continent: "",
      // },
    ],
    dataTrend: [
      /* FORMAT */
      // {
      //   country: "",
      //   province: null,
      //   timeline: {
      //     cases: { "": 0 },
      //     deaths: { "": 0 },
      //     recovered: { "": 0 },
      //   },
      // },
    ],
    selectedCountryData: {
      country: "",
      countryInfo: {
        flag: "",
        iso2: "",
        iso3: "",
        lat: 0,
        long: 0,
        _id: 0,
        new: 0,
      },
      new: 0,
      total: 0,
      deaths: 0,
      recovered: 0,
      fatality: 0,
      recovery: 0,
    },
    optionsSelectCountries: [
      /* FORMAT */
      // {label:"", value: ""}
    ],
    selectedCountry: {
      country: "",
      countryInfo: {
        _id: 0,
        iso2: "",
        iso3: "",
        lat: 0,
        long: 0,
        flag: "",
      },
    },
    optionsChart: {
      chart: {
        type: "spline",
        height: 350,
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

  generateColumnForCard(
    borderColor,
    headerText,
    bodyColor,
    bodyText,
    isLoading
  ) {
    return (
      <div className="col-6 col-sm-6">
        <Card
          borderColor={borderColor}
          headerText={headerText}
          bodyColor={bodyColor}
          bodyText={bodyText}
          isLoading={isLoading}
        />
      </div>
    );
  }

  handleOnChange = ({ target }) => {
    const { data, optionsSelectCountries } = this.state;
    const selectedCountryIso2 = target.value;
    let isFound = false;
    for (let i = 0; i < optionsSelectCountries.length; i++) {
      if (optionsSelectCountries[i].value === selectedCountryIso2) {
        isFound = true;
        break;
      }
    }
    if (isFound) {
      // Find country name of selected country based on iso2
      const { country } = data.filter(
        (country) => country.countryInfo.iso2 === selectedCountryIso2
      )[0];

      const selectedCountry = {
        country: country,
        countryInfo: {
          flag: "",
          iso2: selectedCountryIso2,
          iso3: "",
          lat: 0,
          long: 0,
          _id: 0,
          new: 0,
        },
      };
      this.setState({ selectedCountry });
    } else {
      toast.error("Ooops something went wrong!");
    }
  };

  async fetchDataTrend(selectedCountry) {
    try {
      const { data } = await http.get(
        `/historical/${selectedCountry.countryInfo.iso2}?lastdays=98`
      );

      const cases = utilities.compressedTimelineDataForChart(
        [data],
        "cases",
        7
      );
      const deaths = utilities.compressedTimelineDataForChart(
        [data],
        "deaths",
        7
      );
      const recovered = utilities.compressedTimelineDataForChart(
        [data],
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
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(
          `${selectedCountry.country} outbreak trend could not found in the server`
        );
      }

      this.setState({
        optionsChart: {
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
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps === this.props &&
      prevState.selectedCountry.countryInfo.iso2 ===
        this.state.selectedCountry.countryInfo.iso2
    )
      return;

    const data = [...this.props.data];
    data.sort((a, b) => a.country.localeCompare(b.country)); // Sort Alphabetically

    let { selectedCountry } = this.state;

    let selectedCountryData = {};
    let optionsSelectCountries = [];

    selectedCountry =
      selectedCountry.countryInfo.iso2 === ""
        ? { country: data[0].country, countryInfo: data[0].countryInfo }
        : selectedCountry;

    // Find selected country in list of data
    data.forEach(
      ({ country, countryInfo, todayCases, cases, deaths, recovered }) => {
        // Check if selectedCountry is equal to the list of data
        if (countryInfo.iso2 === selectedCountry.countryInfo.iso2) {
          selectedCountryData = {
            country: country,
            countryInfo: countryInfo,
            new: todayCases,
            total: cases,
            deaths: deaths,
            recovered: recovered,
            fatality: utilities.calculatePercentage(deaths, cases),
            recovery: utilities.calculatePercentage(recovered, cases),
          };
        }

        // Populate optionsSelectCountries
        optionsSelectCountries.push({
          label: country,
          value: countryInfo.iso2,
        });
      }
    );

    this.setState({
      data,
      selectedCountryData,
      optionsSelectCountries,
    });

    // Fetch API
    this.fetchDataTrend(selectedCountry);
  }

  componentDidMount() {
    const { selectedCountry } = this.state;
    if (selectedCountry.countryInfo.iso2 === "") return;
    this.fetchDataTrend(selectedCountry);
  }

  render() {
    const { isLoading } = this.props;
    const {
      selectedCountryData,
      selectedCountry,
      optionsSelectCountries,
      optionsChart,
    } = this.state;
    const {
      country,
      countryInfo,
      new: newCases,
      total,
      deaths,
      recovered,
      fatality,
      recovery,
    } = selectedCountryData;

    return (
      <div className="mt-2 mb-5 pb-3">
        <hr />
        <h4 className="alert-heading d-inline bg-white">Select Country</h4>
        <div className="row mt-3">
          <div className="col-12 col-lg-4">
            <div className="form-group bg-white">
              <Select
                selectClassName="form-control"
                options={optionsSelectCountries}
                onChange={this.handleOnChange}
                selected={selectedCountry.countryInfo.iso2}
              />
            </div>
          </div>
          <div className="col-6"></div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-12 col-lg-4 text-center">
              <div className="row">
                {this.generateColumnForCard(
                  "border-info",
                  "New Case(s)",
                  "text-info",
                  newCases.toLocaleString(),
                  isLoading
                )}
                {this.generateColumnForCard(
                  "border-warning",
                  "Total Cases",
                  "text-warning",
                  total.toLocaleString(),
                  isLoading
                )}
              </div>
              <div className="row">
                {this.generateColumnForCard(
                  "border-danger",
                  "Deaths",
                  "text-danger",
                  deaths.toLocaleString(),
                  isLoading
                )}
                {this.generateColumnForCard(
                  "border-success",
                  "Recovered",
                  "text-success",
                  recovered.toLocaleString(),
                  isLoading
                )}
              </div>
              <div className="row">
                {this.generateColumnForCard(
                  "border-secondary",
                  "Fatality",
                  "text-danger",
                  fatality.toLocaleString() + "%",
                  isLoading
                )}
                {this.generateColumnForCard(
                  "border-secondary",
                  "Recovery",
                  "text-success",
                  recovery.toLocaleString() + "%",
                  isLoading
                )}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card text-center">
                <h5 className="card-header">
                  <img
                    style={{
                      width: "23px",
                      height: "15px",
                      marginBottom: "5px",
                    }}
                    src={countryInfo.flag}
                    alt="Flag"
                  ></img>
                  {` ${country} Outbreak Trend Over Time`}
                </h5>
                <div className="card-body">
                  <Chart isExportReporting options={optionsChart} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CountryOutbreak.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CountryOutbreak;
