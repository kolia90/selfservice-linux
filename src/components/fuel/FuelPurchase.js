import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import FuelPurchaseScreen1 from "./screen/FuelPurchaseScreen1";
import FuelPurchaseScreen2 from "./screen/FuelPurchaseScreen2";
import FuelPurchaseScreen3 from "./screen/FuelPurchaseScreen3";
import FuelPurchaseScreen4 from "./screen/FuelPurchaseScreen4";
import FuelPurchaseScreen5 from "./screen/FuelPurchaseScreen5";
import FuelPurchaseScreen6 from "./screen/FuelPurchaseScreen6";
import FuelPurchaseScreen7 from "./screen/FuelPurchaseScreen7";
import FuelPurchaseModal from "./FuelPurchaseModal";
import FuelStep from "./FuelStep";
import MPosService from "../../services/MPosService";
import mPosHelper from "../../helpers/mPosHelper";
import "./FuelPurchase.scss";

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
      finished: false
    }
  }

  setScreen = (value) => {
    this.setState({screen: value})
  };

  setNumber = (value) => {
    this.setState({number: value})
  };

  setFuel = (value) => {
    this.setState({fuel: value})
  };

  setOrder = (value) => {
    this.setState({order: value})
  };

  setShowModal = (value) => {
    this.setState({showModal: value})
  };

  setSpilled = (value) => {
    this.setState({spilled: value})
  };

  setFinished = (value) => {
    this.setState({finished: value})
  };

  checkProcess(){
    MPosService.getDispenserStatus(this.state.number, {
      onSuccess: (data) => {
        const result = mPosHelper.handleSpillProcess(data);
        if (result.is_ended){
            this.setSpilled({status: 'success', ...result});
            this.setScreen(7);
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

  componentDidUpdate(prevProps, prevState){
    if (!prevState.showModal && this.state.showModal){
      this.checkProcess()
    }
  }

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
              <FuelStep setScreen={this.setScreen} screen={this.state.screen} title={'ФОРМА ОПЛАТЫ'}>
                <FuelPurchaseScreen3 setScreen={this.setScreen} />
              </FuelStep>
          )}
          {this.state.screen === 4 && (
              <FuelStep setScreen={this.setScreen} screen={this.state.screen}>
                <FuelPurchaseScreen4 setShowModal={this.setShowModal} />
              </FuelStep>
          )}
          {this.state.screen === 5 && (
              <FuelStep setScreen={this.setScreen} screen={this.state.screen}>
                <FuelPurchaseScreen5
                    setScreen={this.setScreen} number={this.state.number} fuel={this.state.fuel}
                    setOrder={this.setOrder} setShowModal={this.setShowModal}
                />
              </FuelStep>
          )}
          {this.state.screen === 6 && (
              <FuelStep setScreen={this.setScreen} screen={this.state.screen}>
                <FuelPurchaseScreen6 setScreen={this.setScreen} />
              </FuelStep>
          )}
          {this.state.screen === 7 && (
              <FuelStep setScreen={this.setScreen} screen={this.state.screen} title={'ТОПЛИВО ОПЛАЧЕНО'}>
                <FuelPurchaseScreen7 order={this.state.order} spilled={this.state.spilled} />
              </FuelStep>
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

export default withRouter(FuelPurchase);
