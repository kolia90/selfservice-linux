import React from "react";
import "./Ingredient.scss";

const Ingredient = ({ active, title, img, img2 }) => {
  return (
    <div className="wrapper-ingredient">
      <div className={`item ${!active ? "shadow" : ""}`}>
        <img src={img} alt="" />
        <h3>{title}</h3>
        {!active && <div className="plus"><img src={img2} alt="" /></div>}
      </div>

    </div>
  );
};

export default Ingredient;
