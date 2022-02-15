import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {
  CustomButton,
  CustomHeader,
  CustomCard,
  CustomLoading,
  CustomYourCard,
} from '../../components';
import {Empty} from '../BottomTab/Home/components';
import {colors as constantColors} from '../../constants';
//
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useTheme} from '@react-navigation/native';
import {isEmpty} from 'lodash';

const Card = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [yourCard, setYourCard] = useState([]);
  const [card, setCard] = useState([]);
  const [check, setCheck] = useState({});
  //Function
  const navigateScreen = (screen, item) => {
    navigation.navigate(screen, item);
  };
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const handleCheckbox = name => {
    setCheck(name);
  };
  const handleDetail = item => {
    navigateScreen('DetailCard', item);
  };
  const handleAdd = () => {
    if (!isEmpty(check)) {
      setCheck({});
      navigateScreen('NewCard', check);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    let uid = auth().currentUser?.providerData[0]?.uid;
    const subscriber1 = firestore()
      .collection('user')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        let arr = documentSnapshot
          .data()
          .card.sort((a, b) => b.cardDefault - a.cardDefault);
        setYourCard(arr);
      });
    const subscriber2 = firestore()
      .collection('card')
      .onSnapshot(documentSnapshot => {
        let arr = [];
        documentSnapshot.forEach(e => arr.push(e.data()));
        setCard(arr);
        setIsLoading(false);
      });
    return () => {
      subscriber1();
      subscriber2();
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.wrap}>
            <CustomHeader title="MY CARDS" onPress={navigateGoBack} />
            <View style={styles.container}>
              <View style={styles.card}>
                <Text style={[styles.txtAdd, {color: colors.text}]}>
                  Your card
                </Text>
                <FlatList
                  data={yourCard}
                  ListEmptyComponent={Empty}
                  keyExtractor={item => item.idCard}
                  renderItem={({item}) => (
                    <CustomYourCard
                      item={item}
                      check={check}
                      setCheck={setCheck}
                      handleDetail={handleDetail}
                    />
                  )}
                />
              </View>
              <View style={styles.add}>
                <Text style={[styles.txtAdd, {color: colors.text}]}>
                  Add new card
                </Text>
                <FlatList
                  data={card}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <CustomCard
                      item={item}
                      handleCheckbox={handleCheckbox}
                      check={check}
                      setCheck={setCheck}
                    />
                  )}
                />
                <CustomButton
                  title="Add"
                  backgroundColor={constantColors.background}
                  color={constantColors.white}
                  onPress={handleAdd}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Card;
