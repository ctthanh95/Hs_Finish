import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  background: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
  },
  wGender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gender: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  error: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.red,
  },
  wDrop: {
    backgroundColor: colors.light,
    marginBottom: 15,
    borderColor: colors.red,
    paddingLeft: 20,
  },
  placeholderStyle: {
    color: colors.grey,
  },
  dropDownContainerStyle: {
    borderColor: colors.light,
  },
  arrowIconStyle: {
    width: 24,
    height: 24,
  },
});

export default styles;
