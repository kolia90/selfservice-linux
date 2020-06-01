import React from "react";
import { withRouter } from "react-router-dom";
import H1 from "../../shared/h1/H1";
import Rectangle from "../../shared/rectangle/Rectangle";
import "./CheckoutPayType.scss";
import constants from "../constants";
import MultiLang from "../../../MultiLang";
import {connect} from "react-redux";
import Toast from "../../shared/toast/Toast";


const CheckoutPayType = ({ onSelectType, levelNumber }) => {
  return (
      <div className="checkout-choose">
        <H1 text={<MultiLang>
          {{
            uk: "Виберіть форму оплати",
            ru: "Выберите формат оплаты",
            en: "Choose payment type"
          }}
        </MultiLang>} />
        <div>
          <div
              className="wrapper-rectangle d-inline"
              onClick={() => {onSelectType(constants.pay_types.CARD)}}
          >
            <Rectangle>
              <div>
                <img
                    className="img-card"
                    src={require("../../../images/type-payment/menu-icon-wallet.svg")}
                    alt="card"
                />
              </div>
              <h3>
                <MultiLang>
                  {{
                    uk: "Оплачу картою",
                    ru: "Оплачу картой",
                    en: "Pay by card"
                  }}
                </MultiLang>
              </h3>
            </Rectangle>
          </div>
          <div
              className="d-inline"
              onClick={() => {
                if(levelNumber){
                  onSelectType(constants.pay_types.CASH)
                }else{
                  Toast(
                      <MultiLang>
                        {{
                          uk: "Цей метод оплати доступний тільки з LEVEL картою",
                          ru: "Этот метод оплаты доступен только с LEVEL картой",
                          en: "This payment method is only available with LEVEL card"
                        }}
                      </MultiLang>
                  )
                }
              }}
          >
            <Rectangle>
              <div>
                <img
                    className="img-cash"
                    src={require("../../../images/type-payment/empty-order.svg")}
                    alt="card"
                />
              </div>
              <h3>
                <MultiLang>
                  {{
                    uk: "Оплачу готівкою",
                    ru: "Плачу наличными",
                    en: "Pay by cash"
                  }}
                </MultiLang>
              </h3>
            </Rectangle>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = state => ({
  levelNumber: state.levelState
});

export default connect(mapStateToProps)(withRouter(CheckoutPayType))
