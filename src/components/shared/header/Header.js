import React from "react";
import "./Header.scss";
import Logo from "../logo/Logo";
import Lang from "../lang/Lang";

const Header = ({ left = <Logo />, center, right = <Lang /> }) => {
  return (
    <div className="header">
      <div className="float-l">{left}</div>
      <div className="float-l title">{center}</div>
      <div className="float-r">{right}</div>
      <div className="clearfix" />
    </div>
  );
};

export default Header;
