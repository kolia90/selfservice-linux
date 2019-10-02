import React from "react";
import "./RegisterLine.scss";

const RegisterLine = ({
  registerLineSvg,
  setRegisterLineSvg,
  currentStep,
  processActiveWidth
}) => {
  return (
    <div className="wrapper-register-line">
      <div className={`${!registerLineSvg ? "height" : ""}`} />
      <div className={`wrapper-img-1 ${registerLineSvg ? "height" : ""}`}>
        <div
          className={`wrapper-img-2 ${registerLineSvg ? "height" : ""}`}
          style={{ width: processActiveWidth }}
        >
          {registerLineSvg && (
            <>
              {[1, 2, 3, 4, 5, 6].map(i => {
                return (
                  <span
                    key={i}
                    className={`${currentStep - 1 >= i ? "active" : ""}`}
                  >
                    {i}
                  </span>
                );
              })}
            </>
          )}
          <img
            onLoad={() => setRegisterLineSvg()}
            src={require("../../../images/register-line/register-line-invert.svg")}
            alt="register line"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterLine;
