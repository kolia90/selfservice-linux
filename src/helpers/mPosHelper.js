import Toast from "../components/shared/toast/Toast";

class mPosHelper {

  static getCurrentNozzle(data){
    const currentNumber = data['CurrentNozzleNumber'];
    const nozzles = data['Nozzles'];
    for (let i in nozzles){
      let nozzle = nozzles[i];
      if(nozzle['NozzleNumber'] === currentNumber){
        return nozzle
      }
    }
    return null
  }

  static handleGetStatus(data, params){
    if (!data['OrderEnded']){
      Toast('ТРК занята');
      return;
    }

    if (data['ConnectionError']){
      Toast('Ошибка связи с ТРК');
      return;
    }

    if (data['NozzleUp']){
      params.onUp && params.onUp();
      params.setFuel && params.setFuel(this.getCurrentNozzle(data))
    }else{
      params.onDown && params.onDown()
    }
  }

  static handleSpillProcess(data){
    const price = data['Price'] / 100;
    const volume = data['Ordered'] / 100;
    const give_volume = data['Gived'] / 100;
    const amount = data['Sum'] / 100;

    const percent = give_volume * 100 / volume;

    return {
      is_ended: data['OrderEnded'],
      status_int: data['OrderStatus'],
      price: price,
      amount: amount,
      give_amount: give_volume * price,
      volume: volume,
      give_volume: give_volume,
      percent: percent
    }
  }
}

export default mPosHelper
