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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  txtItem: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  dropDownStyle: {
    backgroundColor: colors.light,
    borderWidth: 0,
  },
  dropDownContainerStyle: {
    backgroundColor: colors.white,
    borderColor: colors.light,
  },
  containerStyle: {
    width: 60,
    height: 30,
    borderRadius: 25,
    padding: 5,
  },
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default styles;
