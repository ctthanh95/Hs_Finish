import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {colors as constantColors, fonts} from '../constants';

const CustomInput = ({name, error, left, right, ...props}) => {
  const {colors} = useTheme();
  return (
    <View>
      <View style={styles.container}>
        <Text style={[styles.name, {color: colors.text}]}>{name}</Text>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <View
        style={[
          styles.wInput,
          {
            borderWidth: error ? 1 : 0,
            borderColor: constantColors.red,
          },
        ]}>
        {left && <View>{left}</View>}
        <TextInput style={styles.input} {...props} />
        {right && <View>{right}</View>}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  error: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: constantColors.red,
  },
  wInput: {
    height: 50,
    flexDirection: 'row',
    borderRadius: 10,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: constantColors.light,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 50,
    color: constantColors.black,
  },
});
