import React from "react";
import routes from "../../constants/routes";
import "./OfferCard.scss";
import Rectangle from "../shared/rectangle/Rectangle";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import H1 from "../shared/h1/H1";

const OfferCard = ({ history }) => {
  return (
    <div>
      <Header />
      <div className="wrapper-offer-card">
        <H1 text="Хотите зарегистрироваться и получить карту level?" />
        <div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.REGISTER_CARD}`);
            }}
          >
            <Rectangle>
              <h3>Да</h3>
            </Rectangle>
          </div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.SERVICE}`);
            }}
          >
            <Rectangle>
              <h3>Нет</h3>
            </Rectangle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(OfferCard);
