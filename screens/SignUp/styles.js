import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
  },
  txtForgot: {
    fontSize: 14,
    textAlign: 'right',
    color: colors.grey,
    marginBottom: 15,
  },
  wTxt: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 50,
  },
  txtDont: {
    fontFamily: fonts.medium,
  },
  txtSign: {
    fontFamily: fonts.bold,
    color: colors.red,
  },
});

export default styles;
