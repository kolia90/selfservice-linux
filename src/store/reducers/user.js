import { Actions} from "../actions";


const userReducer = function(state = null, action) {
  if (action.type === Actions.USER_DATA) {
    return action.value;
  } else {
    return state
  }
};

export default userReducer
