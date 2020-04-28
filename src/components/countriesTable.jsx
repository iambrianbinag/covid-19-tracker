import React, { Component } from "react";
import Table from "./common/table";
import Select from "./common/select";
import Utilities from "../services/utilities";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CountriesTable extends Component {
  state = {
    data: {
      columns: [
        {
          label: "Number",
          field: "number",
          image: true,
        },
        {
          label: "Country",
          field: "country",
        },
        {
          label: "New",
          field: "new",
        },
        {
          label: "Total",
          field: "total",
        },
        {
          label: "Deaths",
          field: "deaths",
        },
        {
          label: "Recovered",
          field: "recovered",
        },
        {
          label: "Fatality",
          field: "fatality",
        },
        {
          label: "Recovery",
          field: "recovery",
        },
      ],
      columnsHideInSmallScreen: {
        columns: ["new", "fatality", "recovery"],
        hide: false,
      },
      boldField: "number",
      rows: [
        /* FORMAT */
        // {
        //   number: 0,
        //   country: { name: "", image: "" },
        //   new: 0,
        //   total: 0,
        //   deaths: 0,
        //   recovered: 0,
        //   fatality: 0,
        //   recovery: 0,
        // },
      ],
    },
    selectOptions: [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 30, value: 30 },
      { label: 40, value: 40 },
      { label: 50, value: 50 },
    ],
    selectedOption: 5,
  };

  updateTableColumnsOnResize = () => {
    const { data } = this.state;
    if (window.innerWidth <= 768) {
      data.columnsHideInSmallScreen.hide = true;
    } else {
      data.columnsHideInSmallScreen.hide = false;
    }

    this.setState({ data });
  };

  formatRows(_data) {
    const { data, selectedOption } = this.state;
    const rows = [];

    _data.forEach((_country, index) => {
      if (index >= selectedOption) {
        return;
      }

      const {
        country,
        countryInfo,
        todayCases,
        cases,
        deaths,
        recovered,
      } = _country;
      rows.push({
        number: index + 1,
        country: { name: country, image: countryInfo.flag },
        new: todayCases.toLocaleString(),
        total: cases.toLocaleString(),
        deaths: deaths.toLocaleString(),
        recovered: recovered.toLocaleString(),
        fatality: Utilities.calculatePercentage(deaths, cases) + "%",
        recovery: Utilities.calculatePercentage(recovered, cases) + "%",
      });
    });
    data.rows = rows;
    this.setState({ data });
  }

  handleOnChange = ({ target }) => {
    const selectOptions = this.state.selectOptions;
    const selectedValue = parseInt(target.value);

    let isFound = false;
    for (let i = 0; i < selectOptions.length; i++) {
      isFound = selectOptions[i].value === selectedValue;
      if (isFound) break;
    }

    if (isFound) {
      this.setState({ selectedOption: selectedValue });
    } else {
      toast.error("Ooops something went wrong!");
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps !== this.props ||
      prevState.selectedOption !== this.state.selectedOption
    ) {
      this.formatRows(this.props.data);
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateTableColumnsOnResize);
    window.addEventListener("load", this.updateTableColumnsOnResize);
  }

  render() {
    const { data, selectOptions, selectedOption } = this.state;
    return (
      <div className="mt-2">
        <h4 className="alert-heading d-inline bg-white">
          Top {selectedOption} Countries
        </h4>
        <div className="row mb-4 mt-4">
          <div className="col-md-2 w-50">
            <Select
              onChange={this.handleOnChange}
              selectClassName="form-control bg-white"
              options={selectOptions}
              selected={selectedOption}
            />
          </div>
        </div>
        <Table data={data} isLoading={false} />
      </div>
    );
  }
}

export default CountriesTable;
