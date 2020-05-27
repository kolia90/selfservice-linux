import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import H2 from "../../shared/h2/H2";
import Button from "../../shared/button/Button";
import ConfirmAlert from "../../shared/confirm-alert/ConfirmAlert";
import MPosService from "../../../services/MPosService";
import "./FuelPurchaseScreen3.scss";
import constants from '../constants'
import APIService from "../../../services/APIService";

const config = require('../../../settings/config');


class FuelPurchaseScreen3 extends React.Component {
  // прозрачный pixel для заглушки, пока не загрузилось лого топлива
  px = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  constructor(props) {
    super(props);

    const initialVolume = 10;
    this.tank = this.props.fuel['Tank'];
    this.price = this.tank['Price'] / 100;

    this.state = {
      volume: initialVolume,
      sum: initialVolume * this.price,
      activeTab: 1,
      logo: this.px,
    };
  }

  setVolume = (value) => {
    let volume = parseInt(value);
    let sum = this.round(volume * this.price);

    this.setState({
      volume: volume,
      sum: sum
    })
  };

  setSum = (value) => {
    let sum = parseInt(value);
    let volume = this.round(sum / this.price);

    this.setState({
      sum: sum,
      volume: volume
    })
  };

  setActiveTab = (value) => {
    this.setState({
      activeTab: value
    })
  };

  round = (v) => {
    return Math.round(v * 100) / 100
  };

  submit = (volume, amount, full_tank) => {
    let by;
    full_tank && (by = constants.by.FULL_TANK);
    volume && (by = constants.by.VOLUME);
    amount && (by = constants.by.AMOUNT);

    if(full_tank) volume = config.fullTankVolume;
    let value = amount ? amount * 100 : volume * 100;

    let number = this.props.number;
    let nozzle_number = this.props.fuel['NozzleNumber'];
    let is_money = !!amount;

    MPosService.addFuelToBasket(number, nozzle_number, is_money, value, {
        context: this.props,
        onSuccess: (data) => {
          this.props.setOrder({
            by: by,
            amount: this.state.sum,
            volume: this.state.volume,
            fuel: {
              name: this.tank['FuelName'],
              price: this.price
            }
          }, () => {
            this.props.pay(this.state.sum);
          });
        }, onError: () => {}
    })
  };

  submitFull = () => {
    this.submit(null, null, true)
  };

  submitVariable = () => {
    if (this.state.activeTab === 1){
      this.submit(this.state.volume, null, false)
    }else{
      this.submit(null, this.state.sum, false)
    }
  };

  componentDidMount() {
    const isPay = this.props.history.location.state && this.props.history.location.state.pay;
    isPay && this.pay();

    APIService.getFuelByShort(this.tank['FuelShortName'],{
      loading: false,
      notifyDisabled: true,
      onSuccess: (response) => {
        this.setState({
          logo: response.data.logo
        });
      }
    });
  }

  render() {
    return (
        <div className="wrapper-screen-3">
          <H2 text="Выберите параметр топливо/сумма и потяните ползунок до необходимых значений" />

          <div className="wrapper-img">
            <div className="img">
              <img className="fuel-logo" src={this.state.logo} alt="" />
              <ConfirmAlert
                  onConfirm={this.submitFull}
                  message={'Заправить до полного бака?'}
                  btnYes={'Наливай'}
                  wrapperClassName={'big'}
                  className={'full-tank'}>
                <div>
                  <img
                      src={require("../../../images/fuel-purchase/group-6.svg")}
                      alt=""
                  />
                  Заправить полный бак
                </div>
              </ConfirmAlert>
            </div>
            <H2 text={`Цена: ${this.price} грн/л`} />
          </div>

          <div className="wrapper-description">
            <div
                className={`quantity ${this.state.activeTab === 1 ? "active" : ""}`}
                onClick={() => {
                  this.setActiveTab(1);
                }}
            >
              <H2 text="Количество топлива" />
              <div className="float-r">{this.state.volume} л</div>
            </div>
            <div
                className={`sum ${this.state.activeTab === 2 ? "active" : ""}`}
                onClick={() => {
                  this.setActiveTab(2);
                }}
            >
              <H2 text="Сумма" />
              <div className="float-r">{this.state.sum} грн</div>
            </div>
          </div>

          <div className="wrapper-input-range">
            <div className="float-l">
              <img
                  src={require("../../../images/fuel-purchase/group-5.svg")}
                  alt=""
                  onClick={() => {
                    if (this.state.activeTab === 1) {
                      const value = this.state.volume - 1 >= 0 ? this.state.volume - 1 : 0;
                      this.setVolume(value);
                    } else {
                      const value = this.state.sum - 1 >= 0 ? this.state.sum - 1 : 0;
                      this.setSum(value);
                    }
                  }}
              />
            </div>
            <div className="float-l slidecontainer range">
              {this.state.activeTab === 1 && (
                  <div className="container tab-fuel">
                    <div className="wrapper-slider-scale-large">
                      <input
                          className="slider"
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          id="rangeInput"
                          value={this.state.volume}
                          onChange={e => {
                            const value = (e && e.target.value) || 0;
                            this.setVolume(parseInt(value));
                          }}
                      />
                    </div>
                  </div>
              )}
              {this.state.activeTab === 2 && (
                  <div className="container tab-sum">
                    <div className="wrapper-slider-scale-large">
                      <input
                          className="slider"
                          type="range"
                          min="0"
                          max="2000"
                          step="1"
                          id="rangeInput"
                          value={this.state.sum}
                          onChange={e => {
                            const value = (e && e.target.value) || 0;
                            this.setSum(parseInt(value));
                          }}
                      />
                    </div>
                  </div>
              )}
            </div>
            <div className="float-l">
              <img
                  src={require("../../../images/fuel-purchase/group-8.svg")}
                  alt=""
                  onClick={() => {
                    if (this.state.activeTab === 1) {
                      const value = this.state.volume + 1 < 100 ? this.state.volume + 1 : 100;
                      this.setVolume(value);
                    } else {
                      const value = this.state.sum + 1 < 2000 ? this.state.sum + 1 : 2000;
                      this.setSum(value);
                    }
                  }}
              />
            </div>
            <div className="clear-fix" />
          </div>

          <div className="wrapper-button">
            <Button
                title="Оплатить и заправить"
                onClick={this.submitVariable}
            />
          </div>
        </div>
    )
  }
}

export default connect()(withRouter(FuelPurchaseScreen3));
