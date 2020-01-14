import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import Header from "../shared/header/Header";
import H1 from "../shared/h1/H1";
import PreviousPage from "../shared/previous-page/PreviousPage";
import Button from "../shared/button/Button";
import CashService from "../../services/CashService";
import Toast from "../shared/toast/Toast";
import "./CashProcess.scss";


class CashProcess extends React.Component {

  constructor(props) {
    super(props);

    this.statusIntervalId = null;
    this.state = {
      ready: false,
      amount: this.props.amount,
      sum: 0,
    };
  }

  setIsReady = () => {
    this.setState({
      ready: true
    })
  };

  handleTimeout = () => {
    Toast('Ошибка связи с купюроприемником')
  };

  componentDidMount() {
    CashService.getStatus({
      onSuccess: (data) => {
        const status = parseInt(data['Status']);
        if (status === 0){
          Toast('Устройство не готово')
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
          if (status === 1){
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
      onSuccess: (data) => {
        if(parseInt(data['SumReady']) === 1){
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
      onSuccess: (data) => {},
      onTimeout: this.handleTimeout,
    })
  };

  getNeedAmount = () => {
    return this.state.amount - this.state.sum
  };

  render() {
    return (
      <div>
        <Header
          left={<PreviousPage onClick={() => this.props.history.goBack()} />}
          center={<div>Внесение наличных</div>}
          right={null}
        />
        <div className="wrapper-cash-process">
          <H1 text="Внесите наличные средства в купюроприемник" />

          <div className="wrapper-img-cash-process">
            <img
                className="img-cash-process"
                src={require("../../images/cash-process/insert-icon.svg")}
                alt="cash"
            />

            <div className="wrapper-toggle">
              <div className="wrapper-fuel">
                <h4 className="float-l">Внесено</h4>
                <h4 className="float-r">{this.state.sum} грн</h4>
                <div className="clearfix" />
              </div>
              <div className="wrapper-sum">
                <h4 className="float-l">Остаток</h4>
                <h4 className="float-r">{this.getNeedAmount()} грн</h4>
                <div className="clearfix" />
              </div>
            </div>
          </div>

          <div className="wrapper-button">
            <Button title="Готово" disabled={!this.state.ready} onClick={() => {
              this.stopCashProcess();
              this.prop.onFinish()
            }} />
          </div>
        </div>
      </div>
    );
  }
}

CashProcess.propTypes = {
  amount : PropTypes.number.isRequired,
  onFinish : PropTypes.func.isRequired,
};


export default withRouter(CashProcess);
