import Toast from "../components/shared/toast/Toast";
import WSClient from "./WSClient";

const constants = require('./constants');
const config = require('../settings/config');


export class MPosService {
  static _client = null;

  static client = (params) => {
    if(MPosService._client === null){
      MPosService._client = new WSClient(config.mPosWsUrl, {name: 'mPos', ...params})
    }
    return MPosService._client;
  };

  LANG_MAP = {
    en: 0,
    ua: 1,
    ru: 2
  };

  static default(){
    return new MPosService()
  }

  constructor(operatorId, lang){
    this.operatorId = operatorId || '1001';
    this.lang = this.LANG_MAP[lang] || this.LANG_MAP.ru;
  }

  configure(operatorId, lang){
    operatorId && this.setOperator(operatorId);
    lang && this.setLang(lang);
  }

  setOperator(operatorId){
    this.operatorId = operatorId;
  }

  setLang(lang){
    this.lang = this.LANG_MAP[lang];
  }

  handler = (config) => {
    return (message) => {
      const data = JSON.parse(message.data);
      if(data['ResultCode'] === 0){
        config && config.onSuccess && config.onSuccess(data)
      }else{
        config && config.onError && config.onError(data);
        !(config && config.notifyDisabled) && Toast((config && config.notifyMessage) || (
            data['ResultMessage'] || 'Сталася помилка :('
        ));
      }
    }
  };

  timeout = (config) => {
    return () => {
      config && config.onTimeout && config.onTimeout();
    }
  };

  /* MPOS methods */

  checkConnect(...args){
    return MPosService.client().send({
      Command: constants.POS_CONNECT,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, this.handler(...args), this.timeout(...args));
  }

  getFuelConfig(...args){
    return MPosService.client().send({
      Command: constants.POS_GET_FUEL_CONFIG,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, this.handler(...args), this.timeout(...args));
  }

  getDispenserStatus(number, ...args){
    return MPosService.client().send({
      Command: constants.POS_GET_DISPENSER_STATUS,
      DispenserNumber: number,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, this.handler(...args), this.timeout(...args));
  }

  getBasketData(...args){
    return MPosService.client().send({
      Command: constants.POS_BASKET_GET_DATA,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, this.handler(...args), this.timeout(...args));
  }

  addFuelToBasket(number, nozzle_number, is_money, value, ...args){
    return MPosService.client().send({
      Command: constants.POS_BASKET_FUEL_ADD,
      DispenserNumber: number,
      NozzleNumber: nozzle_number,
      IsMoney: is_money ? 1 : 0,
      Value: value,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, this.handler(...args), this.timeout(...args));
  }

  fiscalCheck(data, sum, ...args){
    return MPosService.client().send({
      Command: constants.POS_FISCAL_CHECK,
      CheckData: data,
      PayTypeCommonSum: sum,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, this.handler(...args), this.timeout(...args));
  }

  copyCheck(data, sum, ...args){
    return MPosService.client().send({
      Command: constants.POS_COPY_CHECK,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, this.handler(...args), this.timeout(...args));
  }

}

export default MPosService.default()
