import WSClient from "./WSClient";

const constants = require('./constants');
const config = require('../settings/config');


export class CashService {
  static _client = null;

  static client = () => {
    if(CashService._client === null){
      CashService._client = new WSClient(config.cashWsUrl, {name: 'mPos', ...CashService.clientParams})
    }
    return CashService._client;
  };

  static default(params){
    return new CashService(params)
  }

  constructor(params){
    params = params || {};
    CashService.clientParams = params.clientParams;
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
    return CashService.client().send({
      Command: constants.CA_GET_STATUS,
    }, this.handler(...args), this.timeout(...args));
  }

  start(max_sum, ...args){
    return CashService.client().send({
      Command: constants.CA_START,
      MaxSum: max_sum
    }, this.handler(...args), this.timeout(...args));
  }

  stop(...args){
    return CashService.client().send({
      Command: constants.CA_STOP,
    }, this.handler(...args), this.timeout(...args));
  }

  clear(...args){
    return CashService.client().send({
      Command: constants.CA_CLEAR,
    }, this.handler(...args), this.timeout(...args));
  }
}

export default CashService.default({clientParams: {timeout: 5}})
