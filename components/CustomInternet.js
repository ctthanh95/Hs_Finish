import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constants';

const CustomInternet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection!</Text>
    </View>
  );
};

export default CustomInternet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.medium,
  },
});
