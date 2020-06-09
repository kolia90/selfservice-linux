import WSClient from "./WSClient";
import BaseWsService from "./BaseWsService";
const constants = require('./constants');
const config = require('../settings/config');


export class BankTermService extends BaseWsService{
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

  /* Terminal methods */

  getStatus(params){
    this.send({
      Command: constants.BT_GET_COMMAND_STATUS,
    }, params)
  }

}

export default BankTermService.default()
