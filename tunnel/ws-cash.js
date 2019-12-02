const WebSocket = require('ws');
const argv = require('yargs').argv;

const address = argv.address || 'ws://socar.themakeapp.com/tunnel/cash';
console.log('Address: ', address);

let ws;
let wsCash;

function initWs() {
  ws = new WebSocket(address);
  ws.on('open', function open() {
    console.log('connected');
  });
  ws.on('error', function () {
    console.log('connect error');
  });
  ws.on('close', function close() {
    console.log('disconnected');
    setTimeout(function () {
      initWs();
    }, 1000);
  });
  ws.on('message', function (data) {
    if (wsCash.readyState === WebSocket.OPEN) wsCash.send(data);
  });
}

function initWsCash() {
  wsCash = new WebSocket('ws://127.0.0.1:8000/cash');
  wsCash.on('open', function open() {
    console.log('Cash connected');
  });
  wsCash.on('error', function () {
    console.log('Cash connect error');
  });
  wsCash.on('close', function close() {
    console.log('Cash disconnected', Date.now());
    setTimeout(function timeout() {
      initWsCash();
    }, 1000);
  });
  wsCash.on('message', function (data) {
    if (ws.readyState === WebSocket.OPEN) ws.send(data);
  });
}

initWs();
initWsCash();
