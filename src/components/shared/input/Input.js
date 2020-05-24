import React from "react";
import "./Input.scss";

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
