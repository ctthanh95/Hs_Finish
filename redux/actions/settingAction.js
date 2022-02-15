import {CHANGE_MODE} from '../types';

export function changeMode(item) {
  return {
    type: CHANGE_MODE,
    payload: item,
  };
}
