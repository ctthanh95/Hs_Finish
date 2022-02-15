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
  search: {
    backgroundColor: colors.light,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black,
  },
});

export default styles;
