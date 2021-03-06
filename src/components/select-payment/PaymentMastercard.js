import React from "react";

const PaymentMastercard = ({ styles, onSelect, number }) => {
  return (
    <div
      className={`${styles.rectangle} ${styles.paymentMastercard}`}
      onClick={() => onSelect("mastercard", number)}
    >
      <div className={styles.cardNumber}>{number}</div>
      <div className={styles.wrapperImg}>
        <img
          className={styles.imgMastercard}
          src={require("../../images/mc/mc.png")}
          alt="mastercard"
        />
      </div>
    </div>
  );
};

export default PaymentMastercard;
