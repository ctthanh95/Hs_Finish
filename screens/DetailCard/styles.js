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
  wCard: {
    marginBottom: 30,
  },
  image: {
    borderRadius: 10,
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  date: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.bold,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  wInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  name: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  number: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  wLogo: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    width: '47.5%',
  },
  wRemember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  remember: {
    fontSize: 14,
    fontFamily: fonts.medium,
    marginLeft: 10,
  },
});

export default styles;
