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
  background: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
  },
  wItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderColor: colors.grey,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.grey,
    marginRight: 15,
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black,
    flex: 2,
    textAlign: 'right',
  },
  margin: {
    marginTop: 15,
  },
  wProduct: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
    alignItems: 'center',
  },
  imgProduct: {
    width: 100,
    height: 100,
  },
  wTxtProduct: {
    marginLeft: 5,
    flex: 1,
  },
  wTxtQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 5,
  },
  another: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 15,
  },
});

export default styles;
