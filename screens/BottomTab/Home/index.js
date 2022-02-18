import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomIcon, CustomLoading} from '../../../components';
import {colors as constantColors} from '../../../constants';
import {
  Item,
  Category,
  Menu,
  Recommend,
  Popular,
  Filter,
  Empty,
  Address,
} from './components';
import styles from './styles';
//
import firestore from '@react-native-firebase/firestore';
import {useTheme, useNavigation} from '@react-navigation/native';
import {isEmpty, isEqual} from 'lodash';
import Geolocation from 'react-native-geolocation-service';
import {getAddress} from '../../../helpers/axios';
import {useSelector, useDispatch} from 'react-redux';
import {addAddress, selectAddress} from '../../../redux/actions/mapAction';
//
const Home = ({onPress}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {dismiss} = useBottomSheetModal();
  const {select} = useSelector(state => state.mapReducer);
  const [menu, setMenu] = useState(1);
  const [category, setCategory] = useState(1);
  const [modalFilter, setModalFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //Data firebase
  const [dataCategory, setDataCategory] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  //Product
  const [popular, setPopular] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [all, setAll] = useState([]);
  //Filter
  const [filter, setFilter] = useState({});
  //Ref
  const popularRef = useRef();
  const recommendRef = useRef();
  const bottomSheetModalRef = useRef(null);
  //Arrow Function
  const navigateScreen = (screen, data) => {
    navigation.navigate(screen, data);
  };
  const handleModal = () => {
    setModalFilter(true);
  };
  const filterAll = () => {
    if (isEmpty(filter)) {
      let tempAll = dataProduct.filter(
        e => e.category === category && e.menu.includes(menu),
      );
      setAll(tempAll);
    } else {
      let tempAll = dataProduct.filter(
        e =>
          e.category === category &&
          e.menu.includes(menu) &&
          e.distance >= filter.distance[0] &&
          e.distance <= filter.distance[1] &&
          e.price >= filter.price[0] &&
          e.price <= filter.price[1] &&
          e.star >= filter.star,
      );
      let rsAll = [];
      if (filter.delivery !== undefined && filter.tag !== undefined) {
        rsAll = tempAll.filter(
          e => e.time <= filter.delivery && e.tag.includes(filter.tag),
        );
      } else if (filter.delivery) {
        rsAll = tempAll.filter(e => e.time <= filter.delivery);
      } else if (filter.tag) {
        rsAll = tempAll.filter(e => e.tag.includes(filter.tag));
      } else {
        rsAll = tempAll;
      }
      setAll(rsAll);
    }
  };
  const filterPopularRecommend = () => {
    if (isEmpty(filter)) {
      let tempPopular = dataProduct.filter(
        e => e.category === category && e.menu.includes(3),
      );
      setPopular(tempPopular);
      let tempRecommend = dataProduct.filter(
        e => e.category === category && e.menu.includes(6),
      );
      setRecommend(tempRecommend);
    } else {
      let tempPopular = dataProduct.filter(
        e =>
          e.category === category &&
          e.menu.includes(3) &&
          e.distance >= filter.distance[0] &&
          e.distance <= filter.distance[1] &&
          e.price >= filter.price[0] &&
          e.price <= filter.price[1] &&
          e.star >= filter.star,
      );
      let rsPopular = [];
      if (filter.delivery !== undefined && filter.tag !== undefined) {
        rsPopular = tempPopular.filter(
          e => e.time <= filter.delivery && e.tag.includes(filter.tag),
        );
      } else if (filter.delivery) {
        rsPopular = tempPopular.filter(e => e.time <= filter.delivery);
      } else if (filter.tag) {
        rsPopular = tempPopular.filter(e => e.tag.includes(filter.tag));
      } else {
        rsPopular = tempPopular;
      }
      setPopular(rsPopular);
      //
      let tempRecommend = dataProduct.filter(
        e =>
          e.category === category &&
          e.menu.includes(6) &&
          e.distance >= filter.distance[0] &&
          e.distance <= filter.distance[1] &&
          e.price >= filter.price[0] &&
          e.price <= filter.price[1] &&
          e.star >= filter.star,
      );
      let rsRecommend = [];
      if (filter.delivery !== undefined && filter.tag !== undefined) {
        rsRecommend = tempRecommend.filter(
          e => e.time <= filter.delivery && e.tag.includes(filter.tag),
        );
      } else if (filter.delivery) {
        rsRecommend = tempRecommend.filter(e => e.time <= filter.delivery);
      } else if (filter.tag) {
        rsRecommend = tempRecommend.filter(e => e.tag.includes(filter.tag));
      } else {
        rsRecommend = tempRecommend;
      }
      setRecommend(rsRecommend);
    }
  };
  const scrollFlatList = () => {
    popularRef.current?.scrollToOffset({animated: false, offset: 0});
    recommendRef.current?.scrollToOffset({animated: false, offset: 0});
  };
  const handleBottomSheetModal = () => {
    bottomSheetModalRef.current?.present();
  };
  const handleAddress = data => {
    dispatch(addAddress(data));
    dispatch(selectAddress(data));
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const location = position?.coords;
        let rs = await getAddress(location?.latitude, location?.longitude);
        let label = rs?.Label;
        let street = rs?.Street;
        let data = {
          label: label,
          street: street ? street : label,
          latitude: location.latitude,
          longitude: location.longitude,
        };
        handleAddress(data);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  //Address
  useEffect(() => {
    async function requestLocationPermission() {
      if (Platform.OS === 'ios') {
        getLocation();
      }
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Hs App',
              message: 'Hs App access to your location ',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            console.log('location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
    requestLocationPermission();
  }, []);
  //Product
  useEffect(() => {
    setIsLoading(true);
    const subscriber1 = firestore()
      .collection('category')
      .orderBy('id')
      .onSnapshot(documentSnapshot => {
        let arr = [];
        documentSnapshot.forEach(e => arr.push(e.data()));
        setDataCategory(arr);
        setCategory(arr[0].id);
      });
    const subscriber2 = firestore()
      .collection('menu')
      .orderBy('id')
      .onSnapshot(documentSnapshot => {
        let arr = [];
        documentSnapshot.forEach(e => arr.push(e.data()));
        setDataMenu(arr);
        setMenu(arr[0].id);
      });
    const subscriber3 = firestore()
      .collection('product')
      .orderBy('id')
      .onSnapshot(documentSnapshot => {
        let arr = [];
        documentSnapshot.forEach(e => arr.push(e.data()));
        setDataProduct(arr);
        let tempAll = arr.filter(
          e => e.category === category && e.menu.includes(menu),
        );
        setAll(tempAll);
        let tempPopular = arr.filter(
          e => e.category === category && e.menu.includes(3),
        );
        setPopular(tempPopular);
        let tempRecommend = arr.filter(
          e => e.category === category && e.menu.includes(6),
        );
        setRecommend(tempRecommend);
        setIsLoading(false);
      });
    return () => {
      subscriber1();
      subscriber2();
      subscriber3();
    };
  }, []);
  //All
  useEffect(() => {
    filterAll();
  }, [menu, category, filter]);
  //Popular & Recommend
  useEffect(() => {
    filterPopularRecommend();
    scrollFlatList();
  }, [category, filter]);
  //Animated
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onPress();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <SafeAreaView style={styles.container}>
          {!isEmpty(select) && (
            <Address bottomSheetModalRef={bottomSheetModalRef} />
          )}
          <View style={styles.wrap}>
            <View style={styles.search}>
              <TouchableOpacity
                style={styles.left}
                onPress={() => {
                  navigateScreen('Search', dataProduct);
                }}>
                <CustomIcon
                  type="AntDesign"
                  name="search1"
                  size={24}
                  color={constantColors.black}
                />
                <Text style={styles.txtSearch}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleModal}>
                <CustomIcon
                  type="MaterialCommunityIcons"
                  name={
                    isEmpty(filter) ? 'filter-outline' : 'filter-plus-outline'
                  }
                  size={24}
                  color={
                    isEmpty(filter) ? constantColors.black : constantColors.red
                  }
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.txtDelivery}>DELIVERY TO</Text>
            <View style={styles.wAddress}>
              <Text style={[styles.txtAddress, {color: colors.text}]}>
                {isEmpty(select) ? 'Waiting' : select.label}
              </Text>
              <TouchableOpacity
                onPress={handleBottomSheetModal}
                style={styles.button}>
                <CustomIcon
                  type="AntDesign"
                  name="down"
                  size={20}
                  color={constantColors.background}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              ListHeaderComponent={
                <>
                  <Category
                    data={dataCategory}
                    category={category}
                    setCategory={setCategory}
                  />
                  <Popular data={popular} popularRef={popularRef} />
                  <Recommend data={recommend} recommendRef={recommendRef} />
                  <Menu data={dataMenu} menu={menu} setMenu={setMenu} />
                </>
              }
              ListEmptyComponent={Empty}
              showsVerticalScrollIndicator={false}
              data={all}
              keyExtractor={item => item.id}
              renderItem={({item}) => <Item item={item} />}
            />
          </View>
        </SafeAreaView>
      )}
      {modalFilter && (
        <Filter
          modalFilter={modalFilter}
          setModalFilter={setModalFilter}
          setFilter={setFilter}
        />
      )}
    </>
  );
};

export default Home;
