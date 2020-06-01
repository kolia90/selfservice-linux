import React from "react";
import routes from "../../constants/routes";
import "./Service.scss";
import Rectangle from "../shared/rectangle/Rectangle";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import H1 from "../shared/h1/H1";
import MPosService from "../../services/MPosService";
import Toast from "../shared/toast/Toast";
import MultiLang from "../../MultiLang";
import Timer from "../shared/timer/Timer";

const Service = ({ history }) => {

  MPosService.checkConnect({
    onError: () => {
      Toast(
          <MultiLang>
            {{
              uk: "Виникла помилка. Спробуйте пізніше",
              ru: "Виникла ошибка. Попробуйте пізніше",
              en: "An error occurred. Try later"
            }}
          </MultiLang>
      );
    },
    onTimeout: () => {
      Toast(
          <MultiLang>
            {{
              uk: "Помилка зв'язку з касою",
              ru: "Ошибка связи с кассой",
              en: "Connecting with MPOS error"
            }}
          </MultiLang>
      );
    }
  });

  return (
    <div>
      <Header />
      <div className="wrapper-service" data-tid="container">
        <H1 text={(
            <MultiLang>
              {{
                uk: "Виберіть послугу",
                ru: "Выберите услугу",
                en: "Select service"
              }}
            </MultiLang>
        )} />
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
              <h3>
                <MultiLang>
                  {{
                    uk: "Заправити автомобіль",
                    ru: "Заправить автомобиль",
                    en: "Refuel a car"
                  }}
                </MultiLang>
              </h3>
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
              <h3>
                <MultiLang>
                  {{
                    uk: "Заправитись самому",
                    ru: "Заправиться самому",
                    en: "Refuel yourself"
                  }}
                </MultiLang>
              </h3>
            </Rectangle>
          </div>
        </div>
      </div>

      <Timer/>
    </div>
  );
};

export default withRouter(Service);
