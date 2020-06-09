import Toast from "../components/shared/toast/Toast";
import translation from "./translation";
import {setLoading} from "../store/actions";


export class BaseWsService {
  constructor(params){
    params = params || {};
    this.clientParams = params.clientParams;
  }

  getClient(){
    throw Error('Method getClient not implemented');
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

  getNotConnection = (params) => {
    return () => {
      this.setLoading(params, false);
      if(params && params.onNotConnect){
        params.onNotConnect();
      }else{
        if(!(params && params.notifyNoConnectDisabled)){
          Toast(translation({
            uk: "Немає зв'язку",
            ru: "Нет связи с кассой",
            en: "No connection with MPOS"
          }, params.context ? params.context.language : null))
        }
      }
    }
  };

  send = (data, params) => {
    this.setLoading(params, true);
    this.getClient().send(
        data, {
          onSuccess: this.getHandler(params),
          onTimeout: this.getTimeout(params),
          onError: this.getNotConnection(params),
          options: params,
        }
    );
  };

  isConnected(){
    return this.getClient().isOpen();
  }

}

export default BaseWsService
