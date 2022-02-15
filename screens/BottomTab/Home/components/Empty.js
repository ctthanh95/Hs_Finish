import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {colors, fonts} from '../../../../constants';

const Empty = () => {
  const {colors} = useTheme();
  return (
    <Text style={[styles.text, {color: colors.text}]}>No data found!</Text>
  );
};

export default Empty;

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.bold,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
});
