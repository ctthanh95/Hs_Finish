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
  card: {
    maxHeight: '35%',
  },
  add: {
    flex: 1,
    marginTop: 10,
  },
  txtAdd: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  wAddress: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.light,
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    fontFamily: fonts.medium,
    fontSize: 14,
    marginHorizontal: 10,
    lineHeight: 20,
    color: colors.black,
  },
  wCoupon: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.light,
    marginBottom: 30,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  icon: {
    height: 50,
    width: 50,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  order: {
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
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginVertical: 30,
  },
  total: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.black,
  },
});

export default styles;
