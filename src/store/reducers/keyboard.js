import { Actions} from "../actions";


const keyboardReducer = function(state = 'en', action) {
  if (action.type === Actions.KEYBOARD) {
    return action.value;
  } else {
    return state
  }
};

export default keyboardReducer
