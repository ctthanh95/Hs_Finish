import React from 'react';
import {View, Text} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {CustomButton} from '../../components';
import {lotties, colors as constantColors} from '../../constants';
import styles from './styles';

const Success = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.gif}>
          <LottieView source={lotties.cook} loop autoPlay />
        </View>
        <Text style={[styles.congratulation, {color: colors.text}]}>
          Congratulations!
        </Text>
        <Text style={[styles.success, {color: colors.text}]}>
          Payment was successfully made!
        </Text>
        <View style={styles.button}>
          <CustomButton
            onPress={() => navigateScreen('Delivery')}
            title="Done"
            backgroundColor={constantColors.background}
            color={constantColors.white}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Success;
