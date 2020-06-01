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

  addToQueue(data, callback, timeout_callback, params){
    this.queue.push({
      data: data,
      callback: callback,
      timeout_callback: timeout_callback,
      params: params
    });
  }

  run(data, callback, timeout_callback, params){
    if(this.ws.readyState !== WebSocket.OPEN){
      this.addToQueue(data, callback, timeout_callback, params);
      return;
    }

    this.blocked = true;
    this.callback = callback || null;

    this.context = (params && params.context) ? params.context : null;

    this.ws.send(JSON.stringify(data));
    console.log(`Send to ${this.name}`, this.getTime(), data);

    let timeout = (params && params.timeout) ? params.timeout : this.timeout;

    this.id = setTimeout(() => {
      try {
        console.log(`Request ${this.name} timeout`);
        this.reconnect();
        timeout_callback && timeout_callback();
      }catch (e) {}
      this.blocked = false;
      this.next()
    },timeout * 1000)
  }

  next(){
    const item = this.queue.shift();
    item && this.run(item.data, item.callback, item.timeout_callback, item.params)
  }

  process (data, callback, timeout_callback, params) {
    if (!this.blocked && this.ready && this.ws.readyState === WebSocket.OPEN) {
      this.run(data, callback, timeout_callback, params);
    } else {
      this.addToQueue(data, callback, timeout_callback, params);
    }
  }

  send(data, callback, timeout, params){
    this.process(data, callback, timeout, params);
  }
}

export default WSClient;
