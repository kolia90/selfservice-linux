import React from "react";
import "./CardItem.scss";
import { withRouter } from "react-router-dom";
import Button from "../shared/button/Button";

const CardItem = ({ history }) => {
  return (
    <div className="wrapper-card-item">
      <div className="rectangle">
        <img src={require("../../images/catalog/Screenshot_1.png")} alt="" />
        <div className="description">
          Вода мін. Моршинська 0,75л н/г
          <div>25.00 грн</div>
        </div>
        <div className="next" onClick={() => history.push("/product/1")}>
          <img src={require("../../images/icon/previous-icon@3x.png")} alt="" />
        </div>
        <Button title="В корзину" />
      </div>
    </div>
  );
};

export default withRouter(CardItem);
