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
  card: {
    maxHeight: '35%',
  },
  add: {
    flex: 1,
    marginTop: 10,
  },
  wItem: {
    padding: 20,
    backgroundColor: colors.light,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wImage: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  txtAdd: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
});

export default styles;
