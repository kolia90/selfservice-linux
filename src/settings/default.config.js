module.exports = {
  // apiUrl: 'http://127.0.0.1:5000', // Express.js backend API self-service
  // apiKey: '27743562-1b5c-47f2-98e4-6f3a74d8964c', // key for backend API self-service

  mPosWsUrl: 'ws://127.0.0.1:8000/mpos', // url for websocket mPos
  cashWsUrl: 'ws://127.0.0.1:8000/cash', // url for websocket Cash

  apiUrl: 'http://socar.themakeapp.com', // socar API backend
  apiKey: '29b9f4af-844c-4525-b8ae-ce125f13c3bd', // key for socar API backend

  fullTankVolume: 65,

  // TODO: потрібно буде використати для нотифікацій про оплату
  wsUrl: 'ws://socar.themakeapp.com:8002',
  wsAPIKey: '29b9f4af-844c-4525-b8ae-ce125f13c3bd',
};
