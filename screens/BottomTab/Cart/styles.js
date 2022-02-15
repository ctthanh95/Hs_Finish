import {StyleSheet} from 'react-native';
import {colors, fonts, dimensions} from '../../../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  wCart: {
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
    width: 15,
    borderRadius: 7.5,
    position: 'absolute',
    top: 5,
    right: 2.5,
  },
  number: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    justifyContent: 'space-between',
    flex: 1,
  },
  product: {
    height: '65%',
  },
  order: {
    height: '35%',
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'space-between',
  },
  wItem: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  wText: {
    justifyContent: 'center',
    marginHorizontal: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  big: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  left: {
    flexDirection: 'row',
    flex: 2.5,
  },
  button: {
    padding: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 10,
  },
  money: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.red,
  },
  txtQuality: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  textTotal: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  moneyTotal: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  underline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.black,
  },
  total: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  delete: {
    backgroundColor: colors.background,
    flex: 1,
    marginBottom: 15,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
  },
  size: {
    height: 300,
    width: 300,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
