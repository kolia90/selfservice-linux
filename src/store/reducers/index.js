import { combineReducers } from 'redux'
import dataState from './data'
import loadingState from './loading'
import userState from './user'
import levelState from './level'
import languageState from './language'
import keyboardState from './keyboard'


export default combineReducers({
  dataState,
  loadingState,
  userState,
  levelState,
  languageState,
  keyboardState,
})
