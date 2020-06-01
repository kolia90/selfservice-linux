// @flow
import React from "react";
import "./Lang.scss";
import {connect} from "react-redux";
import {setLanguage} from "../../../store/actions";

const Lang = ({ dispatch, language }) => {

  const changeLang = lang => {
    dispatch(setLanguage(lang))
  };

  return (
    <div className="wrapper-lang">
      <div className={`d-inline lang ${language === "uk" ? "active" : ""}`} onClick={() => {
        changeLang('uk')
      }}>
        Укр
      </div>
      <div className={`d-inline lang ${language === "ru" ? "active" : ""}`} onClick={() => {
        changeLang('ru')
      }}>
        Рус
      </div>
      <div className={`d-inline lang ${language === "en" ? "active" : ""}`} onClick={() => {
        changeLang('en')
      }}>
        Eng
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  language: state.languageState,
});

export default connect(mapStateToProps)(Lang);
