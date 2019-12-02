const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const argv = require('yargs').argv;

const wsServer = http.createServer();
const wssSelfMPos = new WebSocket.Server({ noServer: true });
const wssMPos = new WebSocket.Server({ noServer: true });

const wssSelfCash = new WebSocket.Server({ noServer: true });
const wssCash = new WebSocket.Server({ noServer: true });

const port = argv.port || 8080;
console.log('Port: ', port);

wssSelfMPos.on('connection', function connection(ws) {
  ws.on('message', function (data) {
    wssMPos.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) client.send(data);
    });
  });
});

wssMPos.on('connection', function connection(ws) {
  ws.on('message', function (data) {
    wssSelfMPos.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) client.send(data);
    });
  });
});

wssSelfCash.on('connection', function connection(ws) {
  ws.on('message', function (data) {
    wssCash.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) client.send(data);
    });
  });
});

wssCash.on('connection', function connection(ws) {
  ws.on('message', function (data) {
    wssSelfCash.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) client.send(data);
    });
  });
});

wsServer.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/tunnel/self-mpos') {
    wssSelfMPos.handleUpgrade(request, socket, head, function done(ws) {
      wssSelfMPos.emit('connection', ws, request);
    });
  } else if (pathname === '/tunnel/mpos') {
    wssMPos.handleUpgrade(request, socket, head, function done(ws) {
      wssMPos.emit('connection', ws, request);
    });
  } else if (pathname === '/tunnel/self-cash') {
    wssSelfCash.handleUpgrade(request, socket, head, function done(ws) {
      wssSelfCash.emit('connection', ws, request);
    });
  } else if (pathname === '/tunnel/cash') {
    wssCash.handleUpgrade(request, socket, head, function done(ws) {
      wssCash.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

wsServer.listen(port, function () {
  console.log('Server listening...')
});
