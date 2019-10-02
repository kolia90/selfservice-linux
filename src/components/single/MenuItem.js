import React from "react";
import "./MenuItem.scss";
import H2 from "../shared/h2/H2";

const MenuItem = () => {
  return (
    <div className="menu-item">
      <img src={require("../../images/catalog/Screenshot_2.png")} alt="" />
      <H2 text="Салаты" />
      <span>20 предложений</span>
    </div>
  );
};

export default MenuItem;
