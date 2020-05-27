import WSClient from "./WSClient";
import {setLoading} from "../store/actions";

const constants = require('./constants');
const config = require('../settings/config');


export class BankTermService {
  static _client = null;

  CONST = {
    TRUE: 1,
    FALSE: 0
  };

  getClient = () => {
    if(BankTermService._client === null){
      BankTermService._client = new WSClient(config.bankTermWsUrl, {name: 'Term', ...this.clientParams})
    }
    return BankTermService._client;
  };

  static default(params){
    window.bank = new BankTermService(params);
    return new BankTermService(params)
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
    this.getClient().send(data, this.getHandler(params), this.getTimeout(params));
  };

  /* Terminal methods */

  getStatus(params){
    this.send({
      Command: constants.BT_GET_COMMAND_STATUS,
    }, params)
  }

}

export default BankTermService.default()
