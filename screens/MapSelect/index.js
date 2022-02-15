import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import {colors as constantColors, lotties, dimensions} from '../../constants';
import {CustomButton, CustomIcon} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
//
import {useTheme, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getAddress} from '../../helpers/axios';
import {selectAddress} from '../../redux/actions/mapAction';

const MapSelect = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef();
  const dispatch = useDispatch();
  const {address} = useSelector(state => state.mapReducer);
  const defaultLocation = {
    latitude: address.latitude,
    longitude: address.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1 * (dimensions.width / dimensions.height),
  };
  const [currentAddress, setCurrentAddress] = useState(address);
  const [isLoading, setIsLoading] = useState(false);
  //
  const handleBack = () => {
    navigation.goBack();
  };
  const handleEdit = () => {
    navigation.goBack();
    route.params.current.present();
  };
  const onRegionChange = async region => {
    let rs = await getAddress(region.latitude, region.longitude);
    let label = rs?.Label;
    let street = rs?.Street;
    setCurrentAddress({
      label: label,
      street: street ? street : label,
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };
  const handleFocus = () => {
    mapRef.current.animateToRegion(defaultLocation, 1000);
  };
  const handleConfirm = () => {
    dispatch(selectAddress(currentAddress));
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        loadingEnabled
        loadingIndicatorColor={constantColors.background}
        loadingBackgroundColor={constantColors.light}
        provider={PROVIDER_GOOGLE}
        initialRegion={defaultLocation}
        onRegionChangeComplete={onRegionChange}
        style={styles.container}
        onMapLoaded={() => setIsLoading(true)}
      />
      {isLoading && (
        <View style={styles.markerFixed}>
          <LottieView
            source={lotties.point}
            loop
            autoPlay
            style={styles.point}
          />
        </View>
      )}
      <View style={styles.wButton}>
        <TouchableOpacity style={styles.wIcon} onPress={handleBack}>
          <CustomIcon
            type="AntDesign"
            name="arrowleft"
            size={24}
            color={constantColors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wIcon} onPress={handleFocus}>
          <CustomIcon
            type="MaterialIcons"
            name="my-location"
            size={24}
            color={constantColors.black}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.bottom,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <View style={styles.header}>
          <Text
            style={[
              styles.choose,
              {
                color: colors.text,
              },
            ]}>
            Choose delivery location
          </Text>
          <TouchableOpacity style={styles.wEdit} onPress={handleEdit}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wAddress}>
          <CustomIcon
            type="Ionicons"
            name="location-sharp"
            size={24}
            color={constantColors.background}
          />
          <View style={styles.wText}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                },
              ]}>
              {currentAddress.street}
            </Text>
            <Text
              style={[
                styles.address,
                {
                  color: colors.text,
                },
              ]}>
              {currentAddress.label}
            </Text>
          </View>
        </View>
        <CustomButton
          onPress={handleConfirm}
          color={constantColors.white}
          title="Confirm Location"
          backgroundColor={constantColors.background}
        />
      </View>
    </View>
  );
};

export default MapSelect;
