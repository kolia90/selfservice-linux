import axios from "axios";
import Toast from "../components/shared/toast/Toast";
import {setLoading} from "../store/actions";
import translation from "./translation";

const config = require('../settings/config');

class APIService {

  static self_client = (params) => {
    let headers = {
      'Authorization': `Self ${config.apiKey}`
    };
    if(params.language) headers['Accept-Language'] = params.language;

    return axios.create({
      baseURL: config.apiUrl,
      headers: headers
    });
  };

  static client = (params) => {
    let headers = null;
    if(params.language) headers['Accept-Language'] = params.language;

    return axios.create({
      baseURL: config.apiUrl,
      headers: headers
    });
  };

  static user_client = (auth_token, params) => {
    let headers = {
      'Authorization': `Token ${auth_token}`
    };
    if(params.language) headers['Accept-Language'] = params.language;

    return axios.create({
      baseURL: config.apiUrl,
      headers: headers
    });
  };

  static getErrorMessage(data) {
    if (!data) return null;
    let msg = null;

    let errors = data[Object.keys(data)[0]];
    if (typeof errors === 'object'){
      msg = errors[Object.keys(errors)[0]]
    }else{
      msg = errors
    }
    return msg
  }

  static setLoading(config, value){
    if(!config || config.loading === false || config.loading === null) return;
    try{
      config.context && config.context.dispatch(setLoading(value))
    }catch (e) {}
  }

  static process(promise, config){
    this.setLoading(config, true);
    promise.then((response) => {
      if(config.loadingOnSuccess !== false) {
        this.setLoading(config, false);
      }
      config && config.onSuccess && config.onSuccess(response)
    }).catch((e) => {
      if(config.loadingOnError !== false) {
        this.setLoading(config, false);
      }
      config && config.onError && config.onError(e);
      !(config && config.notifyDisabled) && Toast((config && config.onErrorMessage) || (
          (e.response && this.getErrorMessage(e.response.data)) || translation({
            uk: 'Сталася помилка :(',
            ru: 'Произошла ошибка :(',
            en: 'An error has occurred :('
          }, config.context ? config.context.language : null)
      ));
    });
  }

  static registerPhone(phone, ...args){
    return this.process(this.client(...args).post('/account/register', {
      phone: phone
    }), ...args)
  }

  static registerConfirm(phone, code, ...args){
    return this.process(this.client(...args).post('/account/activate', {
      phone: phone,
      code: code,
    }), ...args)
  }

  /* User authorized methods */

  static registerProfile(params, auth_token, ...args){
    return this.process(
        this.user_client(auth_token, ...args).patch('/account/profile',  params), ...args)
  }

  static getLevel(auth_token, ...args){
    return this.process(this.user_client(auth_token, ...args).get('/bonus/balance'), ...args)
  }

  static getCards(auth_token, ...args){
    return this.process(this.user_client(auth_token, ...args).get('/wayforpay/wallet/cards'), ...args)
  }

  static checkoutOrder(params, auth_token, ...args){
    return this.process(this.user_client(auth_token, ...args).post('/wayforpay/payments/checkout', params), ...args)
  }

  /* SELF-Service methods */

  static getSlides(...args){
    return this.process(this.self_client(...args).get('/selfservice/slider'), ...args)
  }

  static findByLevel(number, ...args){
    return this.process(this.self_client(...args).post('/selfservice/level/find', {
      number: number
    }), ...args)
  }

  static setFuelOrder(params, ...args){
    return this.process(this.self_client(...args).post('/selfservice/fuel/order', params), ...args)
  }

  static confirmOrder(order_id, paid_by, ...args){
    return this.process(this.self_client(...args).post('/selfservice/orders/confirm', {
      order: order_id,
      paid_by: paid_by
    }), ...args)
  }

  static getFuelByShort(short_name, ...args){
    return this.process(this.self_client(...args).post('/selfservice/fuel/info', {short_name}), ...args)
  }

}

export default APIService
