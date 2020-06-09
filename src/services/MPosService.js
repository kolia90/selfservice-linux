import Toast from "../components/shared/toast/Toast";
import WSClient from "./WSClient";
import {setLoading} from "../store/actions";
import translation from "./translation";
import BaseWsService from "./BaseWsService";
const constants = require('./constants');
const config = require('../settings/config');


export class MPosService extends BaseWsService{
  static _client = null;

  handlerMessage = (message, context) => {
    if(message['ResultCode'] === 270){
      let needProc = message['NeedShiftProcId'];
      Toast(translation({
        uk: 'Спробуйте трохи пізніше',
        ru: 'Попробуйте немного позже',
        en: 'Please try again later'
      }, context ? context.language : null));
      needProc && this.shiftProc(needProc, {
        notifyDisabled: true
      });
    }
  };

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
    PAY_TYPE_CARD: 5,

    ORDER_COMPLETED: 0,
    ORDER_PROCESS: 1,
    ORDER_BLOCKED: 2,
    ORDER_WAIT_PRINT: 3,
    ORDER_WAIT_START: 5,
    ORDER_WAIT_FINISH: 6,
    ORDER_WAIT_PRINT_OPERATOR: 7,
    ORDER_WAIT_COMPLETE: 8,
    ORDER_ERROR_CONNECT: 12,
    ORDER_WAIT_COMPLETE_OVER: 13,

    CHECK_NONE: 0,
    CHECK_PRINT_QUEUE: 1,
    CHECK_IN_PROCESS: 2,
    CHECK_COMPLETED: 3,

    PROC_CONTINUE: 1,
    PROC_Z_REPORT: 2,
    PROC_CLOSE: 3,
    PROC_OPEN_NEW: 4,
  };

  static default(params){
    window.mpos = new MPosService(params);
    return new MPosService(params)
  }

  constructor(params){
    super(params);
    params = params || {};
    this.operatorId = params.operatorId || '1001';
    this.lang = this.LANG_MAP[params.lang] || this.LANG_MAP.ru;
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
    if(!params || params.loading === false) return;
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
            data['ResultMessage'] || translation({
              uk: 'Сталася помилка :(',
              ru: 'Произошла ошибка :(',
              en: 'An error has occurred :('
            }, params.context ? params.context.language : null)
        ));
      }
    }
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
      PayTypeId: pay_type,
      OperatorId: this.operatorId,
      Lang: this.lang
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

export default MPosService.default({clientParams: {timeout: 30}})
