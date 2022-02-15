import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
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
import {useNavigation, useTheme, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Empty} from '../BottomTab/Home/components';
import {useDispatch, useSelector} from 'react-redux';
import {reorderCart} from '../../redux/actions/cartAction';
import FastImage from 'react-native-fast-image';

const DetailOrder = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const route = useRoute();
  const {address, card, cart, date, id, length, money, ship, status, time} =
    route.params;
  const dispatch = useDispatch();
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const navigateScreen = (screen, item) => {
    navigation.navigate(screen, item);
  };
  const handleDetail = item => {
    navigateScreen('Detail', item);
  };
  const Item = ({title, value, isNot}) => {
    return (
      <View
        style={[
          styles.wItem,
          {
            borderBottomWidth: isNot ? 0 : 0.2,
          },
        ]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrap}>
        <CustomHeader onPress={navigateGoBack} title="DETAIL ORDER" />
        <Text style={[styles.description, {color: colors.text}]}>
          Information
        </Text>
        <View style={styles.background}>
          <Item
            title="Status"
            value={
              status === 0
                ? 'Cancelled'
                : status === 0
                ? 'Delivered'
                : 'Upcoming'
            }
          />
          <Item title="Code" value={id.slice(0, 8).toUpperCase()} />
          <Item title="Date" value={date} />
          <Item title="Time" value={time} />
          <Item title="Address" value={address.label} isNot />
        </View>
        <View style={styles.margin}>
          <Text style={[styles.description, {color: colors.text}]}>
            Product
          </Text>
          <View style={styles.background}>
            {cart.map((item, index) => (
              <TouchableOpacity
                key={item.idCart}
                style={[
                  styles.wProduct,
                  {
                    marginBottom: index === cart.length - 1 ? 0 : 10,
                  },
                ]}
                onPress={() => handleDetail(item)}>
                <FastImage
                  style={styles.imgProduct}
                  source={{
                    uri: item.image,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.wTxtProduct}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.another} numberOfLines={1}>
                    {item.description}
                  </Text>
                  <View style={styles.wTxtQuantity}>
                    {item.sizeCart ? (
                      <Text style={styles.another}>Size: {item.sizeCart}</Text>
                    ) : (
                      <Text>{item.sizeCart}</Text>
                    )}
                    <Text style={styles.another}>x{item.quantity}</Text>
                  </View>
                  <Text style={[styles.value, styles.another]}>
                    $ {item.priceCart}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.margin}>
          <Text style={[styles.description, {color: colors.text}]}>Money</Text>
          <View style={styles.background}>
            <Item title="Subtotal" value={`$ ${money}`} />
            <Item title="Shipping fee" value={`$ ${ship}`} />
            <Item title="Total" value={`$ ${money + ship}`} isNot />
          </View>
        </View>
        <View style={styles.margin}>
          <Text style={[styles.description, {color: colors.text}]}>Card</Text>
          <View style={styles.background}>
            <Item title="Type" value={card.name} />
            <Item
              title="Number"
              value={
                card.number.slice(0, 4) +
                ' ' +
                card.number.slice(4, 8) +
                ' ' +
                card.number.slice(8, 12) +
                ' ' +
                card.number.slice(12)
              }
            />
            <Item title="Date" value={card.date} />
            <Item title="CCV" value={card.ccv} />
            <Item title="Username" value={card.userName} isNot />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailOrder;
