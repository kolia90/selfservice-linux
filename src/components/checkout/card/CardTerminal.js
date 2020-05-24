import React from "react";

const CardTerminal = ({ styles, onSelect }) => {
  return (
    <div
      className={`${styles.rectangle} ${styles.paymentTerminal}`}
      onClick={onSelect}
    >
      <img
        src={require("../../../images/level/group-4.png")}
        alt="level"
      />
      <div className={styles.wrapperInfoLevel}>
        <div className={styles.text}>Пластиковая карта</div>
      </div>
    </div>
  );
};

export default CardTerminal;
