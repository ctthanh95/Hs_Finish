import React, {useEffect, useState, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetFlatList,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';
import {colors as constantColors, fonts, images} from '../../../../constants';
import {CustomIcon, CustomLoading} from '../../../../components';
import {Location} from '../components';
//
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useTheme, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {selectAddress} from '../../../../redux/actions/mapAction';

const Address = ({bottomSheetModalRef}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {dismiss} = useBottomSheetModal();
  const dispatch = useDispatch();
  const {address} = useSelector(state => state.mapReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [dataAddress, setDataAddress] = useState([]);
  const navigateScreen = (screen, data) => {
    navigation.navigate(screen, data);
  };
  const handleSelect = () => {
    dismiss();
    setTimeout(() => {
      navigateScreen('MapSelect', bottomSheetModalRef);
    }, 500);
  };
  const handleItem = item => {
    dispatch(selectAddress(item));
  };
  useEffect(() => {
    setIsLoading(true);
    let uid = auth().currentUser?.providerData[0]?.uid;
    const subscriber = firestore()
      .collection('user')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        let arr = [];
        arr = documentSnapshot.data()?.address;
        arr.unshift(address);
        setDataAddress(arr);
        setIsLoading(false);
      });
    return () => {
      subscriber();
    };
  }, []);
  const renderBackdrop = props => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    );
  };
  return (
    <Portal>
      <BottomSheetModal
        enableDismissOnClose
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['90%']}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <View style={styles.header}>
            <Text
              style={[
                styles.address,
                {
                  color: colors.text,
                },
              ]}>
              Select place
            </Text>
            <TouchableOpacity style={styles.map} onPress={handleSelect}>
              <Image source={images.map} style={styles.imgMap} />
              <Text style={styles.choose}>Select by map</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wInput}>
            <CustomIcon
              type="Entypo"
              name="vinyl"
              size={24}
              color={constantColors.background}
            />
            <TextInput
              style={styles.input}
              placeholder="Search address"
              placeholderTextColor={constantColors.grey}
            />
            <CustomIcon
              type="AntDesign"
              name="search1"
              size={24}
              color={constantColors.black}
            />
          </View>
          {isLoading ? (
            <CustomLoading />
          ) : (
            <BottomSheetFlatList
              keyExtractor={(item, index) => index}
              data={dataAddress}
              renderItem={({item, index}) => (
                <Location
                  item={item}
                  index={index}
                  colors={colors}
                  handleItem={handleItem}
                />
              )}
            />
          )}
        </View>
      </BottomSheetModal>
    </Portal>
  );
};

export default memo(Address);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  map: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: constantColors.light,
  },
  choose: {
    fontSize: 14,
    fontFamily: fonts.light,
    marginLeft: 10,
    color: constantColors.black,
  },
  imgMap: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  wInput: {
    flexDirection: 'row',
    backgroundColor: constantColors.light,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    height: 50,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: constantColors.black,
  },
});
