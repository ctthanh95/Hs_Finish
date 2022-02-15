import React, {useEffect, useRef, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swipeable from 'react-native-swipeable';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import {lotties} from '../../../constants';
import {colors as constantColors, dimensions} from '../../../constants';
import {CustomAlert, CustomButton, CustomIcon} from '../../../components';
import styles from './styles';
//
import {useNavigation, useTheme, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  deleteItemFromCart,
} from '../../../redux/actions/cartAction';

const Cart = ({onPress}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {cart, money} = useSelector(state => state.cartReducer);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const navigateScreen = (screen, item) => {
    navigation.navigate(screen, item);
  };
  const handleIncrease = item => {
    dispatch(increaseQuantity(item));
  };
  const handleDecrease = item => {
    dispatch(decreaseQuantity(item));
  };
  const handleDelete = item => {
    dispatch(deleteItemFromCart(item));
  };
  const handleOrder = () => {
    if (cart.length) {
      navigateScreen('CheckOut');
    } else {
      setIsShowAlert(true);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onPress();
    });
    return unsubscribe;
  }, [navigation]);

  const Empty = () => {
    return (
      <View style={styles.empty}>
        <LottieView source={lotties.empty} loop autoPlay style={styles.size} />
      </View>
    );
  };
  const Money = ({title, value, isMargin}) => {
    return (
      <View style={[styles.row, {marginTop: isMargin ? 5 : 0}]}>
        <Text style={styles.textTotal}>{title}</Text>
        <Text style={styles.moneyTotal}>$ {value}</Text>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrap}>
          <Text style={[styles.title, {color: colors.text}]}>MY CART</Text>
          <View style={[styles.container, {marginBottom: 15}]}>
            <View style={styles.body}>
              <View style={styles.product}>
                {cart.length === 0 ? (
                  <Empty />
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={cart}
                    keyExtractor={item => item.idCart}
                    renderItem={({item}) => {
                      return (
                        <Swipeable
                          rightButtons={[
                            <TouchableOpacity
                              style={styles.delete}
                              onPress={() => handleDelete(item)}>
                              <CustomIcon
                                type="MaterialCommunityIcons"
                                name="delete"
                                size={30}
                                color={constantColors.white}
                              />
                            </TouchableOpacity>,
                          ]}>
                          <View style={styles.wItem}>
                            <View style={styles.big}>
                              <TouchableOpacity
                                style={styles.left}
                                onPress={() => navigateScreen('Detail', item)}>
                                <FastImage
                                  style={styles.image}
                                  source={{
                                    uri: item.image,
                                    priority: FastImage.priority.normal,
                                  }}
                                  resizeMode={FastImage.resizeMode.contain}
                                />
                                <View style={styles.wText}>
                                  <Text style={styles.name} numberOfLines={1}>
                                    {item.name}
                                  </Text>
                                  {item.sizeCart ? (
                                    <Text style={styles.money}>
                                      $ {item.priceCart} - Size {item.sizeCart}
                                    </Text>
                                  ) : (
                                    <Text style={styles.money}>
                                      $ {item.priceCart}
                                    </Text>
                                  )}
                                </View>
                              </TouchableOpacity>
                              <View style={styles.button}>
                                <TouchableOpacity
                                  onPress={() => {
                                    if (item.quantity > 1) {
                                      handleDecrease(item);
                                    }
                                  }}>
                                  <CustomIcon
                                    type="AntDesign"
                                    name="minus"
                                    size={24}
                                    color={constantColors.background}
                                  />
                                </TouchableOpacity>
                                <Text style={styles.txtQuality}>
                                  {item.quantity}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => handleIncrease(item)}>
                                  <CustomIcon
                                    type="AntDesign"
                                    name="plus"
                                    size={24}
                                    color={constantColors.background}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Swipeable>
                      );
                    }}
                  />
                )}
              </View>
              <View style={styles.order}>
                <View>
                  <Money title="Subtotal" value={money} />
                  <Money title="Shipping fee" value={0} isMargin />
                </View>
                <View style={styles.underline} />
                <View style={styles.row}>
                  <Text style={styles.total}>Total:</Text>
                  <Text style={styles.total}>$ {money}</Text>
                </View>
                <CustomButton
                  title="Place your Order"
                  backgroundColor={constantColors.background}
                  color={constantColors.white}
                  styleTouch={{marginBottom: 0}}
                  onPress={handleOrder}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <CustomAlert
        modal={isShowAlert}
        setModal={setIsShowAlert}
        description="Empty cart!"
      />
    </>
  );
};

export default Cart;
