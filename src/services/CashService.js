import WSClient from "./WSClient";
import Toast from "../components/shared/toast/Toast";

const constants = require('./constants');
const config = require('../settings/config');

const cash = new WSClient(config.cashWsUrl, {name: 'Cash'});


export class CashService {
  static default(){
    return new CashService()
  }

  handler = (config) => {
    return function (data) {
      config && config.onSuccess && config.onSuccess(data)
    }
  };

  timeout = (config) => {
    return () => {
      config && config.onTimeout && config.onTimeout();
    }
  };

  /* Cash methods */

  getStatus(...args){
    return cash.send({
      Command: constants.CA_GET_STATUS,
    }, this.handler(...args), this.timeout(...args));
  }

  start(max_sum, ...args){
    return cash.send({
      Command: constants.CA_START,
      MaxSum: max_sum
    }, this.handler(...args), this.timeout(...args));
  }

  stop(...args){
    return cash.send({
      Command: constants.CA_STOP,
    }, this.handler(...args), this.timeout(...args));
  }

  clear(...args){
    return cash.send({
      Command: constants.CA_CLEAR,
    }, this.handler(...args), this.timeout(...args));
  }
}

export default new CashService()
