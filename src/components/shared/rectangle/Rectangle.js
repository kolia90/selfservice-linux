// @flow
import React from "react";
import "./Rectangle.scss";

const Rectangle = props => {
  return <div className="rectangle">{props.children}</div>;
};

export default Rectangle;
