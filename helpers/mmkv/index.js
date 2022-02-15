import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const setValue = (key, value) => {
  storage.set(key, value);
};
const getValue = (type, key) => {
  switch (type) {
    case 'string':
      return storage.getString(key);
    case 'number':
      return storage.getNumber(key);
    case 'boolean':
      return storage.getBoolean(key);
  }
};
const deleteValue = key => {
  storage.delete(key);
};

export {setValue, getValue, deleteValue};
