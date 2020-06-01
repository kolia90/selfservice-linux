import { Actions} from "../actions";


const loadingReducer = function(state = false, action) {
  if (action.type === Actions.LOADING_VALUE) {
    return action.value;
  } else {
    return state
  }
};

export default loadingReducer
