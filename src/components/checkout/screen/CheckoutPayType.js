import React from "react";
import { withRouter } from "react-router-dom";
import H1 from "../../shared/h1/H1";
import Rectangle from "../../shared/rectangle/Rectangle";
import "./CheckoutPayType.scss";
import constants from "../constants";


const CheckoutPayType = ({ history, onSelectType }) => {
  return (
      <div className="checkout-choose">
        <H1 text="Выберите формат оплаты" />
        <div>
          <div
              className="wrapper-rectangle d-inline"
              onClick={() => {onSelectType(constants.pay_types.CARD)}}
          >
            <Rectangle>
              <div>
                <img
                    className="img-card"
                    src={require("../../../images/type-payment/menu-icon-wallet.svg")}
                    alt="card"
                />
              </div>
              <h3>Оплачу картой</h3>
            </Rectangle>
          </div>
          <div
              className="d-inline"
              onClick={() => {onSelectType(constants.pay_types.CASH)}}
          >
            <Rectangle>
              <div>
                <img
                    className="img-cash"
                    src={require("../../../images/type-payment/empty-order.svg")}
                    alt="card"
                />
              </div>
              <h3>Плачу наличными</h3>
            </Rectangle>
          </div>
        </div>
      </div>
  );
};

export default withRouter(CheckoutPayType);
