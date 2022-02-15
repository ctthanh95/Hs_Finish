import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../constants';

const CustomText = ({
  width,
  title,
  left,
  right,
  styleTouch,
  styleText,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        styleTouch,
        {
          width: width,
        },
      ]}>
      {left}
      <Text
        style={[
          styles.text,
          styleText,
          {
            marginLeft: left ? 5 : 0,
            marginRight: right ? 5 : 0,
          },
        ]}>
        {title}
      </Text>
      {right}
    </TouchableOpacity>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.bold,
  },
});
