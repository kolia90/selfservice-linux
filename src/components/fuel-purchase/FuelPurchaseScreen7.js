import React from "react";
import { withRouter } from "react-router-dom";
import routes from "../../constants/routes";
import H2 from "../shared/h2/H2";
import H1 from "../shared/h1/H1";
import Button from "../shared/button/Button";
import Order from "../shared/order/Order";
import "./FuelPurchaseScreen7.scss";

const FuelPurchaseScreen7 = ({ history }) => {
  return (
    <div className="wrapper-screen-7">
      <H2 text="Спасибо, ваш заказ принят!" />
      <H1 text="Не забудьте забрать ваш чек." />

      <Order />

      <div className="wrapper-buttons">
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

export default withRouter(FuelPurchaseScreen7);
