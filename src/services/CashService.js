import WSClient from "./WSClient";
import BaseWsService from "./BaseWsService";
const constants = require('./constants');
const config = require('../settings/config');


export class CashService extends BaseWsService{
  static _client = null;

  CONST = {
    TRUE: 1,
    FALSE: 0,

    STATUS_NOT_READY: 0,
    STATUS_CLOSED: 1,
    STATUS_OPEN: 2,
  };

  getClient = () => {
    if(CashService._client === null){
      CashService._client = new WSClient(config.cashWsUrl, {name: 'Cash', ...this.clientParams})
    }
    return CashService._client;
  };

  static default(params){
    window.cash = new CashService(params);
    return new CashService(params)
  }

  /* Cash methods */

  getStatus(params){
    this.send({
      Command: constants.CA_GET_STATUS,
    }, params)
  }

  start(max_sum, params){
    this.send({
      Command: constants.CA_START,
      MaxSum: max_sum
    }, params)
  }

  stop(params){
    this.send({
      Command: constants.CA_STOP,
    }, params)
  }

  clear(params){
    this.send({
      Command: constants.CA_CLEAR,
    }, params)
  }
}

export default CashService.default()
