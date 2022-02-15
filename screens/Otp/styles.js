import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 30,
    justifyContent: 'space-between',
  },
  wInput: {
    height: 50,
    width: 50,
    borderRadius: 10,
    borderWidth: 1,
  },
  rowInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  txtWReceive: {
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: fonts.medium,
    color: colors.black,
  },
  txtReceive: {
    color: colors.red,
    fontFamily: fonts.bold,
  },
  txtSign: {
    fontSize: 14,
    textAlign: 'center',
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
  },
});

export default styles;
