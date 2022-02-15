import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  colors,
  colors as constantColors,
  dimensions,
  fonts,
  images,
} from '../../../../constants';
import Empty from './Empty';
import {CustomIcon} from '../../../../components';
const Popular = ({data, popularRef}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const navigateScreen = (screen, item) => {
    navigation.navigate(screen, item);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.recommend, {color: colors.text}]}>
          Popular Near You
        </Text>
        <TouchableOpacity>
          <Text style={styles.show}>Show all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={popularRef}
        contentContainerStyle={styles.flat}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        ListEmptyComponent={Empty}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigateScreen('Detail', item)}
              style={[
                styles.wItem,
                {
                  marginRight: index === data.length - 1 ? 0 : 15,
                  width: (dimensions.width - 45) / 2,
                },
              ]}>
              <View style={styles.row}>
                <View style={styles.wCalories}>
                  <Image source={images.calories} style={styles.imgCalories} />
                  <Text style={styles.txtCalories}>
                    {item.calorie} Calories
                  </Text>
                </View>
              </View>
              <FastImage
                style={styles.image}
                source={{
                  uri: item.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.name}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.description}>
                {item.description}
              </Text>
              <Text style={styles.money}>$ {item.price}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  recommend: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  show: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: constantColors.red,
  },
  wItem: {
    backgroundColor: constantColors.light,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  wCalories: {
    flexDirection: 'row',
    alignItems: 'center',
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
  image: {
    width: 125,
    height: 125,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.bold,
    marginBottom: 5,
    color: colors.black,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    fontFamily: fonts.light,
    color: colors.black,
    marginBottom: 10,
  },
  money: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  flat: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
