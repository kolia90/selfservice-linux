import React from "react";
import routes from "../../constants/routes";
import "./TypePayment.scss";
import Rectangle from "../shared/rectangle/Rectangle";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import H1 from "../shared/h1/H1";
import PreviousPage from "../shared/previous-page/PreviousPage";

const TypePayment = ({ history }) => {
  return (
    <div>
      <Header
        left={<PreviousPage onClick={() => history.goBack()} />}
        center={<div>ФОРМА ОПЛАТНЫ</div>}
        right={null}
      />
      <div className="wrapper-type-payment">
        <H1 text="Выберите формат оплаты" />
        <div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.SELECT_PAYMENT}`);
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
              history.push(`${routes.PAYMENT_CASH}`);
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
    </div>
  );
};

export default withRouter(TypePayment);
