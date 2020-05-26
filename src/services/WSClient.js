import {DateTime} from "luxon";

class WSClient{
  constructor(url, params){
    this.params = params || {};
    this.name = this.params.name || 'WS';
    this.timeout = this.params.timeout || 3;
    this.retry = this.params.retry || 1;

    this.handler = this.params.handler || null;

    this.ws = null;
    this.url = url;
    this.callback = null;
    this.initWs();

    this.queue = [];
    this.blocked = false;
    this.ready = false;
    this.id = null;
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

      setTimeout(() => {
        this.initWs();
      }, this.retry * 1000);
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
        this.handler && this.handler(data);
      }catch (e) {}

      this.next();
    };
  }

  run(data, callback, timeout){
    this.blocked = true;
    this.callback = callback || null;

    this.ws.send(JSON.stringify(data));
    console.log(`Send to ${this.name}`, this.getTime(), data);

    this.id = setTimeout(() => {
      try {
        console.log(`Request ${this.name} timeout`);
        typeof timeout == 'function' && timeout();
      }catch (e) {}
      this.blocked = false;
      this.next()
    },this.timeout * 1000)
  }

  next(){
    const item = this.queue.shift();
    item && this.run(item.data, item.callback, item.timeout)
  }

  process (data, callback, timeout) {
    if (!this.blocked && this.ready && this.ws.readyState === WebSocket.OPEN) {
      this.run(data, callback, timeout);
    } else {
      this.queue.push({
        data: data,
        callback: callback,
        timeout: timeout,
      })
    }
  }

  send(data, callback, timeout){
    this.process(data, callback, timeout);
  }
}

export default WSClient;
