import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {
  CustomAlert,
  CustomButton,
  CustomCard,
  CustomHeader,
  CustomIcon,
  CustomLoading,
} from '../../components';
import {Empty} from '../BottomTab/Home/components';
import {colors as constantColors} from '../../constants';
//
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {resetCart} from '../../redux/actions/cartAction';
import {isEmpty} from 'lodash';
import moment from 'moment';
import uuid from 'react-native-uuid';

const CheckOut = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {money, cart, length} = useSelector(state => state.cartReducer);
  const {select} = useSelector(state => state.mapReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [yourCard, setYourCard] = useState([]);
  const [check, setCheck] = useState({});
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [info, setInfo] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const handleCheckbox = item => {
    setCheck(item);
  };
  const handleDiscount = () => {
    setCode('');
    setDescription('Wrong discount code!');
    setIsShowAlert(true);
  };
  const handleOrder = () => {
    if (isEmpty(check)) {
      setCode('');
      setDescription('Please add your cart!');
      setIsShowAlert(true);
    } else if (info?.phoneNumber === null) {
      setDescription('Please update your information!');
      setIsShowAlert(true);
    } else {
      setIsLoading(true);
      let uid = auth().currentUser?.providerData[0]?.uid;
      firestore()
        .collection('user')
        .doc(uid)
        .update({
          address: firestore.FieldValue.arrayUnion(select),
        })
        .then()
        .catch(error => console.log(error));
      if (isCheck) {
        firestore()
          .collection('order')
          .doc(uid)
          .update({
            data: firestore.FieldValue.arrayUnion({
              id: uuid.v4(),
              card: check,
              address: select,
              cart,
              money,
              ship: 0,
              status: 1,
              length: length,
              date: moment().format('DD/MM/YYYY'),
              time: moment().format('HH:mm'),
            }),
          })
          .then(() => {
            setIsLoading(false);
            dispatch(resetCart());
            navigateScreen('Success');
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          });
      } else {
        firestore()
          .collection('order')
          .doc(uid)
          .set({
            data: firestore.FieldValue.arrayUnion({
              id: uuid.v4(),
              card: check,
              address: select,
              cart,
              money,
              ship: 0,
              status: 1,
              length: length,
              date: moment().format('DD/MM/YYYY'),
              time: moment().format('HH:mm'),
            }),
          })
          .then(() => {
            setIsLoading(false);
            dispatch(resetCart());
            navigateScreen('Success');
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          });
      }
    }
  };
  useEffect(() => {
    setIsLoading(true);
    let uid = auth().currentUser?.providerData[0]?.uid;
    const subscriber = firestore()
      .collection('user')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        let arr = documentSnapshot
          .data()
          .card.sort((a, b) => b.cardDefault - a.cardDefault);
        setYourCard(arr);
        setCheck(arr[0]);
      });
    const subscriber2 = firestore()
      .collection('user')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        setInfo(documentSnapshot.data());
      });
    const subscriber1 = firestore()
      .collection('order')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.data()) {
          setIsCheck(true);
        }
        setIsLoading(false);
      });
    return () => {
      subscriber();
      subscriber1();
      subscriber2();
    };
  }, []);
  const Money = ({title, money, isMarginTop}) => {
    return (
      <View style={[styles.row, {marginTop: isMarginTop ? 5 : 0}]}>
        <Text style={styles.textTotal}>{title}</Text>
        <Text style={styles.moneyTotal}>$ {money}</Text>
      </View>
    );
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
              <CustomHeader title="CHECKOUT" onPress={navigateGoBack} />
              <Text style={[styles.txtAdd, {color: colors.text}]}>
                Your card
              </Text>
              {yourCard.length ? (
                yourCard.map(e => {
                  return (
                    <CustomCard
                      item={e}
                      key={e.idCard}
                      handleCheckbox={handleCheckbox}
                      check={check}
                      isCheckOut
                    />
                  );
                })
              ) : (
                <Empty />
              )}
              <CustomButton
                title="Add New Cart"
                backgroundColor={constantColors.background}
                color={constantColors.white}
                styleTouch={{marginTop: 15}}
                onPress={() => navigateScreen('Card')}
              />
              <Text style={[styles.txtAdd, {color: colors.text}]}>
                Delivery Address
              </Text>
              <TouchableOpacity style={styles.wAddress}>
                <CustomIcon
                  type="MaterialIcons"
                  name="my-location"
                  size={30}
                  color={constantColors.black}
                />
                <Text style={styles.address}>{select.label}</Text>
              </TouchableOpacity>
              <Text style={[styles.txtAdd, {color: colors.text}]}>
                Add Coupon
              </Text>
              <View style={styles.wCoupon}>
                <TextInput
                  style={styles.input}
                  onChangeText={setCode}
                  value={code}
                />
                <TouchableOpacity style={styles.icon} onPress={handleDiscount}>
                  <CustomIcon
                    type="MaterialCommunityIcons"
                    name="sale"
                    size={30}
                    color={constantColors.white}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.order}>
                <View>
                  <Money title="Subtotal" money={money} />
                  <Money title="Shipping fee" money={0.0} isMarginTop />
                </View>
                <View style={styles.underline} />
                <View style={styles.row}>
                  <Text style={styles.total}>Total:</Text>
                  <Text style={styles.total}>$ {money}</Text>
                </View>
                <CustomButton
                  onPress={handleOrder}
                  title="Place Your Order"
                  backgroundColor={constantColors.background}
                  color={constantColors.white}
                  styleTouch={{marginTop: 15}}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      <CustomAlert
        modal={isShowAlert}
        setModal={setIsShowAlert}
        description={description}
      />
    </>
  );
};

export default CheckOut;
