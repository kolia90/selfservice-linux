import { Actions} from "../actions";


const dataReducer = function(state = {value: null}, action) {
  if (action.type === Actions.SET_DATA_VALUE) {
    return {...state, value: action.value };
  } else {
    return state
  }
};

export default dataReducer
