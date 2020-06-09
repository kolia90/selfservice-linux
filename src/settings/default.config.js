module.exports = {
  debug: false,

  mPosWsUrl: 'ws://127.0.0.1:8000/mpos', // url for websocket mPos
  cashWsUrl: 'ws://127.0.0.1:8000/cash', // url for websocket Cash
  bankTermWsUrl: 'ws://127.0.0.1:8000/bankterm', // url for websocket Cash

  apiUrl: 'http://socar.themakeapp.com', // socar API backend
  apiKey: '29b9f4af-844c-4525-b8ae-ce125f13c3bd', // key for socar API backend

  fullTankVolume: 65,

  systemPassword: 'socar',
  zReportStart: '23:00:00',
  zReportEnd: null,

  // TODO: потрібно буде використати для нотифікацій про оплату
  wsUrl: 'ws://socar.themakeapp.com:8002',
  wsAPIKey: '29b9f4af-844c-4525-b8ae-ce125f13c3bd',
};
