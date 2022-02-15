import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

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
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 20,
  },
  size: {
    height: 350,
    width: 350,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wItem: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48.5%',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  wCalories: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgCalories: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
  txtCalories: {
    fontSize: 12,
    fontFamily: fonts.light,
  },
  image: {
    width: 125,
    height: 125,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.bold,
    marginBottom: 5,
    color: colors.black,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    fontFamily: fonts.light,
    color: colors.black,
    marginBottom: 10,
  },
  money: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  flat: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
