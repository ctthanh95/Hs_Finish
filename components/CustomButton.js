import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {fonts} from '../constants';

const CustomButton = ({
  left,
  right,
  height = 50,
  backgroundColor,
  color,
  title,
  onPress,
  borderRadius = 10,
  styleTouch,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      style={[
        styles.container,
        styleTouch,
        {
          height: height,
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
        },
      ]}>
      <View style={styles.row}>
        {left}
        <Text
          style={[
            styles.text,
            {
              color: color,
            },
          ]}>
          {title}
        </Text>
        {right}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.medium,
    marginHorizontal: 20,
  },
});
