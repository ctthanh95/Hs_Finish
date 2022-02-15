import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme, StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  Onboarding,
  Otp,
  Recovery,
  SignIn,
  SignUp,
  BottomTab,
  Detail,
  Card,
  NewCard,
  CheckOut,
  Success,
  Delivery,
  Map,
  Search,
  DetailCard,
  MapSelect,
  Account,
  EditAccount,
  Order,
  Rate,
  DetailOrder,
  Coupon,
  Setting,
} from '../screens';
import {CustomInternet, CustomLoading} from '../components';
import {getValue} from '../helpers/mmkv';
import {colors} from '../constants';
import strings from '../helpers/localization';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  //Theme
  const mode = useSelector(state => state.settingReducer.mode);
  const scheme = useColorScheme();
  const netInfo = useNetInfo();
  const lightTheme = {
    colors: {
      background: colors.white,
      text: colors.black,
      border: colors.black,
    },
    dark: false,
  };
  const darkTheme = {
    colors: {
      background: colors.black,
      text: colors.white,
      border: colors.white,
    },
    dark: true,
  };
  //Onboarding
  const checkOnboarding = getValue('boolean', 'Onboarding');
  //Mode
  const [appMode, setAppMode] = useState(null);
  //Authentication
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  //Mode
  useEffect(() => {
    if (mode) {
      setAppMode(mode);
    } else {
      setAppMode(scheme);
    }
  }, [mode]);
  //Language
  useEffect(() => {
    let language = getValue('string', 'language');
    if (language) {
      strings.setLanguage(language);
    }
  }, []);

  const AppStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Coupon" component={Coupon} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Rate" component={Rate} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
        <Stack.Screen name="MapSelect" component={MapSelect} />
        <Stack.Screen name="NewCard" component={NewCard} />
        <Stack.Screen name="DetailCard" component={DetailCard} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="DetailOrder" component={DetailOrder} />
      </Stack.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={checkOnboarding ? 'SignIn' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Recovery" component={Recovery} />
        <Stack.Screen name="Otp" component={Otp} />
      </Stack.Navigator>
    );
  };

  if (initializing) return <CustomLoading />;

  return (
    <NavigationContainer
      onReady={() => RNBootSplash.hide()}
      theme={appMode === 'dark' ? darkTheme : lightTheme}>
      {user ? <AppStack /> : <AuthStack />}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={appMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      {netInfo.isConnected === false && <CustomInternet />}
    </NavigationContainer>
  );
};

export default Navigation;
