import React from "react";
import "./App.scss";
import Routes from "./routes";
import {connect} from "react-redux";
import {MultiLang} from "react-multi-language";

function App({language}) {
  return (
      <>
        <Routes />
        <MultiLang lang={language}/>
      </>
  );
}

const mapStateToProps = state => ({
  language: state.languageState,
});
export default connect(mapStateToProps)(App);
