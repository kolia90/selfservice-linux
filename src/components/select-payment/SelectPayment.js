import React, { useState } from "react";
import styles from "./SelectPayment.module.scss";
import Header from "../shared/header/Header";
import SelectPaymentStep1 from "./SelectPaymentStep1";
import SelectPaymentStep2 from "./SelectPaymentStep2";
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import PreviousPage from "../shared/previous-page/PreviousPage";

const SelectPayment = ({ history }) => {
  const [currentStep, setCureentStep] = useState(1);
  const [paymentType, setPaymentType] = useState("");

  const handleButton = () => {
    if (
      history &&
      history.location.state &&
      history.location.state.route === "/fuel-purchase"
    ) {
      history.push(`${routes.FUEL_PURCHASE}`, {
        screen: 5
      });
    } else {
      history.push(`${routes.PAYMENT_CHECK_CATALOG}`);
    }
  };

  const handleSelectPayment = paymentType => {
    setPaymentType(paymentType);
    setCureentStep(2);
  };

  const navPrev = () => {
    if (currentStep === 2) {
      setCureentStep(1);
    } else {
      if (
        history &&
        history.location.state &&
        history.location.state.route === "/fuel-purchase"
      ) {
        history.push(`${routes.FUEL_PURCHASE}`, {
          screen: 3
        });
      } else {
        history.goBack();
      }
    }
  };

  return (
    <div>
      <Header
        left={<PreviousPage onClick={() => navPrev()} />}
        center="ВЫБЕРИТЕ СПОСОБ ОПЛАТЫ"
        right={null}
      />
      <div>
        {currentStep === 1 ? (
          <SelectPaymentStep1
            styles={styles}
            onSelectPayment={handleSelectPayment}
          />
        ) : (
          <SelectPaymentStep2
            styles={styles}
            paymentType={paymentType}
            handleButton={handleButton}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(SelectPayment);
