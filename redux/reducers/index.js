import {combineReducers} from 'redux';
import cartReducer from './cartReducer';
import mapReducer from './mapReducer';
import settingReducer from './settingReducer';

const rootReducer = combineReducers({
  cartReducer,
  mapReducer,
  settingReducer,
});

export default rootReducer;
