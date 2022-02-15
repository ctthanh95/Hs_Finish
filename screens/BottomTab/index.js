import React, {useRef, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomIcon} from '../../components';
import Home from './Home';
import Cart from './Cart';
import Favorite from './Favorite';
import Notification from './Notification';
import Profile from './Profile';
import {Animated, View, Platform, StyleSheet} from 'react-native';
import {colors, dimensions} from '../../constants';
//
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const insets = useSafeAreaInsets();
  const length = useSelector(state => state.cartReducer.length);
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  function getWidth() {
    // Horizontal Padding = 20...
    // width = width - 80
    // Total five Tabs...
    return (dimensions.width - 80) / 5;
  }
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            switch (route.name) {
              case 'Home':
                return (
                  <View style={styles.icon}>
                    <CustomIcon
                      type="Entypo"
                      name="home"
                      size={size}
                      color={color}
                    />
                  </View>
                );
              case 'Cart':
                return (
                  <View style={styles.icon}>
                    <CustomIcon
                      type="Feather"
                      name="shopping-cart"
                      size={size}
                      color={color}
                    />
                  </View>
                );
              case 'Favorite':
                return (
                  <View style={styles.icon}>
                    <CustomIcon
                      type="MaterialIcons"
                      name="favorite"
                      size={size}
                      color={color}
                    />
                  </View>
                );
              case 'Notification':
                return (
                  <View style={styles.icon}>
                    <CustomIcon
                      type="Entypo"
                      name="bell"
                      size={size}
                      color={color}
                    />
                  </View>
                );
              case 'Profile':
                return (
                  <View style={styles.icon}>
                    <CustomIcon
                      type="Octicons"
                      name="person"
                      size={size}
                      color={color}
                    />
                  </View>
                );
            }
          },
          tabBarActiveTintColor: colors.background,
          tabBarInactiveTintColor: colors.grey,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            bottom: insets.bottom,
            ...styles.tabBarStyle,
          },
        })}>
        <Tab.Screen name="Home">
          {props => (
            <Home
              onPress={() =>
                Animated.spring(tabOffsetValue, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start()
              }
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Cart"
          options={{
            tabBarBadge: length,
            tabBarBadgeStyle: styles.tabBarBadgeStyle,
          }}>
          {props => (
            <Cart
              onPress={() =>
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth(),
                  useNativeDriver: true,
                }).start()
              }
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={[
          styles.underline,
          {
            width: getWidth() - 20,
            transform: [{translateX: tabOffsetValue}],
            bottom: Platform.OS === 'ios' ? 60 + insets.bottom : 60,
          },
        ]}
      />
    </>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 20,
  },
  tabBarStyle: {
    backgroundColor: colors.white,
    position: 'absolute',
    marginHorizontal: 20,
    // Max Height...
    height: 60,
    borderRadius: 10,
    // Shadow...
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    borderTopWidth: 0,
  },
  underline: {
    height: 2,
    backgroundColor: colors.red,
    position: 'absolute',
    // Horizontal Padding = 20...
    left: 50,
    borderRadius: 20,
  },
  tabBarBadgeStyle: {
    backgroundColor: colors.background,
    marginTop: 10,
  },
});
