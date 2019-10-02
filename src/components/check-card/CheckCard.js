import React from "react";
import routes from "../../constants/routes";
import Rectangle from "../shared/rectangle/Rectangle";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import H1 from "../shared/h1/H1";
import "./CheckCard.scss";

const CheckCard = ({ history }) => {
  return (
    <div>
      <Header />
      <div className="wrapper-check-card">
        <H1 text="Есть ли у вас карта level?" />
        <div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.SCAN}`);
            }}
          >
            <Rectangle>
              <img
                className="img-1"
                src={require("../../images/icon/group-16.png")}
                alt="card"
              />
              <h3>Да</h3>
            </Rectangle>
          </div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.OFFER_CARD}`);
            }}
          >
            <Rectangle>
              <img
                className="img-2"
                src={require("../../images/icon/group-3.png")}
                alt="card"
              />
              <h3>Нет</h3>
            </Rectangle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CheckCard);
