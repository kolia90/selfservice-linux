import React from "react";
import { withRouter } from "react-router-dom";
import H2 from "../shared/h2/H2";
import Button from "../shared/button/Button";
import "./FuelPurchaseScreen4.scss";

const FuelPurchaseScreen4 = ({ setScreen, screen, setShowModal }) => {
  return (
    <>
      <H2 text="Выберите параметр топливо/сумма и потяните ползунок до необходимых значений" />

      <div className="wrapper-img">
        <div className="img">
          <span>95</span>
        </div>
      </div>

      <h3>Цена: 27 грн/л</h3>

      <div className="wrapper-toggle">
        <div className="wrapper-fuel">
          <h4 className="float-l">Количество топлива</h4>
          <h4 className="float-r">10 л</h4>
          <div className="clearfix" />
        </div>
        <div className="wrapper-sum">
          <h4 className="float-l">Сумма</h4>
          <h4 className="float-r">270 грн</h4>
          <div className="clearfix" />
        </div>
      </div>

      <div className="wrapper-button">
        <Button
          title="Оплатить и заправить"
          onClick={() => setShowModal(true)}
        />
      </div>
    </>
  );
};

export default withRouter(FuelPurchaseScreen4);
