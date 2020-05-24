import { Actions} from "../actions";


// const userReducer = function(state = null, action) {
const userReducer = function(state = {token: '5bc8045e4910cceaf1803923f8d2d47ccaaf06f9', data: null}, action) {
  if (action.type === Actions.SET_USER_DATA) {
    return action.value;
  } else {
    return state
  }
};

export default userReducer
