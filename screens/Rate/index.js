import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Rating} from 'react-native-ratings';
import {
  CustomAlert,
  CustomButton,
  CustomCard,
  CustomHeader,
  CustomIcon,
  CustomLoading,
  CustomText,
} from '../../components';
import {colors as constantColors, images} from '../../constants';
import styles from './styles';
//
import {useNavigation, useTheme} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const Rate = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [select, setSelect] = useState('No Tips');
  const [modal, setModal] = useState(false);
  const data = [
    {
      id: 1,
      title: 'No Tips',
    },
    {
      id: 2,
      title: '$5',
    },
    {
      id: 3,
      title: '$10',
    },
    {
      id: 4,
      title: '$15',
    },
    {
      id: 5,
      title: '$20',
    },
  ];
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const handleSubmit = () => {
    setModal(true);
  };
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.wrap}>
            <CustomHeader onPress={navigateGoBack} title="RIDER REVIEW" />
            <View style={styles.center}>
              <FastImage
                style={styles.imgPerson}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/hs-project-335212.appspot.com/o/Users%2Fno_avatar.jpeg?alt=media&token=01810ca4-d274-4c7b-8e01-61f059060b29',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                style={[
                  styles.name,
                  {
                    color: colors.text,
                  },
                ]}>
                Williams Adam
              </Text>
              <Text
                style={[
                  styles.delivery,
                  {
                    color: colors.text,
                  },
                ]}>
                Delivery Man
              </Text>
              <Text
                style={[
                  styles.order,
                  {
                    color: colors.text,
                  },
                ]}>
                ● Order Delivery
              </Text>
              <Text
                style={[
                  styles.delivery,
                  {
                    color: colors.text,
                  },
                ]}>
                Please rate Delivery Service
              </Text>
              <Rating
                style={styles.star}
                type="custom"
                tintColor={colors.background}
                ratingBackgroundColor={constantColors.light}
              />
            </View>
            <Text style={styles.tip}>Add Tips</Text>
            <View style={styles.wTip}>
              {data.map(item => (
                <CustomText
                  title={item.title}
                  key={item.id}
                  styleTouch={{
                    backgroundColor:
                      item.title === select
                        ? constantColors.background
                        : constantColors.light,
                    padding: 10,
                  }}
                  styleText={{
                    color:
                      item.title === select
                        ? constantColors.white
                        : constantColors.grey,
                  }}
                  width={item.id === 1 ? null : 50}
                  onPress={() => setSelect(item.title)}
                />
              ))}
            </View>
            <TextInput
              multiline={true}
              style={styles.input}
              numberOfLines={10}
              placeholder="Add a comment"
            />
            <CustomButton
              onPress={handleSubmit}
              backgroundColor={constantColors.background}
              color={constantColors.white}
              title="Submit Review"
            />
          </ScrollView>
        </SafeAreaView>
      )}
      <CustomAlert
        modal={modal}
        setModal={setModal}
        isSuccess
        description="Success"
      />
    </>
  );
};

export default Rate;
