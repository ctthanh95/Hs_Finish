import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
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
import {useTheme, useNavigation} from '@react-navigation/native';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .matches(emailRegExp, 'Must be a valid email'),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required').min(6, 'Least 6 characters'),
});
//
const SignUp = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {colors} = useTheme();
  const navigation = useNavigation();
  //
  const navigateScreen = (screen, data) => {
    navigation.navigate(screen, data);
  };
  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const addUser = username => {
    let data = auth().currentUser.providerData[0];
    firestore()
      .collection('user')
      .doc(data.uid)
      .set({
        ...data,
        displayName: username,
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/hs-project-335212.appspot.com/o/Users%2Fno_avatar.jpeg?alt=media&token=01810ca4-d274-4c7b-8e01-61f059060b29',
        address: [],
        card: [],
        date: '',
        gender: '',
        addressSetting: '',
      })
      .then()
      .catch(error => console.log('SDSFDFDAS', error));
    firestore()
      .collection('favorite')
      .doc(data.uid)
      .set({
        productFavorite: [],
      })
      .then()
      .catch(error => console.log('SDSFDFDAS', error));
  };
  const createWithEmail = (email, password, username) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        addUser(username);
      })
      .catch(error => {
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
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.wrap}>
              <CustomLogo
                size={150}
                title="Greeting Started"
                description="Create an account to continue!"
              />
              <Formik
                initialValues={{
                  email: '',
                  username: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  // LoginWithEmail(values.email, values.password);
                  createWithEmail(
                    values.email,
                    values.password,
                    values.username,
                  );
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
                    <CustomInput
                      name="Username"
                      error={touched.username && errors.username}
                      right={
                        <CustomIcon
                          type="Ionicons"
                          name={
                            (touched.username && errors.username) ||
                            values.username === ''
                              ? 'close-circle-outline'
                              : 'checkmark-circle-outline'
                          }
                          size={24}
                          color={
                            (touched.username && errors.username) ||
                            values.username === ''
                              ? constantColors.red
                              : constantColors.grey
                          }
                        />
                      }
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
                    <CustomInput
                      name="Password"
                      error={touched.password && errors.password}
                      secureTextEntry={isShowPassword}
                      right={
                        <TouchableOpacity onPress={showPassword}>
                          <CustomIcon
                            type="Ionicons"
                            name={
                              isShowPassword ? 'eye-off-outline' : 'eye-outline'
                            }
                            size={24}
                            color={constantColors.grey}
                          />
                        </TouchableOpacity>
                      }
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <View style={{marginBottom: 30}} />
                    <CustomButton
                      onPress={handleSubmit}
                      color={constantColors.white}
                      title="Sign Up"
                      backgroundColor={constantColors.background}
                    />
                  </>
                )}
              </Formik>
              <TouchableOpacity onPress={() => navigateScreen('SignIn')}>
                <Text style={styles.wTxt}>
                  <Text style={[styles.txtDont, {color: colors.text}]}>
                    Already have an account? {}
                  </Text>
                  <Text style={styles.txtSign}>Sign In</Text>
                </Text>
              </TouchableOpacity>
              {/* <CustomButton
                color={constantColors.white}
                title="Continue With Facebook"
                backgroundColor={constantColors.blue}
                left={
                  <CustomIcon
                    type="AntDesign"
                    name="facebook-square"
                    size={24}
                    color={constantColors.white}
                  />
                }
              />
              <CustomButton
                color={constantColors.white}
                title="Continue With Google"
                backgroundColor={constantColors.grey}
                left={
                  <CustomIcon
                    type="AntDesign"
                    name="google"
                    size={24}
                    color={constantColors.white}
                  />
                }
              /> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      <CustomAlert
        modal={isShowAlert}
        setModal={setIsShowAlert}
        description="Email is already in use!"
      />
    </>
  );
};

export default SignUp;
