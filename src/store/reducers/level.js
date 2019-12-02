import { Actions} from "../actions";


const levelReducer = function(state = false, action) {
  switch (action.type) {
    case Actions.SET_LEVEL_NUMBER:
      return action.value;
    default:
      return state
  }
};

export default levelReducer
