const WebSocket = require('ws');
const address = 'ws://194.9.71.87/tunnel/mpos';

let ws;
let wsMPos;

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
    if (wsMPos.readyState === WebSocket.OPEN) wsMPos.send(data);
  });
}

function initWsMPos() {
  wsMPos = new WebSocket('ws://127.0.0.1:8000/mpos');
  wsMPos.on('open', function open() {
    console.log('mPos connected');
  });
  wsMPos.on('error', function () {
    console.log('mPos connect error');
  });
  wsMPos.on('close', function close() {
    console.log('mPos disconnected', Date.now());
    setTimeout(function timeout() {
      initWsMPos();
    }, 1000);
  });
  wsMPos.on('message', function (data) {
    if (ws.readyState === WebSocket.OPEN) ws.send(data);
  });
}

initWs();
initWsMPos();
