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
  image: {
    width: '100%',
    height: 300,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  content: {
    fontSize: 14,
    fontFamily: fonts.regular,
    marginVertical: 10,
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    fontFamily: fonts.italic,
    textAlign: 'right',
  },
});

export default styles;
