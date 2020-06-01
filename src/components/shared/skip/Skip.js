import React from "react";
import "./Skip.scss";
import MultiLang from "../../../MultiLang";

const Skip = ({ text, onSkip }) => {
  return (
    <div className="skip" onClick={onSkip}>
      <MultiLang>
        {{
          uk: "Пропустити",
          ru: "Пропустить",
          en: "Skip"
        }}
      </MultiLang>
    </div>
  );
};

export default Skip;
