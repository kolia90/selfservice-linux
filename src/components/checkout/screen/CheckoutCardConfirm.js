import React, { useState, useEffect } from "react";
import styles from "./CheckoutCardConfirm.module.scss";
import CardLevel from "../card/CardLevel";
import CardMastercard from "../card/CardMastercard";
import CardVisa from "../card/CardVisa";
import H2 from "../../shared/h2/H2";
import InputMask from "react-input-mask";
import Button from "../../shared/button/Button";
import Keyboard from "../../shared/keyboard/Keyboard";
import CardTerminal from "../card/CardTerminal";
import Toast from "../../shared/toast/Toast";
import constants from "../constants";
import MultiLang from "../../../MultiLang";


const CheckoutCardConfirm = ({ cardData, onConfirm }) => {
  const [pin, setPin] = useState("");
  const [securePin, setSecurePin] = useState("");

  const [keyboardRef, setKeyboardRef] = useState("");

  useEffect(() => {
    let val = "*".repeat(pin.length);
    setSecurePin(val);
  }, [pin]);

  const handlePin = (input) => {
    if(input.length > 4){
      keyboardRef.keyboard.setInput(pin)
    }else{
      setPin(input)
    }
  };

  const handleButton = () => {
    if (pin.length < 4){
      Toast(
        <MultiLang>
          {{
            uk: "Введіть корректний PIN",
            ru: "Введите корректный PIN",
            en: "Please enter correct PIN"
          }}
        </MultiLang>
      )
    }else{
      onConfirm && onConfirm(pin)
    }
  };

  return (
      <div className={styles.container}>
        {cardData.type === constants.cards.TERMINAL && (
            <CardTerminal styles={styles} onSelect={null} />
        )}
        {cardData.type === constants.cards.LEVEL && (
            <CardLevel styles={styles} onSelect={null} balance={cardData.balance} />
        )}
        {cardData.type === constants.cards.MASTERCARD && (
            <CardMastercard styles={styles} onSelect={null} number={cardData.number} />
        )}
        {cardData.type === constants.cards.VISA && (
            <CardVisa styles={styles} onSelect={null} number={cardData.number} />
        )}
        <div className={styles.wrapper}>
          <H2 text={
            <MultiLang>
              {{
                uk: "Введіть PIN-код",
                ru: "Введите PIN-код",
                en: "Enter PIN-code"
              }}
            </MultiLang>
          } />
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
            <Button title={
              <MultiLang>
                {{
                  uk: "Дальше",
                  ru: "Далее",
                  en: "Next"
                }}
              </MultiLang>
            } onClick={handleButton} />
          </div>
          <div className={styles.wrapperKeyboard}>
            <Keyboard onChange={input => handlePin(input)} onRef={r => setKeyboardRef(r)} />
          </div>
        </div>
      </div>
  );
};

export default CheckoutCardConfirm;
