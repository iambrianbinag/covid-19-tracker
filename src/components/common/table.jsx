import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Loading from "./loader";

class Table extends Component {
  state = {
    tableBreakPointAtSmallScreen: true,
  };

  addTableWidthBreakpoint = () => {
    let tableBreakPointAtSmallScreen = true;
    if (window.innerWidth > 440) {
      tableBreakPointAtSmallScreen = false;
    }

    this.setState({ tableBreakPointAtSmallScreen });
  };

  conditionalWrapperReturningClass(arrayOfCondition) {
    let resultClasses = "";
    arrayOfCondition.forEach((condition) => {
      resultClasses += condition.method(condition.parameters);
    });

    return resultClasses;
  }

  setIfColumnIsHidden({ hide, columnsHidden, column }) {
    return hide &&
      columnsHidden.find((hiddenColumn) => hiddenColumn === column.field)
      ? "d-none"
      : "";
  }

  componentDidMount() {
    window.addEventListener("resize", this.addTableWidthBreakpoint);
    window.addEventListener("load", this.addTableWidthBreakpoint);
  }

  render() {
    const { isLoading } = this.props;
    const {
      columns,
      rows,
      boldField,
      columnsHideInSmallScreen,
    } = this.props.data;
    const { columns: columnsHidden, hide } = columnsHideInSmallScreen;
    return (
      <div className="bg-white">
        <table
          className={`table table-sm table-striped table-hover ${
            this.state.tableBreakPointAtSmallScreen ? "table-responsive" : ""
          }`}
        >
          <caption>Total of {rows.length} record(s)</caption>
          <thead>
            <tr>
              {columns.map((column) => {
                return (
                  <th
                    className={this.conditionalWrapperReturningClass([
                      {
                        method: this.setIfColumnIsHidden,
                        parameters: { hide, columnsHidden, column },
                      },
                    ])}
                    key={column.field}
                  >
                    {column.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <Loading />
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      className={
                        this.conditionalWrapperReturningClass([
                          {
                            method: this.setIfColumnIsHidden,
                            parameters: { hide, columnsHidden, column },
                          },
                          {
                            method: ({ column, boldField }) =>
                              column.field === boldField
                                ? " font-weight-bold"
                                : "",
                            parameters: { column, boldField },
                          },
                        ])
                        // column.field === boldField ? "font-weight-bold" : ""
                      }
                      key={column.field}
                    >
                      {typeof row[column.field] === "object" ? (
                        <React.Fragment>
                          <img
                            style={{ width: "20px", height: "16px" }}
                            src={row[column.field].image}
                            alt="Flag"
                          ></img>{" "}
                          {row[column.field].name}
                        </React.Fragment>
                      ) : (
                        row[column.field]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Table;
