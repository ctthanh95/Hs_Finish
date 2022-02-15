import React, {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomButton,
  CustomIcon,
  CustomInput,
  CustomLogo,
  CustomAlert,
  CustomLoading,
} from '../../components';
import {colors as constantColors} from '../../constants';
import styles from './styles';
//
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
//Yup
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .matches(emailRegExp, 'Must be a valid email'),
});
const Recovery = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  const sendPasswordResetEmail = email => {
    setIsLoading(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsSuccess(true);
        setIsLoading(false);
        setIsShowAlert(true);
      })
      .catch(() => {
        setIsSuccess(false);
        setIsLoading(false);
        setIsShowAlert(true);
      });
  };
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <SafeAreaView style={styles.container}>
          <CustomLogo
            size={150}
            title="Password Recovery"
            description="Please enter your email address to recover your password"
          />
          <View style={styles.wrap}>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                sendPasswordResetEmail(values.email);
              }}>
              {({
                errors,
                touched,
                values,
                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                <>
                  <CustomInput
                    name="Email"
                    error={touched.email && errors.email}
                    right={
                      <CustomIcon
                        type="Ionicons"
                        name={
                          (touched.email && errors.email) ||
                          values.email === '' ||
                          !values.email.match(emailRegExp)
                            ? 'close-circle-outline'
                            : 'checkmark-circle-outline'
                        }
                        size={24}
                        color={
                          (touched.email && errors.email) ||
                          values.email === '' ||
                          !values.email.match(emailRegExp)
                            ? constantColors.red
                            : constantColors.grey
                        }
                      />
                    }
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <CustomButton
                    onPress={handleSubmit}
                    color={constantColors.white}
                    title="Send Email"
                    backgroundColor={constantColors.background}
                  />
                </>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      )}
      <CustomAlert
        onPress={isSuccess ? () => navigateScreen('SignIn') : null}
        isSuccess={isSuccess}
        modal={isShowAlert}
        setModal={setIsShowAlert}
        description={
          isSuccess ? 'Please check your email and login again' : 'Wrong email!'
        }
      />
    </>
  );
};

export default Recovery;
