import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  wItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  wAddress: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  wText: {
    marginLeft: 35,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    fontFamily: fonts.light,
    color: colors.grey,
  },
  person: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
  },
  icon: {
    padding: 10,
    backgroundColor: colors.black,
    borderRadius: 5,
    marginRight: 10,
  },
  white: {
    color: colors.white,
  },
  back: {
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
    position: 'absolute',
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: colors.light,
  },
});

export default styles;
