import { Actions} from "../actions";


const languageReducer = function(state = 'uk', action) {
  if (action.type === Actions.LANGUAGE) {
    return action.value;
  } else {
    return state
  }
};

export default languageReducer
