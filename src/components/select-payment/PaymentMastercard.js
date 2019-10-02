import React from "react";

const PaymentMastercard = ({ styles, onSelectPayment }) => {
  return (
    <div
      className={`${styles.rectangle} ${styles.paymentMastercard}`}
      onClick={() => onSelectPayment("mastercard")}
    >
      <div className={styles.cardNumber}>**** **** **** 1928</div>
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
