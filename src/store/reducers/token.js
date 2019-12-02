import { Actions} from "../actions";


const tokenReducer = function(state = false, action) {
  switch (action.type) {
    case Actions.SET_USER_TOKEN:
      return action.value;
    default:
      return state
  }
};

export default tokenReducer
