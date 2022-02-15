import {ADD_ADDRESS, SELECT_ADDRESS} from '../types';
const initialState = {
  //Current
  address: {},
  //Select
  select: {},
};
const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case SELECT_ADDRESS:
      return {
        ...state,
        select: action.payload,
      };
    default:
      return state;
  }
};
export default mapReducer;
