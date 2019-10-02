import React from "react";
import "./OrderProduct.scss";

const OrderProduct = () => {
  return (
    <div className="order-block">
      <div>
        <span className="order-number">Заказ №19998</span>
        <span className="float-r order-payment-status">Оплачен</span>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="text-aling-l">Топливо</th>
              <th className="text-aling-c">Количество</th>
              <th className="text-aling-r">Цена</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-aling-l primary">
                  <div className="single">Донер с курицей
                  и сыром</div>
                  <div className="description">- Без соуса</div>
                  <div className="additionally">Дополнительно:</div>
              </td>
              <td className="text-aling-c primary bold">1</td>
              <td className="text-aling-r primary bold">24,90 грн</td>
            </tr>
            <tr>
              <td><div className="description">- Сыр</div></td>
              <td></td>
              <td className="text-aling-r primary bold">+ 5.20  грн</td>
            </tr>
          </tbody>
        </table>
        <div className="separator" />
        <div className="wrapper-order-total">
          <div className="float-l primary">Итого</div>
          <div className="float-r primary bold">498 грн</div>
        </div>
        <div className="separator" />
        <div className="wrapper-order-status">
          <div>
            <div className="float-l primary">Время оформления заказа</div>
            <div className="float-r primary bold">10:30</div>
            <div className="clearfix" />
          </div>
          <div className="status">
            <div className="float-l primary">Статус</div>
            <div className="float-r order-status">Заказ получен</div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
