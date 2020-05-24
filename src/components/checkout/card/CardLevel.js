import React from "react";

const CardLevel = ({ styles, onSelect, balance }) => {
  return (
    <div
      className={`${styles.rectangle} ${styles.paymentLevel}`}
      onClick={onSelect}
    >
      <img
        src={require("../../../images/level/group-4.png")}
        alt="level"
      />
      <div className={styles.wrapperInfoLevel}>
        <div className={styles.text}>Бонусные баллы:</div>
        <div className={`${styles.text} ${styles.textSum}`}>{balance} грн</div>
      </div>
      <div className={styles.wrapperImg}>
        <img
          className={styles.imgLevel}
          src={require("../../../images/level/level-2.png")}
          alt="level"
        />
      </div>
    </div>
  );
};

export default CardLevel;
