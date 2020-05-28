// @flow
import React from "react";
import "./Logo.scss";
import { withRouter } from "react-router-dom";

const Logo = ({ history }) => {
  return (
    <div className="wrapper-logo">
      <img
        className="img-logo"
        src={require("../../../images/logo/logo.svg")}
        alt="Socar"
        onClick={() => history.push("/")}
      />
      <div className="version">v0.1.8</div>
    </div>
  );
};

export default withRouter(Logo);
