import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Particles from "./components/particles";
import Header from "./components/header";
import WorldTracker from "./components/worldTracker";
import StatisticsCharts from "./components/statisticsCharts";
import CountriesTable from "./components/countriesTable";
import CountryOutbreak from "./components/countryOutbreak";
import Footer from "./components/footer";
import http from "./services/httpService";
import utilities from "./services/utilities";
import "./App.css";

class App extends Component {
  state = {
    currentDateInMilliseconds: 0,
    overallData: {
      totalNewCases: 0,
      totalCases: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      fatalityRate: 0,
      recoveryRate: 0,
      worldInfectedRateInfo: {
        population: 7800000000,
        rate: 0,
      },
    },
    data: [
      {
        updated: "",
        country: "",
        countryInfo: {
          _id: 0,
          iso2: "",
          iso3: "",
          lat: 0,
          long: 0,
          flag: "",
        },
        cases: 0,
        todayCases: 0,
        deaths: 0,
        todayDeaths: 0,
        recovered: 0,
        active: 0,
        critical: 0,
        casesPerOneMillion: 0,
        deathsPerOneMillion: 0,
        tests: 0,
        testsPerOneMillion: 0,
        continent: "",
      },
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
    isLoading: true,
  };

  calculateOverallData(data) {
    let {
      totalNewCases,
      totalCases,
      totalDeaths,
      totalRecovered,
      fatalityRate,
      recoveryRate,
      worldInfectedRateInfo,
    } = {
      ...this.state.overallData,
    };

    data.forEach((country) => {
      totalNewCases += country.todayCases;
      totalCases += country.cases;
      totalDeaths += country.deaths;
      totalRecovered += country.recovered;
    });

    fatalityRate = utilities.calculatePercentage(totalDeaths, totalCases);
    recoveryRate = utilities.calculatePercentage(totalRecovered, totalCases);
    worldInfectedRateInfo.rate = utilities.calculatePercentage(
      totalCases,
      worldInfectedRateInfo.population
    );

    return {
      totalNewCases,
      totalCases,
      totalDeaths,
      totalRecovered,
      fatalityRate,
      recoveryRate,
      worldInfectedRateInfo,
    };
  }

  generateData(data, dataTrend) {
    const currentDateInMilliseconds = data[0].updated; // Set current updated date
    const overallData = this.calculateOverallData(data);

    this.setState({
      currentDateInMilliseconds,
      overallData,
      data,
      dataTrend,
      isLoading: false,
    });
  }

  async componentDidMount() {
    const result = await Promise.all([
      http.get("/countries?yesterday=true&sort=cases"),
      http.get("/historical?lastdays=98"),
    ]);

    this.generateData(result[0].data, result[1].data);
  }

  render() {
    const {
      currentDateInMilliseconds,
      overallData,
      data,
      dataTrend,
      isLoading,
    } = this.state;

    return (
      <div className="App">
        <div className="container">
          <Header date={currentDateInMilliseconds} />
          <hr />
          <WorldTracker data={overallData} isLoading={isLoading} />
          <StatisticsCharts data={overallData} dataTrend={dataTrend} />
          <CountriesTable data={data} />
          <CountryOutbreak data={data} isLoading={isLoading} />
          <Footer />
          <Particles />
        </div>
      </div>
    );
  }
}

export default App;
