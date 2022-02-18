import React, {useState, useEffect, useCallback} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {fonts, colors as constantColors} from '../../../../constants';
import {CustomButton, CustomIcon, CustomLoading} from '../../../../components';
import Slider from './Slider';
import Delivery from './Delivery';
import Star from './Star';
import Tag from './Tag';

const Filter = ({modalFilter, setModalFilter, setFilter}) => {
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [delivery, setDelivery] = useState();
  const [tag, setTag] = useState();
  const [star, setStar] = useState(0);
  const [distance, setDistance] = useState([1, 10]);
  const [price, setPrice] = useState([1, 50]);
  //Data firebase
  const [dataTag, setDataTag] = useState([]);
  const closeModal = () => {
    setModalFilter(false);
  };
  const changeDistance = useCallback(value => {
    setDistance(value);
  }, []);
  const changePrice = useCallback(value => {
    setPrice(value);
  }, []);
  const handleFilter = () => {
    setFilter({
      distance,
      delivery,
      price,
      star,
      tag,
    });
    closeModal();
  };
  const handleReset = () => {
    setFilter({});
    closeModal();
  };
  //Tag
  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('tag')
      .orderBy('id')
      .onSnapshot(documentSnapshot => {
        let arr = [];
        documentSnapshot.forEach(e => arr.push(e.data()));
        setDataTag(arr);
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);
  return (
    <Modal
      transparent
      visible={modalFilter}
      animationType="slide"
      onRequestClose={closeModal}>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: `${colors.text}50`,
          },
        ]}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.transparent} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.wFilter,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
              <Text style={[styles.txtFilter, {color: colors.text}]}>
                Filter Your Search
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <CustomIcon
                  type="AntDesign"
                  name="closesquare"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.title, {color: colors.text}]}>Distance</Text>
            <Slider
              values={distance}
              min={1}
              max={20}
              step={1}
              description="km"
              onValuesChange={changeDistance}
            />
            <Text style={[styles.title, {color: colors.text}]}>
              Delivery Time
            </Text>
            <Delivery delivery={delivery} setDelivery={setDelivery} />
            <Text style={[styles.title, {color: colors.text}]}>
              Pricing Range
            </Text>
            <Slider
              values={price}
              min={1}
              max={100}
              step={1}
              description="$"
              onValuesChange={changePrice}
            />
            <Text style={[styles.title, {color: colors.text}]}>Ratings</Text>
            <Star star={star} setStar={setStar} />
            <Text style={[styles.title, {color: colors.text}]}>Tags</Text>
            {isLoading ? (
              <CustomLoading />
            ) : (
              <Tag tag={tag} setTag={setTag} data={dataTag} />
            )}
            <CustomButton
              onPress={handleFilter}
              backgroundColor={constantColors.background}
              color={constantColors.white}
              title="Apply Filters"
            />
            <CustomButton
              onPress={handleReset}
              backgroundColor="#D8BFD8"
              color={constantColors.white}
              title="Clear Filters"
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transparent: {
    height: '20%',
  },
  wFilter: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtFilter: {
    fontFamily: fonts.bold,
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.bold,
    marginTop: 15,
  },
});
