import React from "react";
import "./Skip.scss";

const Skip = ({ text, onSkip }) => {
  return (
    <div className="skip" onClick={onSkip}>
      Пропустить
    </div>
  );
};

export default Skip;
