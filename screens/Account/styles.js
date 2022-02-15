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
  edit: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.background,
  },
  background: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
  },
  wItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderColor: colors.grey,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.grey,
    marginRight: 15,
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black,
    flex: 2,
    textAlign: 'right',
  },
  margin: {
    marginTop: 15,
  },
  wModal: {
    flex: 1,
    backgroundColor: '#00000050',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  select: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 15,
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  error: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.red,
  },
  wInput: {
    height: 50,
    flexDirection: 'row',
    borderRadius: 10,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: colors.light,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 50,
    color: colors.black,
  },
  wButton: {
    flexDirection: 'row',
    marginTop: 10,
  },
  left: {
    marginLeft: 10,
  },
});
export default styles;
