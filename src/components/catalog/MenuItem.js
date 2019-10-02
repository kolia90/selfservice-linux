import React from "react";
import "./MenuItem.scss";
import H2 from "../shared/h2/H2";

const MenuItem = ({img, name, description}) => {
  return (
    <div className="menu-item">
      <img src={img} alt="" />
      <H2 text={name} />
      <span>{description}</span>
    </div>
  );
};

export default MenuItem;
