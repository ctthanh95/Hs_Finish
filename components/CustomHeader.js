import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors as constantColors, fonts} from '../constants';
import CustomIcon from './CustomIcon';
//
import {useTheme} from '@react-navigation/native';

const CustomHeader = ({title, right, ...props}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        {...props}
        style={[styles.wrap, {borderColor: colors.border, borderWidth: 1}]}>
        <CustomIcon
          type="AntDesign"
          name="left"
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
      {right ? right : <View style={styles.wrap} />}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
  wrap: {
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
});
