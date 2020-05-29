import React from "react";
import H1 from "../shared/h1/H1";
import "./FuelPurchaseModal.scss";

const FuelTerminalModal = ({terminalStatus}) => {

  let status = 'Ожидание...';
  if(terminalStatus){
    status = `${terminalStatus.command} - ${terminalStatus.status}`
  }

  return (
    <div className="modal-window">
      <div className="wrapper-content terminal">
        <H1 text="Вставьте платежную карту для оплаты и следуйте инструкицям терминала" />
        <img src={require("../../images/checkout/insert-icon.svg")} alt="" />

        <div className="status">
          Текущий статус: <b>{status}</b>
        </div>
      </div>
    </div>
  );
};

export default FuelTerminalModal;
