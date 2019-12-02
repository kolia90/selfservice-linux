import React, { useState } from "react";
import styles from "./SelectPayment.module.scss";
import Header from "../shared/header/Header";
import SelectPaymentStep1 from "./SelectPaymentStep1";
import SelectPaymentStep2 from "./SelectPaymentStep2";
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import PreviousPage from "../shared/previous-page/PreviousPage";

const SelectPayment = ({ history }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentType, setPaymentType] = useState("");
  const [cardData, setCardData] = useState(null);

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

  const handleSelectPayment = (paymentType, number, balance, card_id) => {
    setPaymentType(paymentType);
    setCardData({
      number: number || null,
      balance: balance || null,
      card_id: card_id || null
    });
    setCurrentStep(2);
  };

  const navPrev = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
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
            cardData={cardData}
            handleButton={handleButton}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(SelectPayment);
