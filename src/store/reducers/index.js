import { combineReducers } from 'redux'
import dataState from './data'
import loadingState from './loading'
import userState from './user'
import levelState from './level'


export default combineReducers({
  dataState,
  loadingState,
  userState,
  levelState,
})
