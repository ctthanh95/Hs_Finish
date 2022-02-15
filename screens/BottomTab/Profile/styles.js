import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 20,
  },
  wItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
  },
  wLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wIcon: {
    backgroundColor: colors.background,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.medium,
    marginLeft: 15,
  },
  background: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  imgP: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 45,
  },
  wTxtP: {
    marginLeft: 10,
    height: 100,
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  txtName: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  txtEmail: {
    fontFamily: fonts.regular,
    color: colors.grey,
    fontSize: 14,
  },
  underline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.black,
    marginVertical: 15,
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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
  choose: {
    fontFamily: fonts.regular,
    color: colors.black,
    marginVertical: 15,
    fontSize: 14,
    marginLeft: 10,
  },
  cancel: {
    fontFamily: fonts.bold,
    color: colors.black,
    textAlign: 'right',
    marginTop: 15,
    fontSize: 14,
    marginRight: 10,
  },
  imgEdit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
