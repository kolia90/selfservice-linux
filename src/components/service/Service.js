import React from "react";
import routes from "../../constants/routes";
import "./Service.scss";
import Rectangle from "../shared/rectangle/Rectangle";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import H1 from "../shared/h1/H1";

const Service = ({ history }) => {
  return (
    <div>
      <Header />
      <div className="wrapper-service" data-tid="container">
        <H1 text="Выберите услугу" />
        <div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.FUEL_PURCHASE}`);
            }}
          >
            <Rectangle>
              <img
                className="img-refuel-car"
                src={require("../../images/service/group-6.svg")}
                alt="Refuel car"
              />
              <h3>Заправить автомобиль</h3>
            </Rectangle>
          </div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.CATALOG}`);
            }}
          >
            <Rectangle>
              <img
                className="img-menu-buta"
                src={require("../../images/service/menu-icon-buta.svg")}
                alt="Menu buta"
              />
              <h3>Заправиться самому</h3>
            </Rectangle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Service);
