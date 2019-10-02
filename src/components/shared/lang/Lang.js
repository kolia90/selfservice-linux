// @flow
import React from "react";
import "./Lang.scss";

const Lang = ({ lang = "ukr" }) => {
  return (
    <div className="wrapper-lang">
      <div className={`d-inline lang ${lang === "ukr" ? "active" : ""}`}>
        Укр
      </div>
      <div className={`d-inline lang ${lang === "ru" ? "active" : ""}`}>
        Рус
      </div>
      <div className={`d-inline lang ${lang === "en" ? "active" : ""}`}>
        Eng
      </div>
    </div>
  );
};

export default Lang;
