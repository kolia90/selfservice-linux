const WebSocket = require('ws');
const address = 'ws://194.9.71.87/tunnel/bank';

let ws;
let wsBank;

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
    if (wsBank.readyState === WebSocket.OPEN) wsBank.send(data);
  });
}

function initWsBank() {
  wsBank = new WebSocket('ws://127.0.0.1:8000/bankterm');
  wsBank.on('open', function open() {
    console.log('Bank connected');
  });
  wsBank.on('error', function () {
    console.log('Bank connect error');
  });
  wsBank.on('close', function close() {
    console.log('Bank disconnected', Date.now());
    setTimeout(function timeout() {
      initWsBank();
    }, 1000);
  });
  wsBank.on('message', function (data) {
    if (ws.readyState === WebSocket.OPEN) ws.send(data);
  });
}

initWs();
initWsBank();
