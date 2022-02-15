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
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },

  imgItem: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  name: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  date: {
    color: colors.grey,
    fontFamily: fonts.regular,
    marginVertical: 5,
  },
  quality: {
    color: colors.black,
    fontFamily: fonts.regular,
  },
  button: {
    padding: 10,
    backgroundColor: colors.background,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  txtButton: {
    color: colors.white,
    fontFamily: fonts.bold,
  },
});

export default styles;
