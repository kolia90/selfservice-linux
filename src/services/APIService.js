import axios from "axios";
import Toast from "../components/shared/toast/Toast";

const config = require('../settings/config').configure();

class APIService {

  static self_client = () => {
    return axios.create({
      baseURL: config.apiUrl,
      headers: {
        'Authorization': `Self ${config.apiKey}`
      }
    });
  };

  static client = () => {
    return axios.create({
      baseURL: config.apiUrl
    });
  };

  static user_client = (auth_token) => {
    return axios.create({
      baseURL: config.apiUrl,
      headers: {
        'Authorization': `Token ${auth_token}`
      }
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

  static process(promise, config){
    promise.then((response) => {
      config && config.onSuccess && config.onSuccess(response)
    }).catch((e) => {
      config && config.onError && config.onError(e);
      !(config && config.notifyDisabled) && Toast((config && config.notifyMessage) || (
          (e.response && this.getErrorMessage(e.response.data)) || 'Сталася помилка :('
      ));
    });
  }

  static registerPhone(phone, ...args){
    return this.process(this.client().post('/account/register', {
      phone: phone
    }), ...args)
  }

  static registerConfirm(phone, code, ...args){
    return this.process(this.client().post('/account/activate', {
      phone: phone,
      code: code,
    }), ...args)
  }

  /* User authorized methods */

  static registerProfile(params, auth_token, ...args){
    return this.process(
        this.user_client(auth_token).patch('/account/profile',  params), ...args)
  }

  static getLevel(auth_token, ...args){
    return this.process(this.user_client(auth_token).get('/bonus/balance'), ...args)
  }

  static getCards(auth_token, ...args){
    return this.process(this.user_client(auth_token).get('/wayforpay/wallet/cards'), ...args)
  }

  /* SELF-Service methods */

  static getSlides(...args){
    return this.process(this.self_client().get('/selfservice/slider'), ...args)
  }

  static findByLevel(number, ...args){
    return this.process(this.self_client().post('/selfservice/level/find', {
      number: number
    }), ...args)
  }

  static setFuelOrder(params, ...args){
    return this.process(this.self_client().post('/selfservice/fuel/order', params), ...args)
  }

  static confirmOrder(order_id, paid_by, ...args){
    return this.process(this.self_client().post('/selfservice/orders/confirm', {
      order: order_id,
      paid_by: paid_by
    }), ...args)
  }

  static getFuelByShort(short_name, ...args){
    return this.process(this.self_client().post('/selfservice/fuel/info', {short_name}), ...args)
  }

}

export default APIService
