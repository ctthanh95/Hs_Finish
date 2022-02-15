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
    fontSize: 10,
  },
  wItem: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  wCalories: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgCalories: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  txtCalories: {
    fontSize: 12,
    fontFamily: fonts.light,
  },
  product: {
    width: 300,
    height: 300,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 18,
    marginVertical: 15,
  },
  description: {
    fontFamily: fonts.light,
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: 20,
    marginBottom: 15,
  },
  size: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  distance: {
    fontFamily: fonts.light,
    fontSize: 14,
  },
  avatar: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  wInfo: {
    justifyContent: 'space-between',
    padding: 10,
  },
  wAvatar: {
    flexDirection: 'row',
  },
  underline: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 5,
    marginBottom: 30,
  },
  wQuality: {
    flexDirection: 'row',
    backgroundColor: colors.light,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '40%',
  },
  wBuy: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '55%',
  },
  txtBuy: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  txtQuality: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  txtTotal: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  back: {
    left: 10,
    zIndex: 1,
    position: 'absolute',
  },
});

export default styles;
