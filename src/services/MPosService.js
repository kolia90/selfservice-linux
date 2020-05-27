import Toast from "../components/shared/toast/Toast";
import WSClient from "./WSClient";
import {setLoading} from "../store/actions";

const constants = require('./constants');
const config = require('../settings/config');


export class MPosService {
  static _client = null;

  handlerMessage = (message) => {};

  getClient = () => {
    if(MPosService._client === null){
      let params = {
        name: 'mPos',
        handler: this.handlerMessage,
        ...this.clientParams
      };
      MPosService._client = new WSClient(config.mPosWsUrl, params)
    }
    return MPosService._client;
  };

  LANG_MAP = {
    en: 0,
    ua: 1,
    ru: 2
  };

  CONST = {
    TRUE: 1,
    FALSE: 0,

    PAY_TYPE_MONEY: 1,
    PAY_TYPE_CARD: 2,

    CHECK_NONE: 0,
    CHECK_PRINT_QUEUE: 1,
    CHECK_IN_PROCESS: 2,
    CHECK_COMPLETED: 3,
  };

  static default(params){
    window.mpos = new MPosService(params);
    return new MPosService(params)
  }

  constructor(params){
    params = params || {};
    this.operatorId = params.operatorId || '1001';
    this.lang = this.LANG_MAP[params.lang] || this.LANG_MAP.ru;
    this.clientParams = params.clientParams;
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

  setLoading(params, value){
    if(!params || params.loading === false || params.loading === null) return;
    try{
      params.context && params.context.dispatch(setLoading(value))
    }catch (e) {}
  }

  getHandler = (params) => {
    return (data) => {
      this.setLoading(params, false);

      if(data['ResultCode'] === 0){
        params && params.onSuccess && params.onSuccess(data)
      }else{
        params && params.onError && params.onError(data);
        !(params && params.notifyDisabled) && Toast((params && params.onErrorMessage) || (
            data['ResultMessage'] || 'Сталася помилка :('
        ));
      }
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

  /* MPOS methods */

  checkConnect(params){
    this.send({
      Command: constants.POS_CONNECT,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, params)
  }

  getFuelConfig(params){
    this.send({
      Command: constants.POS_GET_FUEL_CONFIG,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, params)
  }

  getDispenserStatus(number, params){
    this.send({
      Command: constants.POS_GET_DISPENSER_STATUS,
      DispenserNumber: number,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, params)
  }

  setBasketParams(level, pay_type, params){
    this.send({
      Command: constants.POS_BASKET_SET_PARAMS,
      ClientLoyaltyCard: level,
      PayTypeId: pay_type
    }, params)
  }

  getBasketData(params){
    this.send({
      Command: constants.POS_BASKET_GET_DATA,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, params)
  }

  addFuelToBasket(number, nozzle_number, is_money, value, params){
    this.send({
      Command: constants.POS_BASKET_FUEL_ADD,
      DispenserNumber: number,
      NozzleNumber: nozzle_number,
      IsMoney: is_money ? 1 : 0,
      Value: value,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, params)
  }

  basketClear(params){
    this.send({
      Command: constants.POS_BASKET_CLEAR
    }, params)
  }

  fiscalCheck(data, sum, params){
    this.send({
      Command: constants.POS_FISCAL_CHECK,
      CheckData: data,
      PayTypeCommonSum: sum,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, params)
  }

  copyCheck(data, sum, params){
    this.send({
      Command: constants.POS_COPY_CHECK,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, params);
  }

  getCheckStatus(check_id, params){
    this.send({
      Command: constants.POS_GET_CHECK_STATUS,
      MPosCheckId: check_id,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, params);
  }

  shiftProc(proc_id, params){
    this.send({
      Command: constants.POS_SHIFT_PROC,
      ShiftProcId: proc_id,
      OperatorId: this.operatorId,
      Lang: this.lang
    }, params);
  }

}

export default MPosService.default({clientParams: {timeout: 5}})
