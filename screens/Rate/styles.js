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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgPerson: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.black,
    marginBottom: 5,
  },
  delivery: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.black,
  },
  order: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grey,
    marginVertical: 15,
  },
  star: {
    paddingVertical: 15,
  },
  tip: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
  },
  wTip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  input: {
    borderRadius: 10,
    backgroundColor: colors.light,
    textAlignVertical: 'top',
    padding: 10,
    marginBottom: 15,
    height: 150,
  },
});

export default styles;
