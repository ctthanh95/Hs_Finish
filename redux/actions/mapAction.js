import {ADD_ADDRESS, SELECT_ADDRESS} from '../types';

export function addAddress(item) {
  return {
    type: ADD_ADDRESS,
    payload: item,
  };
}
export function selectAddress(item) {
  return {
    type: SELECT_ADDRESS,
    payload: item,
  };
}
