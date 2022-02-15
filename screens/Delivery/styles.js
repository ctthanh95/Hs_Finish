import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginBottom: 5,
    color: colors.grey,
  },
  time: {
    fontSize: 24,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
  },
  bill: {
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.light,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: StyleSheet.hairlineWidth,
  },
  track: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  code: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.grey,
  },
  status: {
    backgroundColor: colors.light,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  image: {
    alignItems: 'center',
    alignItems: 'center',
  },
  line: {
    height: 50,
    width: 5,
    backgroundColor: colors.background,
  },
  titleItem: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  descriptionItem: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.grey,
  },
  imageDot: {
    width: 5,
    height: 50,
    resizeMode: 'cover',
  },
  position: {
    position: 'absolute',
    top: -5,
    left: 65,
  },
  two: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 50,
  },
  width: {
    width: '47.5%',
  },
});

export default styles;
