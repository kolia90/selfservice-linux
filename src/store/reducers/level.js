import { Actions} from "../actions";


const levelReducer = function(state = null, action) {
  if (action.type === Actions.LEVEL_NUMBER) {
    return action.value;
  } else {
    return state
  }
};

export default levelReducer
