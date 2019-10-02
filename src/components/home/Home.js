// @flow
import React from "react";
import { Link } from "react-router-dom";
import routes from "../../constants/routes";
import "./Home.scss";
import Header from "../shared/header/Header";
import Slider from "../shared/slider/Slider";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="wrapper-home" data-tid="container">
        <Slider>
          <img src={require("../../images/slider/group-2.png")} alt="" />
          <img src={require("../../images/slider/group-2.png")} alt="" />
          <img src={require("../../images/slider/group-2.png")} alt="" />
          <img src={require("../../images/slider/group-2.png")} alt="" />
          <img src={require("../../images/slider/group-2.png")} alt="" />
        </Slider>
      </div>
      <div className="footer-home">
        <Link className="link" to={routes.CHECK_CARD}>
          Коснитесь чтобы активировать
        </Link>
      </div>
    </div>
  );
};

export default Home;
