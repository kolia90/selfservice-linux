import React, { useState, useEffect } from "react";
import styles from "./SelectPaymentStep2.module.scss";
import PaymentLevel from "./PaymentLevel";
import PaymentMastercard from "./PaymentMastercard";
import PaymentVisa from "./PaymentVisa";
import H2 from "../shared/h2/H2";
import InputMask from "react-input-mask";
import Button from "../shared/button/Button";
import Keyboard from "../shared/keyboard/Keyboard";

const SelectPaymentStep2 = ({ paymentType, cardData, handleButton }) => {
  const [pin, setPin] = useState("");
  const [securePin, setSecurePin] = useState("");

  useEffect(() => {
    let val = "*".repeat(pin.length);
    setSecurePin(val);
  }, [pin]);

  return (
    <div className={styles.container}>
      {paymentType === "level" && (
        <PaymentLevel styles={styles} onSelect={null} balance={cardData.balance} />
      )}
      {paymentType === "mastercard" && (
        <PaymentMastercard styles={styles} onSelect={null} number={cardData.number} />
      )}
      {paymentType === "visa" && (
        <PaymentVisa styles={styles} onSelect={null} number={cardData.number} />
      )}
      <div className={styles.wrapper}>
        <H2 text="Введите PIN-код" />
        <div className={styles.wrapperInput}>
          <InputMask
            mask="s s s s"
            formatChars={{ s: "['*']" }}
            maskChar="-"
            alwaysShowMask="true"
            value={securePin}
          />
        </div>
        <div className={styles.wrapperButton}>
          <Button title="Далее" onClick={handleButton} />
        </div>
        <div className={styles.wrapperKeyboard}>
          <Keyboard onChange={input => setPin(input)} />
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentStep2;
