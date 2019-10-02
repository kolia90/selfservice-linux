import React from "react";

const PaymentVisa = ({ styles, onSelectPayment }) => {
  return (
    <div
      className={`${styles.rectangle} ${styles.paymentVisa}`}
      onClick={() => onSelectPayment("visa")}
    >
      <div className={styles.cardNumber}>**** **** **** 5819</div>
      <div className={styles.wrapperImg}>
        <img
          className={styles.imgVisa}
          src={require("../../images/visa/visa.png")}
          alt="visa"
        />
      </div>
    </div>
  );
};

export default PaymentVisa;
