import {StyleSheet, Platform} from 'react-native';
import {colors, fonts} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
  },
  txtDelivery: {
    fontSize: 18,
    color: colors.red,
    fontFamily: fonts.medium,
  },
  txtAddress: {
    fontSize: 14,
    fontFamily: fonts.bold,
    marginRight: 10,
  },
  wAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 30,
  },
  button: {
    margin: 10,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: colors.light,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  txtSearch: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black,
  },
});
export default styles;
