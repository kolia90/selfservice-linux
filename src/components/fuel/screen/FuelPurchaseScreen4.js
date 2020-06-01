import React from "react";
import { withRouter } from "react-router-dom";
import routes from "../../../constants/routes";
import H2 from "../../shared/h2/H2";
import H1 from "../../shared/h1/H1";
import Button from "../../shared/button/Button";
import Order from "../../shared/order/Order";
import "./FuelPurchaseScreen4.scss";
import MultiLang from "../../../MultiLang";

const FuelPurchaseScreen4 = ({ order, spilled, checkId, history }) => {
  return (
    <div className="wrapper-screen-4">
      <H2 text={(spilled.status === 'error') ? (
          <MultiLang>
            {{
              uk: "Вибачайте, виникла помилка!",
              ru: "Извините, произошла ошибка!",
              en: "Sorry, an error occurred!"
            }}
          </MultiLang>
      ) : (
          <MultiLang>
            {{
              uk: "Дякуємо, ваше замовлення прийнято!",
              ru: "Спасибо, ваш заказ принят!",
              en: "Thank you, your order has been accepted!"
            }}
          </MultiLang>
      )
      } />
      <H1 text={
        <MultiLang>
          {{
            uk: "Не забудьте забрати ваш чек.",
            ru: "Не забудьте забрать ваш чек.",
            en: "Don't forget your check."
          }}
        </MultiLang>
      } />

      <Order order={order} spilled={spilled} checkId={checkId} />

      <div className="wrapper-button">
        <Button
          title={<MultiLang>
            {{
              uk: "На головну",
              ru: "На главную",
              en: "To home"
            }}
          </MultiLang>}
          onClick={() => history.push(`${routes.HOME}`)}
        />
      </div>
    </div>
  );
};

export default withRouter(FuelPurchaseScreen4);
