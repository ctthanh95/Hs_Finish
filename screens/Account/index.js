import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomButton,
  CustomHeader,
  CustomLoading,
  CustomAlert,
} from '../../components';
import {colors as constantColors, fonts} from '../../constants';
import styles from './styles';
//
import {useNavigation, useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password1: Yup.string().required('Required').min(6, 'Least 6 characters'),
  password2: Yup.string()
    .required('Required')
    .min(6, 'Least 6 characters')
    .oneOf([Yup.ref('password1'), null], 'Passwords must match'),
});

const Account = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [info, setInfo] = useState({});
  const [modal, setModal] = useState(false);
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };
  const handleChangePassword = password => {
    closeModal();
    auth()
      .currentUser.updatePassword(password)
      .then(() => {
        setIsSuccess(true);
        setIsShowAlert(true);
      })
      .catch(error => {
        if (error.code === 'auth/requires-recent-login') {
          setIsSuccess(false);
          setIsShowAlert(true);
        }
      });
  };
  useEffect(() => {
    setIsLoading(true);
    let uid = auth().currentUser?.providerData[0]?.uid;
    const subscriber = firestore()
      .collection('user')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        setInfo(documentSnapshot.data());
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);
  const Item = ({title, value, isNot}) => {
    return (
      <View
        style={[
          styles.wItem,
          {
            borderBottomWidth: isNot ? 0 : 0.2,
          },
        ]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };
  const Input = ({name, error, ...props}) => {
    return (
      <View>
        <View style={styles.containerInput}>
          <Text style={styles.name}>{name}</Text>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
        <View
          style={[
            styles.wInput,
            {
              borderWidth: error ? 1 : 0,
              borderColor: constantColors.red,
            },
          ]}>
          <TextInput style={styles.input} {...props} />
        </View>
      </View>
    );
  };
  const ModalPassword = () => {
    return (
      <Modal
        visible={modal}
        transparent
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.wModal}>
          <View style={styles.modal}>
            <Text style={styles.select}>Change Password</Text>
            <Formik
              initialValues={{
                password1: '',
                password2: '',
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                handleChangePassword(values.password1);
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
                  <Input
                    name="New Password"
                    error={touched.password1 && errors.password1}
                    onChangeText={handleChange('password1')}
                    onBlur={handleBlur('password1')}
                    value={values.password1}
                  />
                  <Input
                    name="Confirm Password"
                    error={touched.password2 && errors.password2}
                    onChangeText={handleChange('password2')}
                    onBlur={handleBlur('password2')}
                    value={values.password2}
                  />
                  <View style={styles.wButton}>
                    <View style={styles.container}>
                      <CustomButton
                        onPress={closeModal}
                        title="Cancel"
                        backgroundColor={constantColors.light}
                        color={constantColors.red}
                      />
                    </View>
                    <View style={[styles.container, styles.left]}>
                      <CustomButton
                        onPress={handleSubmit}
                        title="Update"
                        backgroundColor={constantColors.background}
                        color={constantColors.white}
                      />
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.wrap}>
            <CustomHeader
              onPress={navigateGoBack}
              title="ACCOUNT"
              right={
                <TouchableOpacity onPress={() => navigateScreen('EditAccount')}>
                  <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
              }
            />
            <ScrollView
              style={styles.container}
              showsVerticalScrollIndicator={false}>
              <View style={styles.background}>
                <Item title="Full name" value={info?.displayName} />
                <Item title="Phone number" value={info?.phoneNumber} />
                <Item title="User ID" value={info?.uid} isNot />
              </View>
              <View style={[styles.background, styles.margin]}>
                <Item title="Date of Birth" value={info?.date} />
                <Item title="Gender" value={info?.gender} />
                <Item
                  title="Joined"
                  value={moment(
                    auth().currentUser?.metadata?.creationTime,
                  ).format('MM/DD/YYYY')}
                />
                <Item title="Email" value={info?.email} />
                <Item title="Address" value={info?.addressSetting} isNot />
              </View>
              {info?.providerId === 'password' && (
                <CustomButton
                  onPress={openModal}
                  color={constantColors.white}
                  title="Change Password"
                  backgroundColor={constantColors.background}
                  styleTouch={styles.margin}
                />
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
      <ModalPassword />
      <CustomAlert
        modal={isShowAlert}
        setModal={setIsShowAlert}
        isSuccess={isSuccess}
        description={isSuccess ? 'Success' : 'Please login again'}
      />
    </>
  );
};

export default Account;
