import {
  ADD_ITEM_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  DELETE_ITEM_FROM_CART,
  RESET_CART,
  REORDER_CART,
} from '../types';

export function addItemToCart(item) {
  return {
    type: ADD_ITEM_TO_CART,
    payload: item,
  };
}
export function increaseQuantity(item) {
  return {
    type: INCREASE_QUANTITY,
    payload: item,
  };
}
export function decreaseQuantity(item) {
  return {
    type: DECREASE_QUANTITY,
    payload: item,
  };
}
export function deleteItemFromCart(item) {
  return {
    type: DELETE_ITEM_FROM_CART,
    payload: item,
  };
}
export function resetCart() {
  return {
    type: RESET_CART,
  };
}
export function reorderCart(data) {
  return {
    type: REORDER_CART,
    payload: data,
  };
}
