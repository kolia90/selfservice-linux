import React from "react";
import "./RegisterCardFinish.scss";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import "react-simple-keyboard/build/css/index.css";
import H2 from "../shared/h2/H2";
import Button from "../shared/button/Button";
import Logo from "../shared/logo/Logo";
import routes from "../../constants/routes";

const RegisterCardFinish = ({ history }) => {
  return (
    <>
      <Header center={<div>ЗАВЕРШЕНИЕ</div>} right={null} />
      <div className="wrapper-register-finish">
        <div className="level-card">
          <div className="wrapper-header">
            <div className="float-l name">LEVEL card</div>
            <div className="float-r">
              <Logo />
            </div>
            <div className="clearfix" />
          </div>
          <div className="number">№ 8040 1000 0048 0186</div>
          <div className="barcode">
            <img
              src={require("../../images/register-card-finish/barcode.png")}
              alt="barcode"
            />
          </div>
          <div className="wrapper-balance">
            <div className="balance">
              Баланс: <span>10 гривен</span>
            </div>
          </div>
        </div>
        <div>
          <H2 text="Вам сгенерирована виртуальная карта LEVEL! Она доступна вам в мобильном приложении." />
        </div>
        <div className="wrapper-mobile-app">
          <div className="float-l">
            <img
              src={require("../../images/register-card-finish/app-store-but.svg")}
              alt="App Stote"
            />
          </div>
          <div className="float-r">
            <img
              src={require("../../images/register-card-finish/google-play-but.svg")}
              alt="Google Play"
            />
          </div>
        </div>
        <div className="clearfix" />
        <Button
          title="Начать использование"
          onClick={() => history.push(`${routes.SERVICE}`)}
        />
      </div>
    </>
  );
};

export default withRouter(RegisterCardFinish);
