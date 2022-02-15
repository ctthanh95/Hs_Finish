import {createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducers';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['mapReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);

let persistor = persistStore(store);

export {store, persistor};
