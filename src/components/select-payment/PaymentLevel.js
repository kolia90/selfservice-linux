import React from "react";

const PaymentLevel = ({ styles, onSelectPayment }) => {
  return (
    <div
      className={`${styles.rectangle}`}
      onClick={() => onSelectPayment("level")}
    >
      <img
        className={`${styles.paymentLevel}`}
        src={require("../../images/level/group-4.png")}
        alt="level"
      />
      <div className={styles.wrapperInfoLevel}>
        <div className={styles.text}>Бонусные баллы:</div>
        <div className={`${styles.text} ${styles.textSum}`}>10 грн</div>
      </div>
      <div className={styles.wrapperImg}>
        <img
          className={styles.imgLevel}
          src={require("../../images/level/level-2.png")}
          alt="level"
        />
      </div>
    </div>
  );
};

export default PaymentLevel;
