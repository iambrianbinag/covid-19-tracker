import React from "react";
import PropTypes from "prop-types";
import Loading from "../common/loader";

const Box = ({ textClass, data, title, isLoading }) => {
  return (
    <div className="text-center p-2 bg-light shadow rounded">
      <h2 className={`mb-0 mt-0 ${textClass}`}>
        {isLoading ? <Loading /> : data}
      </h2>
      <small>{title}</small>
    </div>
  );
};

Box.propTypes = {
  data: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  textClass: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Box;
