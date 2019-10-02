import React from "react";
import "./Single.scss";

const Single = ({ quantity, decrement, increment, img, singleName, supplements, description}) => {
  return (
    <div className="single-wrapper" data-tid="container">
      <hr />
      <img src={img} alt="" />
      <div className="description">
        <h3>{singleName}</h3>
        <div className="single-price">{description}</div>
        <span>{supplements}</span>
      </div>
      <div className="float-r">
        <div className="setting">
          <h3>Количество</h3>
          <div className="counter">
            <div className="minus" onClick={decrement}>
              <img src={require("../../images/icon/minus.svg")} alt="" />
            </div>
            <span>{quantity}</span>
            <div className="plus" onClick={increment}>
              <img src={require("../../images/icon/plus.svg")} alt="" />
            </div>
          </div>
        </div>
        <div className="setting">
          <h3>Цена</h3>
          <div className="price">25,00 грн</div>
        </div>
        <div className="setting">
          <img src={require("../../images/icon/delete-item.svg")} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Single;
