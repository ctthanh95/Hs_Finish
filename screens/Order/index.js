import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomAlert,
  CustomButton,
  CustomCard,
  CustomHeader,
  CustomIcon,
  CustomLoading,
} from '../../components';
import {colors as constantColors, images} from '../../constants';
import styles from './styles';
//
import {useNavigation, useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Empty} from '../BottomTab/Home/components';
import {useDispatch, useSelector} from 'react-redux';
import {reorderCart} from '../../redux/actions/cartAction';

const Order = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState('History');
  const [dataHistory, setDataHistory] = useState([]);
  const [dataUpcoming, setDataUpcoming] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const navigateScreen = (screen, item) => {
    navigation.navigate(screen, item);
  };
  const handleHistory = () => {
    setTab('History');
  };
  const handleUpcoming = () => {
    setTab('Upcoming');
  };
  const handleLeftButton = item => {
    if (tab === 'History') {
      dispatch(reorderCart(item));
      navigation.navigate('Cart');
    } else {
      navigateScreen('Delivery', item);
    }
  };
  const handleRightButton = item => {
    if (tab === 'History') {
      navigation.navigate('Rate');
    } else {
      setIsLoading(true);
      let arr = dataAll.map(e => {
        if (e.id === item.id) {
          e.status = 0;
        }
        return e;
      });
      let uid = auth().currentUser?.providerData[0]?.uid;
      firestore()
        .collection('order')
        .doc(uid)
        .update({
          data: arr,
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };
  useEffect(() => {
    setIsLoading(true);
    let uid = auth().currentUser?.providerData[0]?.uid;
    const subscriber = firestore()
      .collection('order')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        let arr = [];
        if (documentSnapshot.data()) {
          arr = documentSnapshot.data().data;
        }
        setDataAll(arr);
        let history = [];
        let upcoming = [];
        arr.forEach(e => {
          if (e.status === 5 || e.status === 0) {
            history.push(e);
          } else {
            upcoming.push(e);
          }
        });
        setDataHistory(history.reverse());
        setDataUpcoming(upcoming.reverse());
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);
  const Item = ({item}) => {
    return (
      <View style={styles.background}>
        <TouchableOpacity
          style={styles.wItem}
          onPress={() => navigateScreen('DetailOrder', item)}>
          <View style={styles.wImg}>
            <Image source={images.product} style={styles.imgItem} />
          </View>
          <View style={styles.wTxt}>
            <View style={styles.txtBetween}>
              <Text style={styles.name}>
                {item.cart[0].name} {item.length === 1 ? '' : '...'}
              </Text>
              <Text style={styles.date}>
                {item.date}, {item.time} • {item.length}{' '}
                {item.length === 1 ? 'Item' : 'Items'}
              </Text>
              <Text
                style={[
                  styles.order,
                  {
                    color:
                      item.status === 5
                        ? constantColors.black
                        : constantColors.red,
                  },
                ]}>
                ●{' '}
                {item.status === 5
                  ? 'Order delivered'
                  : item.status === 0
                  ? 'Order Cancelled'
                  : 'Food is on the way'}
              </Text>
            </View>
            <Text style={styles.price}>$ {item.money}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.wBtnItem}>
          <View style={styles.container}>
            <CustomButton
              height={40}
              title={tab === 'History' ? 'Re-Order' : 'Track Order'}
              color={constantColors.white}
              backgroundColor="#D8BFD8"
              onPress={() => handleLeftButton(item)}
            />
          </View>
          <View
            style={[
              styles.container,
              {
                marginLeft: 25,
              },
            ]}>
            <CustomButton
              height={40}
              title={tab === 'History' ? 'Rate' : 'Cancel'}
              color={constantColors.white}
              backgroundColor="#D8BFD8"
              onPress={() => handleRightButton(item)}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.wrap}>
            <CustomHeader onPress={navigateGoBack} title="ORDER" />
            <View style={styles.wItem}>
              <View style={styles.container}>
                <CustomButton
                  onPress={handleHistory}
                  title="History"
                  color={
                    tab === 'History'
                      ? constantColors.white
                      : constantColors.red
                  }
                  backgroundColor={
                    tab === 'History'
                      ? constantColors.background
                      : constantColors.light
                  }
                />
              </View>
              <View
                style={[
                  styles.container,
                  {
                    marginLeft: 10,
                  },
                ]}>
                <CustomButton
                  onPress={handleUpcoming}
                  title="Upcoming"
                  color={
                    tab === 'Upcoming'
                      ? constantColors.white
                      : constantColors.red
                  }
                  backgroundColor={
                    tab === 'Upcoming'
                      ? constantColors.background
                      : constantColors.light
                  }
                />
              </View>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={Empty}
              data={tab === 'History' ? dataHistory : dataUpcoming}
              keyExtractor={item => item.id + ''}
              renderItem={({item}) => <Item item={item} />}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Order;
