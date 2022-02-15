import {StyleSheet} from 'react-native';
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
  wItem: {
    flexDirection: 'row',
  },
  wImg: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgItem: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  wTxt: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.black,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.red,
  },
  date: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grey,
  },
  background: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  wBtnItem: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: -15,
  },
  txtBetween: {
    justifyContent: 'space-between',
  },
  order: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});

export default styles;
