import React from "react";
import { withRouter } from "react-router-dom";
import "./PreviousPage.scss";

const PreviousPage = ({ onClick }) => {
  return (
    <div className="wrapper-previous-icon">
      <img
        src={require("../../../images/fuel-purchase/previous-icon.svg")}
        alt="previous icon"
        className={'previous'}
        onClick={() => onClick()}
      />
    </div>
  );
};

export default withRouter(PreviousPage);
