import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader, CustomLoading} from '../../components';
import {images} from '../../constants';
import styles from './styles';
//
import {useNavigation, useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Coupon = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('coupon')
      .orderBy('id')
      .onSnapshot(documentSnapshot => {
        let arr = [];
        documentSnapshot.forEach(e => arr.push(e.data()));
        setData(arr);
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  const handleClick = () => {
    navigateScreen('Home');
  };
  const Item = ({item}) => {
    return (
      <View style={styles.wItem}>
        <Image source={images.discount} style={styles.imgItem} />
        <View style={styles.text}>
          <Text style={styles.name}>{item.number}% Off</Text>
          <Text style={styles.date}>Valid until {item.date}</Text>
          <Text style={styles.quality}>x{item.quality}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.txtButton}>Use now</Text>
        </TouchableOpacity>
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
            <CustomHeader onPress={navigateGoBack} title="COUPON" />
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item}) => <Item item={item} />}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Coupon;
