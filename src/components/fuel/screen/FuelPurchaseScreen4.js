import React from "react";
import { withRouter } from "react-router-dom";
import routes from "../../../constants/routes";
import H2 from "../../shared/h2/H2";
import H1 from "../../shared/h1/H1";
import Button from "../../shared/button/Button";
import Order from "../../shared/order/Order";
import "./FuelPurchaseScreen4.scss";

const FuelPurchaseScreen4 = ({ order, spilled, history }) => {
  const title = (spilled.status === 'error') ? 'Извините, произошла ошибка!' : 'Спасибо, ваш заказ принят!';

  return (
    <div className="wrapper-screen-4">
      <H2 text={title} />
      <H1 text="Не забудьте забрать ваш чек." />

      <Order order={order} spilled={spilled} />

      <div className="wrapper-button two">
        <Button
          title="Закончить"
          onClick={() => history.push(`${routes.HOME}`)}
        />
        <Button
          title="На главную"
          onClick={() => history.push(`${routes.SERVICE}`)}
        />
      </div>
    </div>
  );
};

export default withRouter(FuelPurchaseScreen4);
