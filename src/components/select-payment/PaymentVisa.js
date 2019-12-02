import React from "react";

const PaymentVisa = ({ styles, onSelect, number }) => {
  return (
    <div
      className={`${styles.rectangle} ${styles.paymentVisa}`}
      onClick={() => onSelect("visa", number)}
    >
      <div className={styles.cardNumber}>{number}</div>
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
