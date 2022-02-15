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
  wItem: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  wTxt: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  content: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.grey,
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.black,
  },
});
export default styles;
