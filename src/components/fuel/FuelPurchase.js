import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import Modal from "react-modal";
import FuelPurchaseScreen1 from "./screen/FuelPurchaseScreen1";
import FuelPurchaseScreen2 from "./screen/FuelPurchaseScreen2";
import FuelPurchaseScreen3 from "./screen/FuelPurchaseScreen3";
import FuelPurchaseScreen4 from "./screen/FuelPurchaseScreen4";
import FuelPurchaseModal from "./FuelPurchaseModal";
import FuelStep from "./FuelStep";
import MPosService from "../../services/MPosService";
import mPosHelper from "../../helpers/mPosHelper";
import {setLoading} from "../../store/actions";
import Checkout from "../checkout/Checkout";
import pay_const from "../checkout/constants";
import APIService from "../../services/APIService";
import constants from "./constants";

Modal.setAppElement("#root");

class FuelPurchase extends Component {

  constructor(props) {
    super(props);
    this.ws = null;
    this.state = {
      screen: 1,
      showModal: false,
      number: 2,
      fuel: null,
      order: null,
      spilled: {},
      finished: false,
      amount: null
    }
  }

  setScreen = (value, ...args) => {
    this.setState({screen: value}, ...args)
  };

  setNumber = (value, ...args) => {
    this.setState({number: value}, ...args)
  };

  setFuel = (value, ...args) => {
    this.setState({fuel: value}, ...args)
  };

  setOrder = (value, ...args) => {
    this.setState({order: value}, ...args)
  };

  setShowModal = (value, ...args) => {
    this.setState({showModal: value}, ...args)
  };

  setSpilled = (value, ...args) => {
    this.setState({spilled: value}, ...args)
  };

  setFinished = (value, ...args) => {
    this.setState({finished: value}, ...args)
  };

  setAmount = (value, ...args) => {
    this.setState({amount: value}, ...args)
  };

  checkProcess(){
    MPosService.getDispenserStatus(this.state.number, {
      onSuccess: (data) => {
        const result = mPosHelper.handleSpillProcess(data);
        if (result.is_ended){
            this.setSpilled({status: 'success', ...result});
            this.setScreen(4);
            this.setFinished(true);
            this.setShowModal(false);
        }else{
          this.setSpilled(result);

          setTimeout(() => {
            this.checkProcess()
          }, 500)
        }
      }
    })
  }

  pay = (amount) => {
    this.setAmount(amount, () => {
      this.setScreen(5)
    });
  };

  finishByLocal = () => {
    this.props.dispatch(setLoading(true));

    MPosService.getBasketData({
      onSuccess: (data) => {
        // TODO: check
        const sum = data.FuelData.TotalSum;

        MPosService.fiscalCheck(data, sum, {
          onSuccess: (data) => {
            this.props.dispatch(setLoading(false));
            // START check process
            this.checkProcess()
          }, onError: () => {
            this.props.dispatch(setLoading(false));
          }, onTimeout: () => {
            this.props.dispatch(setLoading(false));
          }
        })
      }, onError: () => {
        this.props.dispatch(setLoading(false));
      }, onTimeout: () => {
        this.props.dispatch(setLoading(false));
      }
    })
  };

  finishByBackend = (cardData, confirmPin) => {
    let orderData = {
      dispenser_id: this.state.number,
      level_number: this.props.levelNumber
    };
    if(this.state.order){
      (this.state.order.by === constants.by.AMOUNT) && (orderData['amount'] = this.state.order.amount);
      (this.state.order.by === constants.by.VOLUME) && (orderData['volume'] = this.state.order.volume);
      (this.state.order.by === constants.by.FULL_TANK) && (orderData['full_tank'] = true);
    }

    this.props.dispatch(setLoading(true));
    APIService.setFuelOrder(orderData, {
      onSuccess: (response) => {
        let checkoutData = {
          order: response.id,
        };

        if(cardData.type === pay_const.cards.LEVEL){
          checkoutData['only_bonus'] = true;
          checkoutData['bonus_pin'] = confirmPin;
        }else{
          checkoutData['card'] = cardData.card_id;
          checkoutData['pin'] = confirmPin;
        }

        APIService.checkoutOrder(checkoutData, this.props.user.token, {
          onSuccess: (response) => {
            this.props.dispatch(setLoading(false));
            this.setScreen(4);
          },
          onError: () => {
            this.props.dispatch(setLoading(false));
          }
        });
      },
      onError: () => {
        this.props.dispatch(setLoading(false));
      }
    });

    MPosService.basketClear()
  };

  handleComplete = (payType, cardData, confirmPin, restType) => {
    if(payType === pay_const.pay_types.CARD && cardData.type !== pay_const.cards.TERMINAL) {
      this.finishByBackend(cardData, confirmPin)
    }else {
      this.setShowModal(true);
      this.finishByLocal();
    }
  };

  render(){
    return (
        <>
          {this.state.screen === 1 && (
              <FuelStep setScreen={this.setScreen} screen={this.state.screen}>
                <FuelPurchaseScreen1
                    setScreen={this.setScreen} screen={this.state.screen}
                    setNumber={this.setNumber} number={this.state.number}
                    setFuel={this.setFuel}
                />
              </FuelStep>
          )}
          {this.state.screen === 2 && (
              <FuelStep setScreen={this.setScreen} screen={this.state.screen}>
                <FuelPurchaseScreen2
                    setScreen={this.setScreen} number={this.state.number} setFuel={this.setFuel}
                />
              </FuelStep>
          )}
          {this.state.screen === 3 && (
              <FuelStep setScreen={this.setScreen} screen={this.state.screen}>
                <FuelPurchaseScreen3
                    setScreen={this.setScreen} number={this.state.number} fuel={this.state.fuel}
                    setOrder={this.setOrder} pay={this.pay}
                />
              </FuelStep>
          )}
          {this.state.screen === 4 && (
              <FuelStep setScreen={this.setScreen} screen={this.state.screen} title={'Топливо оплачено'}>
                <FuelPurchaseScreen4 order={this.state.order} spilled={this.state.spilled} />
              </FuelStep>
          )}
          {this.state.screen === 5 && (
              <Checkout amount={this.state.amount} onComplete={this.handleComplete} />
          )}
          {this.state.showModal && !this.state.finished && (
              <Modal
                  ariaHideApp={false}
                  className="modal"
                  overlayClassName="overlay"
                  isOpen={this.state.showModal}
                  onRequestClose={() => this.setShowModal(false)}
              >
                <FuelPurchaseModal order={this.state.order} spilled={this.state.spilled} />
              </Modal>
          )}
        </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState,
  levelNumber: state.levelState
});

export default connect(mapStateToProps)(withRouter(FuelPurchase));
