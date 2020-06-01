import React from "react";
import routes from "../../constants/routes";
import "./OfferCard.scss";
import Rectangle from "../shared/rectangle/Rectangle";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import H1 from "../shared/h1/H1";
import MultiLang from "../../MultiLang";

const OfferCard = ({ history }) => {
  return (
    <div>
      <Header />
      <div className="wrapper-offer-card">
        <H1 text={(
            <MultiLang>
              {{
                uk: "Бажаєте зареєструватися і отримати карту level?",
                ru: "Хотите зарегистрироваться и получить карту level?",
                en: "Do you want registration and retrieve level card?"
              }}
            </MultiLang>
        )} />
        <div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.REGISTER_PHONE}`);
            }}
          >
            <Rectangle>
              <h3>
                <MultiLang>
                  {{
                    uk: "Так",
                    ru: "Да",
                    en: "Yes"
                  }}
                </MultiLang>
              </h3>
            </Rectangle>
          </div>
          <div
            className="d-inline"
            onClick={() => {
              history.push(`${routes.SERVICE}`);
            }}
          >
            <Rectangle>
              <h3>
                <MultiLang>
                  {{
                    uk: "Ні",
                    ru: "Нет",
                    en: "No"
                  }}
                </MultiLang>
              </h3>
            </Rectangle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(OfferCard);
