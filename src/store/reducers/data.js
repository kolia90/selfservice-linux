import { Actions} from "../actions";


const dataReducer = function(state = {value: ''}, action) {
  switch (action.type) {
    case Actions.SET_DATA_VALUE:
      return { ...state, value: action.value };
    case Actions.SET_DATA_USER:
      return { ...state, user: action.value };
    default:
      return state
  }
};

export default dataReducer
