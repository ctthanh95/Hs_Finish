import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Rating} from 'react-native-ratings';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  CustomHeader,
  CustomIcon,
  CustomLoading,
  CustomText,
} from '../../components';
import {colors as constantColors, images} from '../../constants';
import styles from './styles';
//
import {useNavigation, useTheme, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart} from '../../redux/actions/cartAction';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Detail = () => {
  const route = useRoute();
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const length = useSelector(state => state.cartReducer.length);
  const {
    calorie,
    category,
    description,
    id,
    image,
    isFavorite,
    menu,
    name,
    price,
    distance,
    time,
    star,
    tag,
    range,
    size: dataSize,
    quantity: quantityCart,
    position,
  } = route.params;
  //State
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState(position ? position : 0);
  const [quantity, setQuantity] = useState(quantityCart ? quantityCart : 1);
  const [isHeart, setIsHeart] = useState(false);
  const [modal, setModal] = useState(false);
  //Function
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreased = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleBuy = item => {
    dispatch(addItemToCart(item));
  };
  const handleFavorite = item => {
    let uid = auth().currentUser?.providerData[0]?.uid;
    if (isHeart) {
      setIsHeart(false);
      firestore()
        .collection('favorite')
        .doc(uid)
        .update({
          productFavorite: firestore.FieldValue.arrayRemove(item),
        })
        .then();
    } else {
      setIsHeart(true);
      firestore()
        .collection('favorite')
        .doc(uid)
        .update({
          productFavorite: firestore.FieldValue.arrayUnion(item),
        })
        .then();
    }
  };
  useEffect(() => {
    setIsLoading(true);
    let uid = auth().currentUser?.providerData[0]?.uid;
    const subscriber = firestore()
      .collection('favorite')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        let arr = documentSnapshot.data()?.productFavorite;
        if (arr.length > 0) {
          arr.forEach(e => {
            if (e.id === id) {
              setIsHeart(true);
            }
          });
        }
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);

  //Render
  const Filter = () => {
    return (
      <View style={[styles.row, {marginBottom: 30}]}>
        <CustomText
          disabled={true}
          title={star}
          left={
            <CustomIcon
              type="AntDesign"
              name="star"
              size={24}
              color={constantColors.white}
            />
          }
          styleTouch={{
            backgroundColor: constantColors.background,
            paddingHorizontal: 10,
          }}
          styleText={{
            color: constantColors.white,
          }}
        />
        <CustomText
          title={`${time} Mins`}
          disabled={true}
          left={
            <CustomIcon
              type="Feather"
              name="clock"
              size={24}
              color={constantColors.white}
            />
          }
          styleTouch={{
            backgroundColor: constantColors.background,
            paddingHorizontal: 10,
          }}
          styleText={{
            color: constantColors.white,
          }}
        />
        <CustomText
          title="Free ship"
          disabled={true}
          left={
            <CustomIcon
              type="MaterialIcons"
              name="local-shipping"
              size={24}
              color={constantColors.white}
            />
          }
          styleTouch={{
            backgroundColor: constantColors.background,
            paddingHorizontal: 10,
          }}
          styleText={{
            color: constantColors.white,
          }}
        />
      </View>
    );
  };
  const Size = () => {
    const handleClick = e => {
      setSize(e);
    };
    return (
      <View style={[styles.row, {marginBottom: 30}]}>
        <Text style={[styles.size, {color: colors.text}]}>Sizes:</Text>
        {dataSize.map((e, i) => {
          return (
            <CustomText
              title={e}
              width={50}
              key={i}
              onPress={() => handleClick(i)}
              styleTouch={{
                backgroundColor:
                  size === i ? constantColors.background : constantColors.light,
              }}
              styleText={{
                color: size === i ? constantColors.white : constantColors.grey,
              }}
            />
          );
        })}
      </View>
    );
  };
  const imagesModal = [
    {
      url: image,
      props: {
        // headers: ...
      },
    },
  ];
  const ModalImage = () => {
    return (
      <Modal visible={modal} transparent={true} onRequestClose={closeModal}>
        <ImageViewer
          enableSwipeDown={true}
          onSwipeDown={() => closeModal()}
          loadingRender={() => <CustomLoading />}
          imageUrls={imagesModal}
          renderHeader={() => (
            <TouchableOpacity
              onPress={closeModal}
              style={[
                styles.back,
                {
                  top: Platform.OS === 'ios' ? insets.top : 10,
                },
              ]}>
              <CustomIcon
                type="AntDesign"
                name="arrowleft"
                size={24}
                color={constantColors.background}
              />
            </TouchableOpacity>
          )}
        />
      </Modal>
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
              <CustomHeader
                onPress={navigateGoBack}
                title="DETAILS"
                right={
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    style={[
                      styles.wCart,
                      {backgroundColor: constantColors.light},
                    ]}>
                    <CustomIcon
                      type="Feather"
                      name="shopping-cart"
                      size={24}
                      color={constantColors.black}
                    />
                    <View style={styles.cart}>
                      <Text style={styles.number}>{length}</Text>
                    </View>
                  </TouchableOpacity>
                }
              />
              <View style={styles.wItem}>
                <View style={styles.row}>
                  <View style={styles.wCalories}>
                    <Image
                      source={images.calories}
                      style={styles.imgCalories}
                    />
                    <Text style={styles.txtCalories}>{calorie} Calories</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleFavorite({...route.params})}>
                    <CustomIcon
                      type="AntDesign"
                      name={isHeart ? 'heart' : 'hearto'}
                      color={constantColors.red}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={openModal}>
                  <FastImage
                    style={styles.product}
                    source={{
                      uri: image,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.name, {color: colors.text}]}>{name}</Text>
              <Text style={[styles.description, {color: colors.text}]}>
                {description}
              </Text>
              <Filter />
              {dataSize.length > 0 && <Size />}
              <View
                style={[
                  styles.row,
                  styles.underline,
                  {borderColor: colors.border},
                ]}>
                <View style={styles.wAvatar}>
                  <Image source={images.burger} style={styles.avatar} />
                  <View style={styles.wInfo}>
                    <Text style={[styles.size, {color: colors.text}]}>
                      By Hs
                    </Text>
                    <Text style={[styles.distance, {color: colors.text}]}>
                      1.2 KM away from you
                    </Text>
                  </View>
                </View>
                <Rating
                  imageSize={20}
                  type="custom"
                  readonly
                  tintColor={colors.background}
                  ratingBackgroundColor={constantColors.light}
                />
              </View>
              <View style={[styles.row, {marginBottom: 15}]}>
                <View style={styles.wQuality}>
                  <TouchableOpacity onPress={handleDecreased}>
                    <CustomIcon
                      type="AntDesign"
                      name="minus"
                      size={24}
                      color={constantColors.background}
                    />
                  </TouchableOpacity>
                  <Text style={styles.txtQuality}>{quantity}</Text>
                  <TouchableOpacity onPress={handleIncrease}>
                    <CustomIcon
                      type="AntDesign"
                      name="plus"
                      size={24}
                      color={constantColors.background}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.wBuy}
                  onPress={() =>
                    handleBuy({
                      ...route.params,
                      quantity,
                      priceCart: dataSize.length === 0 ? price : range[size],
                      sizeCart: dataSize.length === 0 ? null : dataSize[size],
                      position: size,
                    })
                  }>
                  <Text style={styles.txtBuy}>Add to cart</Text>
                  {dataSize.length === 0 ? (
                    <Text style={styles.txtTotal}>$ {price * quantity}</Text>
                  ) : (
                    <Text style={styles.txtTotal}>
                      $ {range[size] * quantity}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      <ModalImage />
    </>
  );
};

export default Detail;
