import React from "react";
import { withRouter } from "react-router-dom";
import H2 from "../shared/h2/H2";
import Button from "../shared/button/Button";
import "./FuelPurchaseScreen2.scss";

const FuelPurchaseScreen2 = ({ setScreen, screen }) => {
  return (
    <>
      <div className="wrapper-img">
        <img src={require("../../images/fuel-purchase/image-2.png")} alt="" />
      </div>

      <div className="wrapper-h2">
        <H2 text="Убедитесь, что заправочный пистолет вставлен в горловину бака вашего автомобиля" />
      </div>

      <div className="wrapper-button">
        <Button title="Далее" onClick={() => setScreen(screen + 1)} />
      </div>
    </>
  );
};

export default withRouter(FuelPurchaseScreen2);
