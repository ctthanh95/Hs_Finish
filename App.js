import React, {useEffect} from 'react';
import Navigation from './router/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <Navigation />
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
};

export default App;
