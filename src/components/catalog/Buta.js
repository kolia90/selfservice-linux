import React from "react";
import "./Buta.scss";
import { withRouter } from "react-router-dom";
import H2 from "../shared/h2/H2";
import MenuItem from "./MenuItem";

const Buta = ({ history }) => {
    const menuImg1 = require("../../images/catalog/Screenshot_2.png");
    const menuImg2 = require("../../images/catalog/item-image-copy@3x.jpg");
    const menuImg3 = require("../../images/catalog/item-image-copy-2@3x.jpg");
  return (
    <div className="bg">
      <H2 text="Buta Бар" />
      <MenuItem img={menuImg1} name="Салаты" description="20 предложений"/>
      <MenuItem img={menuImg2} name="Закуски" description="8 предложений"/>
      <MenuItem img={menuImg3} name="Напитки" description="12 предложений"/>
      <H2 text="Buta Маркет" />
      <MenuItem img={menuImg1} name="Салаты" description="20 предложений"/>
    </div>
  );
};

export default withRouter(Buta);
