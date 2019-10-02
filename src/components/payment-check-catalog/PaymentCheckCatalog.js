import React from "react";
import "./PaymentCheckCatalog.scss";
import Header from "../shared/header/Header";
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import Button from "../shared/button/Button";
import PreviousPage from "../shared/previous-page/PreviousPage";
import H2 from "../shared/h2/H2";
import OrderProduct from "../shared/order-product/OrderProduct";

const PaymentCheckCatalog = ({ history }) => {
  return (
    <div>
      <Header
        left={
          <PreviousPage onClick={() => history.push(`${routes.SERVICE}`)} />
        }
        center={<div>ФОРМА ОПЛАТЫ</div>}
        right={null}
      />
      <div className="wrapper-payment-check">
        <H2 text="Спасибо, ваш заказ принят!" />
        <H2 text="Не забудьте забрать чек. Номер вашего заказа указан на чеке." />

        <div className="wrapper-order">
          <OrderProduct />
        </div>

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
    </div>
  );
};

export default withRouter(PaymentCheckCatalog);
