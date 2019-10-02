import React from "react";
import { withRouter } from "react-router-dom";
import H1 from "../shared/h1/H1";
import Rectangle from "../shared/rectangle/Rectangle";
import "./FuelPurchaseScreen3.scss";
import routes from "../../constants/routes";

const FuelPurchaseScreen3 = ({ history, setScreen }) => {
  return (
    <>
      <div className="wrapper-type-payment">
        <H1 text="Выберите формат оплаты" />
        <div>
          <div
            className="wrapper-rectangle d-inline"
            onClick={() => {
              history.push(`${routes.SELECT_PAYMENT}`, {
                route: routes.FUEL_PURCHASE
              });
            }}
          >
            <Rectangle>
              <div>
                <img
                  className="img-card"
                  src={require("../../images/type-payment/menu-icon-wallet.svg")}
                  alt="card"
                />
              </div>
              <h3>Оплачу картой</h3>
            </Rectangle>
          </div>
          <div
            className="d-inline"
            onClick={() => {
              setScreen(6);
            }}
          >
            <Rectangle>
              <div>
                <img
                  className="img-cash"
                  src={require("../../images/type-payment/empty-order.svg")}
                  alt="card"
                />
              </div>
              <h3>Плачу наличными</h3>
            </Rectangle>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(FuelPurchaseScreen3);
