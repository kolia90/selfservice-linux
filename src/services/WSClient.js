import {DateTime} from "luxon";

class WSClient{
  constructor(url, params){
    this.params = params || {};
    this.name = this.params.name || 'WS';
    this.timeout = this.params.timeout || 5;
    this.retry = this.params.retry || 1;

    this.handler = this.params.handler || null;
    this.context = null;

    this.ws = null;
    this.url = url;
    this.callback = null;
    this.initWs();

    this.queue = [];
    this.blocked = false;
    this.ready = false;
    this.id = null;
    this.force = false;
  }

  getTime(){
    return DateTime.fromJSDate(new Date()).toFormat('HH:mm:ss')
  }

  initWs(onopen) {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.ready = true;
      console.log(`${this.name} client connected`, this.getTime());
      if (typeof onopen == 'function') onopen();
      !this.blocked && this.next();
    };
    this.ws.onerror = () => {
      console.log(`${this.name} connect error`, this.getTime());
    };
    this.ws.onclose = () => {
      console.log(`${this.name} client disconnected`, this.getTime());

      if(this.force){
        this.force = false;
        this.initWs();
      }else{
        setTimeout(() => {
          this.initWs();
        }, this.retry * 1000);
      }
      this.ready = false;
    };

    this.ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(`${this.name} message`, this.getTime(), data);

      try {
        this.callback && this.callback(data);
      }catch (e) {}

      this.blocked = false;
      clearTimeout(this.id);

      try {
        this.handler && this.handler(data, this.context);
      }catch (e) {}

      this.next();
    };
  }

  reconnect(){
    this.force = true;
    this.ws.close();
  }

  isOpen() {
    return this.ws.readyState === WebSocket.OPEN
  }

  addToQueue(data, onSuccess, onTimeout, options){
    this.queue.push({
      data: data,
      onSuccess: onSuccess,
      onTimeout: onTimeout,
      options: options
    });
  }

  run(data, onSuccess, onTimeout, params){
    if(this.ws.readyState !== WebSocket.OPEN){
      this.addToQueue(data, onSuccess, onTimeout, params);
      return;
    }

    this.blocked = true;
    this.callback = onSuccess || null;

    this.context = (params && params.context) ? params.context : null;

    this.ws.send(JSON.stringify(data));
    console.log(`Send to ${this.name}`, this.getTime(), data);

    let timeout = (params && params.timeout) ? params.timeout : this.timeout;

    this.id = setTimeout(() => {
      try {
        console.log(`Request ${this.name} timeout`);
        this.reconnect();
        onTimeout && onTimeout();
      }catch (e) {}
      this.blocked = false;
      this.next()
    },timeout * 1000)
  }

  next(){
    const item = this.queue.shift();
    item && this.run(item.data, item.onSuccess, item.onTimeout, item.options)
  }

  process(data, params) {
    const onSuccess = params['onSuccess'] || null;
    const onTimeout = params['onTimeout'] || null;
    const options = params['options'] || null;

    if (!this.blocked && this.ready) {
      this.run(data, onSuccess, onTimeout, options);
    } else {
      this.addToQueue(data, onSuccess, onTimeout, options);
    }
  }

  checkAndProcess(data, params) {
    if(this.isOpen()){
      this.process(data, params)
    }else {
      const onError = params['onError'] || null;
      setTimeout(() => {
        if(this.isOpen()){
          this.process(data, params)
        }else{
          onError && onError()
        }
      }, params.connectTimeout || 1000)
    }
  }

  send(data, params){
    this.checkAndProcess(data, params);
  }
}

export default WSClient;
