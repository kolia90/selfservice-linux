import React from "react";
import H2 from "../shared/h2/H2";
import H1 from "../shared/h1/H1";
import "./FuelPurchaseModal.scss";

const FuelPurchaseModal = ({order, spilled}) => {
  const dots = 16;

  const giveVolume = (spilled.give_volume) || 0;
  const volume = parseFloat(order.volume);
  const progress = Math.round((spilled.percent || 0) * 100 / dots);

  return (
    <div className="modal-window">
      <img src={require("../../images/fuel-purchase/ad-2.png")} alt="ad" />
      <div className="wrapper-content">
        <img src={require("../../images/fuel-purchase/group-13.svg")} alt="" />
        <H1 text="Идёт заправка топливом" />
        <div className="wrapper-scale">
          <div className="wrapper-sum">
            <div className="sum float-l">{order.amount} грн</div>
            <div className="grade float-r">{order.fuel.name}</div>
            <div className="clearfix" />
          </div>
          <div className="volume">{giveVolume} л</div>
          <div className="scale">
            {[...Array(dots).keys()].map(index => {
              return (
                <span className={`item ${progress > index ? "active" : ""}`} key={index}  />
              );
            })}
          </div>
          <div className="volume total">{volume} л</div>
        </div>
        <div className="line" />
        <H2 text="Дождитесь окончания процесса и не покидайте место заправки." />
      </div>
    </div>
  );
};

export default FuelPurchaseModal;
