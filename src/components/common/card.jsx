import React from "react";
import { PropTypes } from "prop-types";
import Loading from "./loader";

const Card = (props) => {
  const { borderColor, headerText, bodyColor, bodyText, isLoading } = props;

  return (
    <div className={`card form-group ${borderColor}`}>
      <div className="card-header">{headerText}</div>
      <div className={`card-body ${bodyColor}`}>
        <blockquote className="blockquote mb-0">
          {isLoading ? <Loading /> : <p> {bodyText} </p>}
        </blockquote>
      </div>
    </div>
  );
};

Card.propTypes = {
  borderColor: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  bodyColor: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Card;
