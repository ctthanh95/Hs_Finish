import {StyleSheet} from 'react-native';
import {colors, fonts, dimensions} from '../../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    padding: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    width: '100%',
    height: 200,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wEdit: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: colors.light,
  },
  edit: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  choose: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  wAddress: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  wText: {
    marginLeft: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    fontFamily: fonts.light,
  },
  wButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    //OnLayout
    bottom: 200 + 15,
    paddingHorizontal: 10,
  },
  wIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  point: {
    width: 48,
    height: 48,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
});
export default styles;
