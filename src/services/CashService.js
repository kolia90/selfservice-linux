import WSClient from "./WSClient";
import {setLoading} from "../store/actions";

const constants = require('./constants');
const config = require('../settings/config');


export class CashService {
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

  constructor(params){
    params = params || {};
    this.clientParams = params.clientParams;
  }

  setLoading(params, value){
    if(!params || params.loading === false || params.loading === null) return;
    try{
      params.context && params.context.dispatch(setLoading(value))
    }catch (e) {}
  }

  getHandler = (params) => {
    return (data) => {
      this.setLoading(params, false);
      params && params.onSuccess && params.onSuccess(data)
    }
  };

  getTimeout = (params) => {
    return () => {
      this.setLoading(params, false);
      params && params.onTimeout && params.onTimeout();
    }
  };

  send = (data, params) => {
    this.setLoading(params, true);
    this.getClient().send(data, this.getHandler(params), this.getTimeout(params), params);
  };

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
