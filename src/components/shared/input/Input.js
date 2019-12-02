import React from "react";
import "./input.scss";

const Input = ({ handleChange, value, type = "text", placeholder = "" }) => {
  return (
    <div className="wrapper-input">
      <input
        autoFocus
        className="input"
        type={type}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
