class WSClient{
  constructor(url, params){
    this.params = params || {};
    this.name = this.params.name || 'WS';
    this.timeout = this.params.timeout || 3;
    this.retry = this.params.retry || 1;

    this.ws = null;
    this.url = url;
    this.callback = null;
    this.initWs();

    this.queue = [];
    this.blocked = false;
    this.ready = false;
    this.id = null;
  }

  initWs(onopen) {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.ready = true;
      console.log(`${this.name} client connected`, Date.now());
      if (typeof onopen == 'function') onopen();
      !this.blocked && this.next();
    };
    this.ws.onerror = () => {
      console.log(`${this.name} connect error`, Date.now());
    };
    this.ws.onclose = () => {
      console.log(`${this.name} client disconnected`, Date.now());

      setTimeout(() => {
        this.initWs();
      }, this.retry * 1000);
      this.ready = false;
    };

    this.ws.onmessage = (data) => {
      console.log(`${this.name} message`, Date.now(), data);
      try {
        typeof this.callback == 'function' && this.callback(data);
      }catch (e) {}

      this.blocked = false;
      clearTimeout(this.id);

      this.next();
    };
  }

  run(data, callback, timeout){
    this.blocked = true;
    this.callback = callback || null;

    this.ws.send(JSON.stringify(data));
    console.log(`Send to ${this.name}`, JSON.stringify(data));

    this.id = setTimeout(() => {
      try {
        console.log(`Request ${this.name} timeout`);
        typeof timeout == 'function' && timeout();
      }catch (e) {}
      this.blocked = false;
      this.next()
    }, this.timeout * 1000)
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
