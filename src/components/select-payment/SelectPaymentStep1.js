import React from "react";
import styles from "./SelectPaymentStep1.module.scss";
import PaymentLevel from "./PaymentLevel";
import PaymentVisa from "./PaymentVisa";
import PaymentMastercard from "./PaymentMastercard";

const SelectPaymentStep1 = ({ onSelectPayment }) => {
  return (
    <div className="container">
      <PaymentLevel styles={styles} onSelectPayment={onSelectPayment} />
      <PaymentMastercard styles={styles} onSelectPayment={onSelectPayment} />
      <PaymentVisa styles={styles} onSelectPayment={onSelectPayment} />
    </div>
  );
};

export default SelectPaymentStep1;
