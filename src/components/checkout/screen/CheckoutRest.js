import React from "react";
import { withRouter } from "react-router-dom";
import H1 from "../../shared/h1/H1";
import "./CheckoutRest.scss";
import Rectangle from "../../shared/rectangle/Rectangle";
import constants from "../constants";

const CheckoutRest = ({ onSelectRest }) => {

  return (
      <div className="wrapper-screen-6">
        <H1 text="Как желаете получить сдачу?" />
        <div>
          <div
              className="d-inline"
              onClick={() => {
                onSelectRest(constants.rest_types.LEVEL);
              }}
          >
            <Rectangle>
              <div>
                <img
                    className="img-card"
                    src={require("../../../images/icon/group-16.png")}
                    alt="card"
                />
              </div>
              <h3>На карту level</h3>
            </Rectangle>
          </div>
          <div
              className="d-inline"
              onClick={() => {
                onSelectRest(constants.rest_types.VOUCHER);
              }}
          >
            <Rectangle>
              <div>
                <img
                    className="img-cash"
                    src={require("../../../images/icon/empty-order.svg")}
                    alt="card"
                />
              </div>
              <h3>Кассовый ваучер</h3>
            </Rectangle>
          </div>
        </div>
      </div>
  );
};

export default withRouter(CheckoutRest);
