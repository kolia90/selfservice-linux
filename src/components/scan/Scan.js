import React from "react";
import "./Scan.scss";
import Header from "../shared/header/Header";
import Skip from "../shared/skip/Skip";
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";

const Scan = ({ history }) => {
  return (
    <div>
      <Header
        center={<div>СКАНИРОВАНИЕ</div>}
        right={<Skip onSkip={() => history.push(`${routes.SERVICE}`)} />}
      />
      <div className="scan">
        <img
          className="tl"
          src={require("../../images/scan/rectangle-2.svg")}
          alt=""
        />
        <img
          className="tr"
          src={require("../../images/scan/rectangle-2.svg")}
          alt=""
        />
        <img
          className="bl"
          src={require("../../images/scan/rectangle-2.svg")}
          alt=""
        />
        <img
          className="br"
          src={require("../../images/scan/rectangle-2.svg")}
          alt=""
        />
        <div className="qr" />
      </div>
    </div>
  );
};

export default withRouter(Scan);
