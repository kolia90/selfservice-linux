import React from "react";
import { DateTime } from "luxon"
import "./Order.scss";
import MultiLang from "../../../MultiLang";

const Order = ({order, spilled, checkId}) => {

  // const time = DateTime.fromISO(order.created).toFormat('HH:mm');
  const time = DateTime.local().toFormat('HH:mm');

  return (
    <div className="order-block">
      <div>
        <span className="order-number">
          <MultiLang>
            {{
              uk: `Заказ № ${checkId || '------'}`,
              ru: `Замовлення № ${checkId || '------'}`,
              en: `Order № ${checkId || '------'}`
            }}
          </MultiLang>
        </span>
        <span className="float-r order-payment-status">
          <MultiLang>
            {{
              uk: "Оплачено",
              ru: "Оплачен",
              en: "Paid"
            }}
          </MultiLang>
        </span>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="text-aling-l">
                <MultiLang>
                  {{
                    uk: "Пальне",
                    ru: "Топливо",
                    en: "Fuel"
                  }}
                </MultiLang>
              </th>
              <th className="text-aling-c">
                <MultiLang>
                  {{
                    uk: "Літри",
                    ru: "Литры",
                    en: "Volume"
                  }}
                </MultiLang>
              </th>
              <th className="text-aling-r">
                <MultiLang>
                  {{
                    uk: "Ціна",
                    ru: "Цена",
                    en: "Price"
                  }}
                </MultiLang>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-aling-l primary">
                  <div className="single">{order.fuel && order.fuel.name}</div>
              </td>
              <td className="text-aling-c primary bold">{spilled.give_volume}</td>
              <td className="text-aling-r primary bold">{order.fuel.price} грн</td>
            </tr>
          </tbody>
        </table>
        <div className="separator" />
        <div className="wrapper-order-total">
          <div className="float-l primary">
            <MultiLang>
              {{
                uk: "Всього",
                ru: "Итого",
                en: "Total"
              }}
            </MultiLang>
          </div>
          <div className="float-r primary bold">{spilled.give_amount} грн</div>
        </div>
        <div className="separator" />
        <div className="wrapper-order-status">
          <div>
            <div className="float-l primary">
              <MultiLang>
                {{
                  uk: "Час оформлення замовлення",
                  ru: "Время оформления заказа",
                  en: "Ordering time"
                }}
              </MultiLang>
            </div>
            <div className="float-r primary bold">{time}</div>
            <div className="clearfix" />
          </div>
          <div className="status">
            <div className="float-l primary">Статус</div>
            <div className={'float-r order-status' + ((spilled.status === 'error') ? ' error' : '')}>
              {(spilled.status === 'error') ? (
                <MultiLang>
                  {{
                    uk: "Помилка",
                    ru: "Ошибка",
                    en: "Error"
                  }}
                </MultiLang>
              ) : (
                <MultiLang>
                  {{
                    uk: "Заказ отримано",
                    ru: "Заказ получен",
                    en: "Success"
                  }}
                </MultiLang>
              )}
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
