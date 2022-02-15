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
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
//Google
GoogleSignin.configure({
  webClientId:
    '229120433869-hrannabnjj3bqst9svkiqq3qi1p98ec5.apps.googleusercontent.com',
});
//Yup
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .matches(emailRegExp, 'Must be a valid email'),
  password: Yup.string().required('Required').min(6, 'Least 6 characters'),
});
//
const SignIn = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {colors} = useTheme();
  const navigation = useNavigation();
  //
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  //Login
  const loginWithEmail = (email, password) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch(error => {
        setIsLoading(false);
        setIsShowAlert(true);
      });
  };
  async function loginWithFacebook() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    setIsLoading(true);
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  async function loginWithGoogle() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  //Add
  const addUser = async () => {
    let data = auth().currentUser.providerData[0];
    const user = await firestore().collection('user').doc(data.uid).get();
    if (!user.data()) {
      firestore()
        .collection('user')
        .doc(data.uid)
        .set({
          ...data,
          address: [],
          card: [],
          date: '',
          gender: '',
          addressSetting: '',
        })
        .then();
      firestore()
        .collection('favorite')
        .doc(data.uid)
        .set({
          productFavorite: [],
        })
        .then()
        .catch(error => console.log('SDSFDFDAS', error));
    }
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
            <View style={styles.wrap} showsVerticalScrollIndicator={false}>
              <CustomLogo
                size={150}
                title="Let's Sign You In"
                description="Welcome back, you've been missed"
              />
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  loginWithEmail(values.email, values.password);
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
                    <TouchableOpacity
                      onPress={() => navigateScreen('Recovery')}>
                      <Text style={[styles.txtForgot, {color: colors.text}]}>
                        Forgot Password
                      </Text>
                    </TouchableOpacity>
                    <CustomButton
                      onPress={handleSubmit}
                      color={constantColors.white}
                      title="Sign In"
                      backgroundColor={constantColors.background}
                    />
                  </>
                )}
              </Formik>
              <TouchableOpacity onPress={() => navigateScreen('SignUp')}>
                <Text style={styles.wTxt}>
                  <Text style={[styles.txtDont, {color: colors.text}]}>
                    Don't have an account? {}
                  </Text>
                  <Text style={styles.txtSign}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
              <CustomButton
                onPress={() =>
                  loginWithFacebook()
                    .then(addUser)
                    .catch(() => setIsLoading(false))
                }
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
                onPress={() =>
                  loginWithGoogle()
                    .then(addUser)
                    .catch(() => setIsLoading(false))
                }
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
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      <CustomAlert
        modal={isShowAlert}
        setModal={setIsShowAlert}
        description="Wrong email or password!"
      />
    </>
  );
};

export default SignIn;
