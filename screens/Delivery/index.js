import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors as constantColors, images} from '../../constants';
import {
  CustomButton,
  CustomIcon,
  CustomLoading,
  CustomHeader,
} from '../../components';
import styles from './styles';
//
import {useTheme, useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
//
const data = [
  {
    id: 1,
    title: 'Order Confirmed',
    description: 'Your order have been received',
  },
  {
    id: 2,
    title: 'Order Prepared',
    description: 'Your order have been prepared',
  },
  {
    id: 3,
    title: 'Delivery in Progress',
    description: 'Hang on! Your food is on the alway',
  },
  {
    id: 4,
    title: 'Delivered',
    description: 'Enjoy your meal!',
  },
  {
    id: 5,
    title: 'Rate us',
    description: 'Help us improve our service',
  },
];

const Delivery = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(0);
  const [dataAll, setDataAll] = useState([]);
  const [id, setId] = useState('');
  const [address, setAddress] = useState({});
  const navigateScreen = (screen, item) => {
    navigation.navigate(screen, item);
  };
  const navigateGoBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    if (route.params) {
      setDate(`${route.params.date} - ${route.params.time}`);
      setStatus(route.params.status);
      setId(route.params.id);
      setAddress(route.params.address);
    } else {
      setIsLoading(true);
      let uid = auth().currentUser?.providerData[0]?.uid;
      const subscriber = firestore()
        .collection('order')
        .doc(uid)
        .onSnapshot(documentSnapshot => {
          let arr = documentSnapshot.data().data;
          let item = arr[arr.length - 1];
          setDate(`${item.date} - ${item.time}`);
          setStatus(item.status);
          setId(item.id);
          setAddress(item.address);
          setIsLoading(false);
        });
      return () => subscriber();
    }
  }, []);
  useEffect(() => {
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
      });
    return () => subscriber();
  }, []);
  const handleCancel = id => {
    let arr = dataAll.map(e => {
      if (e.id === id) {
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
        if (route.params) {
          navigateGoBack();
        } else {
          navigateScreen('Home');
        }
      })
      .catch(error => {
        // console.log(error);
      });
  };
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.wrap}>
              {route.params ? (
                <CustomHeader title="CHECKOUT" onPress={navigateGoBack} />
              ) : (
                <Text style={[styles.title, {color: colors.text}]}>
                  DELIVERY STATUS
                </Text>
              )}
              <Text style={styles.description}>Estimated Delivery</Text>
              <Text style={[styles.time, {color: colors.text}]}>{date}</Text>
              <View style={[styles.row, styles.bill]}>
                <Text style={styles.track}>Track Order</Text>
                <Text style={styles.code}>{id.slice(0, 8).toUpperCase()}</Text>
              </View>
              <View style={styles.status}>
                {data.map((e, i) => {
                  return (
                    <View key={i} style={styles.item}>
                      <View style={styles.image}>
                        <CustomIcon
                          type="AntDesign"
                          name="checkcircle"
                          size={30}
                          color={
                            e.id <= status
                              ? constantColors.background
                              : constantColors.grey
                          }
                        />
                        {i < data.length - 1 ? (
                          e.id <= status - 1 ? (
                            <View style={styles.line} />
                          ) : (
                            <Image
                              source={images.dot}
                              style={styles.imageDot}
                            />
                          )
                        ) : null}
                      </View>
                      <View style={styles.position}>
                        <Text style={styles.titleItem}>{e.title}</Text>
                        <Text style={styles.descriptionItem}>
                          {e.description}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View style={styles.button}>
                {status === 5 ? (
                  <CustomButton
                    title="Done"
                    backgroundColor={constantColors.background}
                    color={constantColors.white}
                  />
                ) : (
                  <>
                    <View style={styles.two}>
                      <View style={styles.width}>
                        <CustomButton
                          onPress={() => handleCancel(id)}
                          title="Cancel"
                          backgroundColor={constantColors.light}
                          color={constantColors.red}
                        />
                      </View>
                      <View style={styles.width}>
                        <CustomButton
                          title="Map View"
                          onPress={() => navigateScreen('Map', address)}
                          backgroundColor={constantColors.background}
                          color={constantColors.white}
                        />
                      </View>
                    </View>
                    {route.params ? null : (
                      <CustomButton
                        title="Go Home"
                        onPress={() => navigateScreen('Home')}
                        backgroundColor={constantColors.background}
                        color={constantColors.white}
                      />
                    )}
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Delivery;
