import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors as constantColors, images, lotties} from '../../../constants';
import LottieView from 'lottie-react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {CustomIcon, CustomLoading} from '../../../components';
//
import {useNavigation, useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Favorite = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigateScreen = (screen, item) => {
    navigation.navigate(screen, item);
  };
  const handleClick = item => {
    let uid = auth().currentUser?.providerData[0]?.uid;
    firestore()
      .collection('favorite')
      .doc(uid)
      .update({
        productFavorite: firestore.FieldValue.arrayRemove(item),
      })
      .then();
  };
  useEffect(() => {
    setIsLoading(true);
    let uid = auth().currentUser?.providerData[0]?.uid;
    const subscriber = firestore()
      .collection('favorite')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.data()?.productFavorite);
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);
  const Empty = () => {
    return (
      <View style={styles.empty}>
        <LottieView source={lotties.empty} loop autoPlay style={styles.size} />
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
            <Text style={[styles.title, {color: colors.text}]}>FAVORITE</Text>
            {data.length === 0 ? (
              <Empty />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => navigateScreen('Detail', item)}
                    style={[styles.wItem]}>
                    <View style={styles.row}>
                      <View style={styles.wCalories}>
                        <Image
                          source={images.calories}
                          style={styles.imgCalories}
                        />
                        <Text style={styles.txtCalories}>
                          {item.calorie} Calories
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => handleClick(item)}>
                        <CustomIcon
                          type="AntDesign"
                          name="heart"
                          color={constantColors.red}
                          size={15}
                        />
                      </TouchableOpacity>
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
                )}
              />
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Favorite;
