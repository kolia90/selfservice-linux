import React from "react";
import routes from "../../constants/routes";
import "./PaymentCash.scss";
import Rectangle from "../shared/rectangle/Rectangle";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import H1 from "../shared/h1/H1";
import PreviousPage from "../shared/previous-page/PreviousPage";

const PaymentCash = ({ history }) => {
  return (
    <div>
      <Header
        left={<PreviousPage onClick={() => history.goBack()} />}
        center={<div>СДАЧА</div>}
        right={null}
      />
      <div className="wrapper-payment-cash">
        <H1 text="Как желаете получить сдачу?" />
        <div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.PAYMENT_CHECK_CATALOG}`);
            }}
          >
            <Rectangle>
              <div>
                <img
                  className="img-card"
                  src={require("../../images/icon/group-16.png")}
                  alt="card"
                />
              </div>
              <h3>На карту level</h3>
            </Rectangle>
          </div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.PAYMENT_CHECK_CATALOG}`);
            }}
          >
            <Rectangle>
              <div>
                <img
                  className="img-cash"
                  src={require("../../images/icon/empty-order.svg")}
                  alt="card"
                />
              </div>
              <h3>Кассовый ваучер</h3>
            </Rectangle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PaymentCash);
