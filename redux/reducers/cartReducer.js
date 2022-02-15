import uuid from 'react-native-uuid';
import {
  ADD_ITEM_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  DELETE_ITEM_FROM_CART,
  RESET_CART,
  REORDER_CART,
} from '../types';
const initialState = {
  cart: [],
  length: 0,
  money: 0,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      let item = action.payload;
      let cart = state.cart;
      if (cart.length === 0) {
        cart.push({
          ...item,
          idCart: uuid.v4(),
        });
      } else {
        if (item.sizeCart) {
          let check = false;
          cart.map(e => {
            if (e.id === item.id && e.sizeCart === item.sizeCart) {
              e.quantity += item.quantity;
              check = true;
            }
          });
          if (!check) {
            cart.push({
              ...item,
              idCart: uuid.v4(),
            });
          }
        } else {
          let check = false;
          cart.map(e => {
            if (e.id === item.id) {
              e.quantity += item.quantity;
              check = true;
            }
          });
          if (!check) {
            cart.push({
              ...item,
              idCart: uuid.v4(),
            });
          }
        }
      }
      return {
        cart: [...cart],
        length: state.length + item.quantity,
        money: state.money + item.quantity * item.priceCart,
      };
    case INCREASE_QUANTITY:
      state.cart.map(e => {
        if (e.idCart === action.payload.idCart) {
          e.quantity += 1;
        }
      });
      return {
        cart: [...state.cart],
        length: state.length + 1,
        money: state.money + action.payload.priceCart,
      };
    case DECREASE_QUANTITY:
      state.cart.map(e => {
        if (e.idCart === action.payload.idCart) {
          e.quantity -= 1;
        }
      });
      return {
        cart: [...state.cart],
        length: state.length - 1,
        money: state.money - action.payload.priceCart,
      };
    case DELETE_ITEM_FROM_CART:
      let arr = state.cart.filter(e => e.idCart !== action.payload.idCart);
      return {
        cart: [...arr],
        length: state.length - action.payload.quantity,
        money: state.money - action.payload.quantity * action.payload.priceCart,
      };
    case RESET_CART:
      return {
        cart: [],
        length: 0,
        money: 0,
      };
    case REORDER_CART:
      return {
        cart: action.payload.cart,
        length: action.payload.length,
        money: action.payload.money,
      };
    default:
      return state;
  }
};
export default cartReducer;
