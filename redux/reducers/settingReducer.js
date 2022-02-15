import {CHANGE_MODE} from '../types';
const initialState = {
  mode: null,
};
const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
};
export default settingReducer;
