import React from "react";
import H2 from "../shared/h2/H2";
import H1 from "../shared/h1/H1";
import "./FuelPurchaseModal.scss";

const FuelPurchaseModal = () => {
  const progress = 3;
  return (
    <div className="modal-window">
      <img src={require("../../images/fuel-purchase/ad-2.png")} alt="ad" />
      <div className="wrapper-content">
        <img src={require("../../images/fuel-purchase/group-13.svg")} alt="" />
        <H1 text="Идёт заправка топливом" />
        <div className="wrapper-scale">
          <div>
            <div className="sum float-l">697 грн</div>
            <div className="grade float-r">Nano 98</div>
            <div className="clearfix" />
          </div>
          <div className="volume">1.5 л</div>
          <div className="scale">
            {[...Array(16).keys()].map(index => {
              return (
                <span className={`item ${progress > index ? "active" : ""}`} />
              );
            })}
          </div>
          <div className="volume">23.4 л</div>
        </div>
        <div className="line" />
        <H2 text="Дождитесь окончания процесса и не покидайте место заправки." />
      </div>
    </div>
  );
};

export default FuelPurchaseModal;
