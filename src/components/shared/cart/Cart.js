import React from "react";
import "./Cart.scss";

const Cart = ({ text }) => {
    return (
        <div className="cart-wrapper">
          <img src={require("../../../images/icon/previous-icon@3x.png")} alt=""/>
          <h1 className="h1">{text} <span>(4)</span></h1>
        </div>
    );
};

export default Cart;
