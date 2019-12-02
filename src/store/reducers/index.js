import { combineReducers } from 'redux'
import dataState from './data'
import loadingState from './loading'
import tokenState from './token'
import levelState from './level'


export default combineReducers({
  dataState,
  loadingState,
  tokenState,
  levelState,
})
