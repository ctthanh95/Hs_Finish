import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, dimensions, fonts, images} from '../../../../constants';

const Item = ({item, big}) => {
  const navigation = useNavigation();
  const navigateScreen = (screen, item) => {
    navigation.navigate(screen, item);
  };
  return (
    <TouchableOpacity
      onPress={() => navigateScreen('Detail', item)}
      style={[
        styles.container,
        {
          marginHorizontal: big ? 5 : 0,
          height: big ? 175 : 125,
          marginBottom: big ? 0 : 15,
          width: big ? dimensions.width - 40 : '100%',
        },
      ]}>
      <FastImage
        style={{width: big ? 125 : 100, height: big ? 125 : 100}}
        source={{
          uri: item.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={[styles.wText, {height: big ? 125 : 100}]}>
        <View style={{flex: 1}}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>
        </View>
        <View style={styles.wMoney}>
          <Text style={styles.money}>$ {item.price}</Text>
        </View>
      </View>
      <View style={styles.wCalories}>
        <Image source={images.calories} style={styles.imgCalories} />
        <Text style={styles.txtCalories}>{item.calorie} Calories</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  wText: {flex: 1, marginLeft: 10},
  name: {
    fontSize: 14,
    fontFamily: fonts.bold,
    marginBottom: 5,
    color: colors.black,
  },
  description: {
    fontSize: 12,
    fontFamily: fonts.light,
    color: colors.black,
  },
  wMoney: {
    flex: 1,
    justifyContent: 'center',
  },
  money: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  wCalories: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imgCalories: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
  txtCalories: {
    fontSize: 12,
    fontFamily: fonts.light,
  },
});
