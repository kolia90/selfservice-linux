import React from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import H1 from "../../shared/h1/H1";
import Button from "../../shared/button/Button";
import CashService from "../../../services/CashService";
import Toast from "../../shared/toast/Toast";
import "./CheckoutCash.scss";
import MultiLang from "../../../MultiLang";


class CheckoutCash extends React.Component {

  constructor(props) {
    super(props);

    this.statusIntervalId = null;
    this.state = {
      ready: false,
      amount: this.props.amount || 0,
      sum: 0,
    };
  }

  setIsReady = () => {
    this.setState({
      ready: true
    })
  };

  handleTimeout = () => {
    Toast(
        <MultiLang>
          {{
            uk: "Помилка зв'язку з купюроприймачем",
            ru: "Ошибка связи с купюроприемником",
            en: "Communication error with the bill acceptor"
          }}
        </MultiLang>
    )
  };

  componentDidMount() {
    CashService.getStatus({
      context: this.props,
      onSuccess: (data) => {
        const status = parseInt(data['Status']);
        if (status === CashService.CONST.STATUS_NOT_READY){
          Toast(
              <MultiLang>
                {{
                  uk: "Пристрій не готовий",
                  ru: "Устройство не готово",
                  en: "Device is not ready"
                }}
              </MultiLang>
          )
        } else {
          this.setState({
            sum: parseInt(data['Sum']) || 0
          });
          this.startCashProcess();
        }
      },
      onTimeout: this.handleTimeout,
    });
  }

  componentWillUnmount() {
    this.stopCheckStatus()
  }

  checkStatus = () => {
    CashService.getStatus({
      onSuccess: (data) => {
        const status = parseInt(data['Status']);
        if (status === CashService.CONST.STATUS_CLOSED){
          this.setIsReady()
        }
      },
      onTimeout: this.handleTimeout,
    });
  };

  startCheckStatus = () => {
    setTimeout(() => {
      try {
        this.checkStatus()
      }catch (e) {}
      this.startCheckStatus()
    }, 1000)
  };

  stopCheckStatus = () => {
    clearTimeout(this.statusIntervalId)
  };

  startCashProcess = () => {
    CashService.start(this.state.amount, {
      loading: false,
      onSuccess: (data) => {
        if(parseInt(data['SumReady']) === CashService.CONST.TRUE){
          this.setIsReady()
        }else{
          this.startCheckStatus()
        }
      },
      onTimeout: this.handleTimeout,
    })
  };

  stopCashProcess = () => {
    CashService.stop({
      onSuccess: (data) => {
        this.prop.onFinish()
      },
      onTimeout: this.handleTimeout,
    })
  };

  getNeedAmount = () => {
    return this.state.amount - this.state.sum
  };

  render() {
    return (
        <div className="wrapper-cash-process">
          <H1 text={
            <MultiLang>
              {{
                uk: "Внесіть готівку в купюроприймач",
                ru: "Внесите наличные средства в купюроприемник",
                en: "Deposit cash in the bill acceptor"
              }}
            </MultiLang>
          } />

          <div className="wrapper-img-cash-process">
            <img
                className="img-cash-process"
                src={require("../../../images/cash-process/insert-icon.svg")}
                alt="cash"
            />

            <div className="wrapper-toggle">
              <div className="wrapper-fuel">
                <h4 className="float-l">
                  <MultiLang>
                    {{
                      uk: "Внесено",
                      ru: "Внесено",
                      en: "Has"
                    }}
                  </MultiLang>
                </h4>
                <h4 className="float-r">{this.state.sum} <MultiLang>
                  {{
                    uk: "грн",
                    ru: "грн",
                    en: "uah"
                  }}
                </MultiLang></h4>
                <div className="clearfix" />
              </div>
              <div className="wrapper-sum">
                <h4 className="float-l">
                  <MultiLang>
                    {{
                      uk: "Залишилось",
                      ru: "Осталось",
                      en: "Need"
                    }}
                  </MultiLang>
                </h4>
                <h4 className="float-r">{this.getNeedAmount()} <MultiLang>
                  {{
                    uk: "грн",
                    ru: "грн",
                    en: "uah"
                  }}
                </MultiLang></h4>
                <div className="clearfix" />
              </div>
            </div>
          </div>

          <div className="wrapper-button two">
            <Button title={<MultiLang>
              {{
                uk: "Готово",
                ru: "Готово",
                en: "Done"
              }}
            </MultiLang>} disabled={!this.state.ready} onClick={() => {
              this.stopCashProcess();
            }} />
            <Button title="Принудительно" onClick={() => {
              this.props.onFinish();
            }} />
          </div>
        </div>
    );
  }
}

CheckoutCash.propTypes = {
  amount : PropTypes.number.isRequired,
  onFinish : PropTypes.func.isRequired,
};

export default connect()(withRouter(CheckoutCash));
