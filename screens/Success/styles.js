import {StyleSheet} from 'react-native';
import {fonts} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: '100%',
    height: 300,
  },
  congratulation: {
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginVertical: 10,
  },
  success: {
    fontSize: 14,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
export default styles;
