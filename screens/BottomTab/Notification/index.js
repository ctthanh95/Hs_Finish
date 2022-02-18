import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../../constants';
import styles from './styles';
import {CustomLoading} from '../../../components';
//
import {useNavigation, useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Notification() {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('notification')
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
  const navigateScreen = (screen, item) => {
    navigation.navigate(screen, item);
  };
  const handleClick = item => {
    navigateScreen('DetailNotification', item);
  };
  const Item = ({item}) => {
    let date = moment(item.time, 'DD/MM/YYYY HH:mm:ss').format();
    return (
      <TouchableOpacity style={styles.wItem} onPress={() => handleClick(item)}>
        <Image source={images.discount} style={styles.image} />
        <View style={styles.wTxt}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.content}>{item.content}</Text>
          <Text style={styles.time}>{moment(date).fromNow()}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.wrap}>
            <Text style={[styles.title, {color: colors.text}]}>
              NOTIFICATION
            </Text>
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
}
