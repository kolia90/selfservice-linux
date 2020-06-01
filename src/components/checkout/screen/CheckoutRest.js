import React from "react";
import { withRouter } from "react-router-dom";
import H1 from "../../shared/h1/H1";
import "./CheckoutRest.scss";
import Rectangle from "../../shared/rectangle/Rectangle";
import constants from "../constants";
import MultiLang from "../../../MultiLang";

const CheckoutRest = ({ onSelectRest }) => {

  return (
      <div className="wrapper-screen-6">
        <H1 text={<MultiLang>
          {{
            uk: "Як бажаєте отримати здачу?",
            ru: "Как желаете получить сдачу?",
            en: "How do you want to get rest?"
          }}
        </MultiLang>} />
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
              <h3>
                <MultiLang>
                  {{
                    uk: "На карту level",
                    ru: "На карту level",
                    en: "On level card"
                  }}
                </MultiLang>
              </h3>
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
              <h3>
                <MultiLang>
                  {{
                    uk: "Касовий ваучер",
                    ru: "Кассовый ваучер",
                    en: "Cash voucher "
                  }}
                </MultiLang>
              </h3>
            </Rectangle>
          </div>
        </div>
      </div>
  );
};

export default withRouter(CheckoutRest);
