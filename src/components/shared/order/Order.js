import React from "react";
import { DateTime } from "luxon"
import "./Order.scss";

const Order = ({order, spilled}) => {

  const statusName = (spilled.status === 'error') ? 'Ошибка' : 'Заказ получен';
  // const time = DateTime.fromISO(order.created).toFormat('HH:mm');
  const time = DateTime.local().toFormat('HH:mm');

  return (
    <div className="order-block">
      <div>
        <span className="order-number">Заказ №{order.id || '------'}</span>
        <span className="float-r order-payment-status">Оплачен</span>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="text-aling-l">Топливо</th>
              <th className="text-aling-c">Литры</th>
              <th className="text-aling-r">Цена</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-aling-l primary">
                  <div className="single">{order.fuel && order.fuel.name}</div>
              </td>
              <td className="text-aling-c primary bold">{order.volume}</td>
              <td className="text-aling-r primary bold">{order.fuel.price} грн</td>
            </tr>
          </tbody>
        </table>
        <div className="separator" />
        <div className="wrapper-order-total">
          <div className="float-l primary">Итого</div>
          <div className="float-r primary bold">{order.amount} грн</div>
        </div>
        <div className="separator" />
        <div className="wrapper-order-status">
          <div>
            <div className="float-l primary">Время оформления заказа</div>
            <div className="float-r primary bold">{time}</div>
            <div className="clearfix" />
          </div>
          <div className="status">
            <div className="float-l primary">Статус</div>
            <div className={'float-r order-status' + ((spilled.status === 'error') ? ' error' : '')}>
              {statusName}
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
