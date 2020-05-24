import React from "react";
import { withRouter } from "react-router-dom";
import CheckoutPayType from "./screen/CheckoutPayType"
import CheckoutCard from "./screen/CheckoutCard"
import CheckoutCardConfirm from "./screen/CheckoutCardConfirm";
import CheckoutStep from "./CheckoutStep";
import CheckoutRest from "./screen/CheckoutRest";
import constants from "./constants";
import CheckoutCash from "./screen/CheckoutCash";
import MPosService from "../../services/MPosService";
import {setLoading} from "../../store/actions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Toast from "../shared/toast/Toast";

class Checkout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStep: constants.steps.PAY_TYPE,
      payType: null,
      cardData: null,
      confirmPin: null,
      restType: null
    };
  }

  setCurrentStep = (step) => {
    this.setState({
      currentStep: step
    })
  };

  complete = () => {
    this.props.onComplete && this.props.onComplete(
        this.state.payType, this.state.cardData, this.state.confirmPin, this.state.restType
    )
  };

  processCheckout = () => {
    const isByCard = (this.state.payType === constants.pay_types.CARD);

    if(isByCard && this.state.cardData.type !== constants.cards.TERMINAL){
      this.complete()
    }else{
      const basketPayType = isByCard ? MPosService.PAY_TYPE_CARD : MPosService.PAY_TYPE_MONEY;

      this.props.dispatch(setLoading(true));
      MPosService.setBasketParams(null, basketPayType, {
        onSuccess: (data) => {
          this.props.dispatch(setLoading(false));
          this.complete()
        }, onError: () => {
          this.props.dispatch(setLoading(false));
        }, onTimeout: () => {
          this.props.dispatch(setLoading(false));
          Toast("Сервер не отвечает")
        }
      });
    }
  };

  handlePayType = (type) => {
    this.setState({
      payType: type
    }, () => {
      if(type === constants.pay_types.CARD){
        if(this.props.user){
          this.setCurrentStep(constants.steps.CARD)
        }else{
          this.handleSelectCard(constants.cards.TERMINAL)
        }
      }else{
        this.setCurrentStep(constants.steps.REST_TYPE)
      }
    });
  };

  handleSelectCard = (type, number, balance, card_id) => {
    this.setState({
      cardData: {
        type: type || null,
        number: number || null,
        balance: balance || null,
        card_id: card_id || null
      }
    }, () => {
      if (type === constants.cards.TERMINAL){
        this.processCheckout()
      }else{
        this.setCurrentStep(constants.steps.CARD_CONFIRM);
      }
    });
  };

  handleRestType = (type) => {
    this.setState({
      restType: type
    }, () => {
      this.setCurrentStep(constants.steps.CASH)
    });
  };

  handleConfirmCard = (pin) => {
    this.setState({
      confirmPin: pin
    }, () => {
      this.processCheckout()
    })
  };

  handleFinishCash = () => {
    this.processCheckout()
  };

  render() {
    return (
      <>
      {this.state.currentStep === constants.steps.PAY_TYPE && (
          <CheckoutStep title="Форма оплаты">
            <CheckoutPayType onSelectType={this.handlePayType} />
          </CheckoutStep>
      )}

      {this.state.currentStep === constants.steps.CARD && (
          <CheckoutStep navPrev={() => {this.setCurrentStep(constants.steps.PAY_TYPE)}}>
            <CheckoutCard onSelectCard={this.handleSelectCard} />
          </CheckoutStep>
      )}
      {this.state.currentStep === constants.steps.CARD_CONFIRM && (
          <CheckoutStep navPrev={() => {this.setCurrentStep(constants.steps.CARD)}}>
            <CheckoutCardConfirm cardData={this.state.cardData} onConfirm={this.handleConfirmCard} />
          </CheckoutStep>
      )}

      {this.state.currentStep === constants.steps.REST_TYPE && (
          <CheckoutStep navPrev={() => {this.setCurrentStep(constants.steps.PAY_TYPE)}}>
            <CheckoutRest onSelectRest={this.handleRestType} />
          </CheckoutStep>
      )}
      {this.state.currentStep === constants.steps.CASH && (
          <CheckoutStep title="Внесение наличных" navPrev={() => {this.setCurrentStep(constants.steps.REST_TYPE)}}>
            <CheckoutCash onFinish={this.handleFinishCash} amount={this.props.amount} />
          </CheckoutStep>
      )}
      </>
    )
  }
}

Checkout.propTypes = {
  amount : PropTypes.number.isRequired,
  onComplete : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.userState
});

export default connect(mapStateToProps)(withRouter(Checkout));