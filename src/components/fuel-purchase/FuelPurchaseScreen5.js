import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import H2 from "../shared/h2/H2";
import Button from "../shared/button/Button";
import "./FuelPurchaseScreen5.scss";

const FuelPurchaseScreen5 = ({ setScreen, screen, setShowModal }) => {
  const [amountFuel, setAmountFuel] = useState(27);
  const [sum, setSum] = useState(1000);
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="wrapper-screen-5">
      <H2 text="Выберите параметр топливо/сумма и потяните ползунок до необходимых значений" />

      <div className="wrapper-img">
        <div className="img">
          <img
            src={require("../../images/fuel-purchase/gas-type-image-copy-2@3x.png")}
            alt=""
          />
          <div className="full-tank">
            <img
              src={require("../../images/fuel-purchase/group-6.svg")}
              alt=""
            />
            Заправить полный бак
          </div>
        </div>
        <H2 text="Цена: 27 грн/л" />
      </div>

      <div className="wrapper-description">
        <div
          className={`quantity ${activeTab === 1 ? "active" : ""}`}
          onClick={() => {
            setActiveTab(1);
          }}
        >
          <H2 text="Количество топлива" />
          <div className="float-r">10 л</div>
        </div>
        <div
          className={`sum ${activeTab === 2 ? "active" : ""}`}
          onClick={() => {
            setActiveTab(2);
          }}
        >
          <H2 text="Сумма" />
          <div className="float-r">240 грн</div>
        </div>
      </div>

      <div className="wrapper-input-range">
        <div className="float-l">
          <img
            src={require("../../images/fuel-purchase/group-5.svg")}
            alt=""
            onClick={() => {
              if (activeTab === 1) {
                const value = amountFuel - 1 >= 0 ? amountFuel - 1 : 0;
                setAmountFuel(value);
              } else {
                const value = sum - 1 >= 0 ? sum - 1 : 0;
                setSum(value);
              }
            }}
          />
        </div>
        <div className="float-l slidecontainer range">
          {activeTab === 1 && (
            <div className="container tab-fuel">
              <div className="wrapper-slider-scale-large">
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  id="rangeInput"
                  value={amountFuel}
                  onChange={e => {
                    const value = (e && e.target.value) || 0;
                    setAmountFuel(value);
                  }}
                />
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="container tab-sum">
              <div className="wrapper-slider-scale-large">
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="2000"
                  step="1"
                  id="rangeInput"
                  value={sum}
                  onChange={e => {
                    const value = (e && e.target.value) || 0;
                    setSum(value);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="float-l">
          <img
            src={require("../../images/fuel-purchase/group-8.svg")}
            alt=""
            onClick={() => {
              if (activeTab === 1) {
                const value = amountFuel + 1 < 100 ? amountFuel + 1 : 100;
                setAmountFuel(value);
              } else {
                const value = sum + 1 >= 2000 ? sum : 2000;
                setSum(value);
              }
            }}
          />
        </div>
        <div className="clear-fix" />
      </div>

      <div className="wrapper-button">
        <Button
          title="Оплатить и заправить"
          onClick={() => setShowModal(true)}
        />
      </div>
    </div>
  );
};

export default withRouter(FuelPurchaseScreen5);
