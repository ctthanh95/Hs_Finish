import React from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, CustomLogo} from '../../components';
import {colors as constantColors} from '../../constants';
import styles from './styles';
//
import {useNavigation} from '@react-navigation/core';
import {useTheme, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
//
const Otp = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params.email;
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  const sendCodeToEmail = () => {
    auth()
      .currentUser.sendEmailVerification()
      .then(() => {});
  };
  const OtpInput = () => {
    return (
      <View style={[styles.wInput, {borderColor: colors.border}]}>
        <TextInput style={[styles.input, {color: colors.text}]} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomLogo
        size={150}
        title="OTP Auth"
        description={'An Auth code has been sent to ' + email}
      />

      <View style={styles.wrap}>
        <View>
          <View style={styles.rowInput}>
            <OtpInput />
            <OtpInput />
            <OtpInput />
            <OtpInput />
          </View>
          <TouchableOpacity onPress={sendCodeToEmail}>
            <Text style={styles.txtWReceive}>
              <Text style={{color: colors.text}}>Didn't receive code? {}</Text>
              <Text style={styles.txtReceive}>Resend (59s)</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <CustomButton
            onPress={() => navigateScreen('BottomTab')}
            title="Continue"
            backgroundColor={constantColors.background}
            color={constantColors.white}
          />
          <TouchableOpacity>
            <Text style={[styles.txtSign, {marginTop: 10, color: colors.text}]}>
              By signing up, you argree to our.
            </Text>
            <Text
              style={[
                styles.txtSign,
                {marginVertical: 5, color: constantColors.red},
              ]}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
