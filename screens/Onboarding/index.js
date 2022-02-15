import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {setValue} from '../../helpers/mmkv';
import {CustomButton, CustomIcon, CustomLogo} from '../../components';
import {colors, dimensions, fonts, images} from '../../constants';
import {onboarding} from '../../data';
import styles from './styles';

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / dimensions.width);
    setCurrentSlideIndex(currentIndex);
  };
  const skipSlide = () => {
    const lastSlideIndex = onboarding.length - 1;
    const offset = lastSlideIndex * dimensions.width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };
  const clickSlide = () => {
    if (currentSlideIndex == onboarding.length - 1) {
      setValue('Onboarding', true);
      navigation.navigate('SignIn');
    } else {
      const nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex != onboarding.length) {
        const offset = nextSlideIndex * dimensions.width;
        ref?.current.scrollToOffset({offset});
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.wSkip} onPress={skipSlide}>
          <Text style={styles.txtSkip}>SKIP</Text>
          <CustomIcon
            type="Feather"
            name="chevrons-right"
            color={colors.white}
            size={24}
          />
        </TouchableOpacity>
        <CustomLogo size={100} />
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={onboarding}
          pagingEnabled
          renderItem={({item}) => (
            <View style={styles.wItem} key={item.id}>
              <Image source={item.img} style={styles.imgItem} />
              <Text
                style={[
                  styles.txtItem,
                  {marginTop: 20, fontFamily: fonts.bold, fontSize: 24},
                ]}>
                {item.title}
              </Text>
              <Text style={[styles.txtItem, {marginTop: 20, marginBottom: 75}]}>
                {item.description}
              </Text>
              <CustomButton
                onPress={clickSlide}
                backgroundColor={colors.white}
                color={colors.red}
                title={
                  currentSlideIndex == onboarding.length - 1
                    ? 'Get started!'
                    : 'Next'
                }
                borderRadius={30}
              />
            </View>
          )}
        />
        <View style={styles.wDot}>
          {onboarding.map((item, index) => {
            return (
              <Animated.View
                key={item.id}
                opacity={currentSlideIndex === index ? 1 : 0.5}
                style={[
                  styles.dotItem,
                  {
                    marginRight: index !== 2 ? 10 : 0,
                    width: currentSlideIndex === index ? 30 : 10,
                  },
                ]}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;
