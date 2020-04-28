import React from "react";
import logo from "../img/coronavirus.png";
import moment from "moment";
import { PropTypes } from "prop-types";

const Header = ({ currentDateInMilliseconds }) => {
  return (
    <div className="text-center mt-4 mb-4">
      <div className="d-inline-block bg-white">
        <h3>
          C<img src={logo} alt="o" style={{ width: "20px", height: "20px" }} />
          vid-19 Tracker
        </h3>
        <p>
          Result as of{" "}
          <span className="badge badge-info font-weight-bold">
            {moment(currentDateInMilliseconds).format("ddd, MMM D YYYY")}
          </span>
        </p>
      </div>
    </div>
  );
};

Header.propTypes = {
  date: PropTypes.number.isRequired,
};

export default Header;
