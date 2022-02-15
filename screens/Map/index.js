import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  colors as constantColors,
  dimensions,
  images,
  lotties,
} from '../../constants';
import {CustomButton, CustomHeader, CustomIcon} from '../../components';
import styles from './styles';
//
import {useTheme, useNavigation, useRoute} from '@react-navigation/native';

const Map = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const mapView = useRef();
  const {colors} = useTheme();
  const route = useRoute();
  const {label, latitude, longitude, street} = route.params;
  const [angle, setAngle] = useState(0);
  const defaultLocation = {
    latitude: 10.850441647728765,
    longitude: 106.63202013819198,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1 * (dimensions.width / dimensions.height),
  };
  const [start, setStart] = useState({
    latitude: 10.850441647728765,
    longitude: 106.63202013819198,
  });
  //
  const [finish, setFinish] = useState({
    latitude,
    longitude,
  });

  const setCenterMarker = () => {
    mapView.current.fitToCoordinates([start, finish], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      animated: false,
    });
  };
  const handleCall = () => {
    Linking.openURL(`tel:0123456789`);
  };
  const navigateGoBack = () => {
    navigation.goBack();
  };
  //
  const Item = ({type, name, label, address}) => {
    return (
      <View style={styles.wItem}>
        <CustomIcon
          type="MaterialIcons"
          name={name}
          size={30}
          color={colors.text}
        />
        <View style={styles.wText}>
          <Text style={styles.address}>{label}</Text>
          <Text
            style={[
              styles.label,
              {
                color: colors.text,
              },
            ]}>
            {address}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <MapView
        loadingEnabled
        loadingIndicatorColor={constantColors.background}
        loadingBackgroundColor={constantColors.light}
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        initialRegion={defaultLocation}
        style={styles.container}
        onMapLoaded={setCenterMarker}>
        <Marker
          key="start"
          coordinate={start}
          tracksViewChanges={false}
          rotation={angle}
          anchor={{
            x: 0.5,
            y: 0.5,
          }}>
          <CustomIcon
            type="Ionicons"
            name="rocket-sharp"
            size={35}
            color="blue"
          />
        </Marker>
        {finish && (
          <Marker
            key="finish"
            coordinate={finish}
            tracksViewChanges={false}
            rotation={angle}
            anchor={{
              x: 0.5,
              y: 0.5,
            }}>
            <CustomIcon
              type="Ionicons"
              name="golf-sharp"
              size={35}
              color="red"
            />
          </Marker>
        )}
        <MapViewDirections
          origin={start}
          destination={finish}
          apikey={'AIzaSyAIWQfpc52mow_l9UkkPRy6Pjphkh9Aw7o'}
          strokeWidth={5}
          strokeColors={'red'}
          optimizeWaypoints={true}
        />
      </MapView>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
          },
        ]}>
        <Item
          name="my-location"
          label="Your delivery time"
          address="8 minutes"
        />
        <Item name="access-time" label="Your address" address={label} />
        <View style={styles.person}>
          <View style={styles.left}>
            <View style={styles.icon}>
              <CustomIcon
                type="Ionicons"
                name="person"
                size={24}
                color={'#CCFF33'}
              />
            </View>
            <View>
              <Text style={[styles.label, styles.white]}>Cao Tien Thanh</Text>
              <Text style={[styles.address, styles.white]}>Delivery Man</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.right} onPress={handleCall}>
            <CustomIcon
              type="Entypo"
              name="phone"
              size={24}
              color={constantColors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.back,
          {
            top: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight,
          },
        ]}
        onPress={navigateGoBack}>
        <CustomIcon
          type="AntDesign"
          name="left"
          size={24}
          color={constantColors.grey}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Map;
