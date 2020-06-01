import React from "react";
import H1 from "../shared/h1/H1";
import "./FuelPurchaseModal.scss";
import MultiLang from "../../MultiLang";

const FuelTerminalModal = ({terminalStatus}) => {

  let status = 'Ожидание...';
  if(terminalStatus){
    status = `${terminalStatus.command} - ${terminalStatus.status}`
  }

  return (
    <div className="modal-window">
      <div className="wrapper-content terminal">
        <H1 text={<MultiLang>
          {{
            uk: "Вставте платіжну карту для оплати і слідуйте інструкціям терміналу",
            ru: "Вставьте платежную карту для оплаты и следуйте инструкциям терминала",
            en: "Insert a payment card for payment and follow the instructions of the terminal"
          }}
        </MultiLang>} />
        <img src={require("../../images/checkout/insert-icon.svg")} alt="" />

        <div className="status">
          <MultiLang>
            {{
              uk: "Поточний статус",
              ru: "Текущий статус",
              en: "Current status"
            }}
          </MultiLang>: <b>{status}</b>
        </div>
      </div>
    </div>
  );
};

export default FuelTerminalModal;
