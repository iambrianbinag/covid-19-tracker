import React from "react";
import moment from "moment";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "70px",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <div className="container">
        <hr className="mt-0" />
      </div>
      <p className="text-muted text-center">
        <small>
          Data from Worldometers and Johns Hopkins University &copy;{" "}
          <a
            className="text-muted"
            rel="noopener noreferrer"
            href="https://mutedfaith.github.io/portfolio"
            target="_blank"
          >
            Brian Binag
          </a>{" "}
          {moment().format("YYYY")}
          {` v${process.env.REACT_APP_PROJECT_VERSION}`}
          <br />
          <small>(Data updated every 10 minutes)</small>
        </small>
      </p>
    </div>
  );
};

export default Footer;
