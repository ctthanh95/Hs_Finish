import {StyleSheet} from 'react-native';
import {fonts, colors, dimensions} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wSkip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 15,
    marginRight: 5,
  },
  txtSkip: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  wItem: {
    alignItems: 'center',
    width: dimensions.width,
    paddingHorizontal: 10,
  },
  imgItem: {
    width: 215,
    height: 215,
    resizeMode: 'cover',
  },
  txtItem: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  wDot: {
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
  },
  dotItem: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  wrap: {
    flex: 1,
  },
});

export default styles;
