import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Button,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  CustomButton,
  CustomIcon,
  CustomInput,
  CustomLogo,
  CustomHeader,
  CustomLoading,
} from '../../components';
import {colors as constantColors, fonts} from '../../constants';
import styles from './styles';
//
import {useNavigation, useTheme} from '@react-navigation/native';
import {Formik, Form, Field, useField, useFormikContext} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//Yup
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const dateRegExp = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  phone: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Must be a valid phone number'),
  date: Yup.string().required('Required').matches(dateRegExp, 'MM/DD/YYYY'),
  gender: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});
//
const EditAccount = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const handleClick = (name, phone, date, gender, address) => {
    let uid = auth().currentUser?.providerData[0]?.uid;
    firestore()
      .collection('user')
      .doc(uid)
      .update({
        displayName: name,
        phoneNumber: phone,
        date: date,
        gender: gender,
        addressSetting: address,
      })
      .then(() => {
        navigateGoBack();
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrap} nestedScrollEnabled={true}>
        <CustomHeader onPress={navigateGoBack} title="ACCOUNT" />
        <Formik
          initialValues={{
            name: '',
            phone: '',
            date: '',
            gender: '',
            address: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values =>
            handleClick(
              values.name,
              values.phone,
              values.date,
              values.gender,
              values.address,
            )
          }>
          {({
            errors,
            touched,
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <>
              <CustomInput
                name="Full name"
                error={touched.name && errors.name}
                right={
                  <CustomIcon
                    type="Ionicons"
                    name={
                      (touched.name && errors.name) || values.name === ''
                        ? 'close-circle-outline'
                        : 'checkmark-circle-outline'
                    }
                    size={24}
                    color={
                      (touched.name && errors.name) || values.name === ''
                        ? constantColors.red
                        : constantColors.grey
                    }
                  />
                }
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <CustomInput
                name="Phone number"
                error={touched.phone && errors.phone}
                right={
                  <CustomIcon
                    type="Ionicons"
                    name={
                      (touched.phone && errors.phone) || values.phone === ''
                        ? 'close-circle-outline'
                        : 'checkmark-circle-outline'
                    }
                    size={24}
                    color={
                      (touched.phone && errors.phone) || values.phone === ''
                        ? constantColors.red
                        : constantColors.grey
                    }
                  />
                }
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onCancel={hideDatePicker}
                onConfirm={date => {
                  setFieldValue('date', moment(date).format('MM/DD/YYYY'));
                  hideDatePicker();
                }}
              />
              <CustomInput
                name="Date of Birth"
                error={touched.date && errors.date}
                right={
                  <TouchableOpacity onPress={showDatePicker}>
                    <CustomIcon
                      type="AntDesign"
                      name="calendar"
                      size={24}
                      color={
                        (touched.date && errors.date) || values.date === ''
                          ? constantColors.red
                          : constantColors.grey
                      }
                    />
                  </TouchableOpacity>
                }
                onChangeText={handleChange('date')}
                onBlur={handleBlur('date')}
                value={values.date}
                placeholder="MM/DD/YYYY"
                placeholderTextColor={constantColors.grey}
              />
              <View style={styles.wGender}>
                <Text
                  style={[
                    styles.gender,
                    {
                      color: colors.text,
                    },
                  ]}>
                  Gender
                </Text>
                {touched.gender && errors.gender && (
                  <Text style={styles.error}>
                    {touched.gender && errors.gender}
                  </Text>
                )}
              </View>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                listMode="SCROLLVIEW"
                style={[
                  styles.wDrop,
                  {
                    borderWidth: touched.gender && errors.gender ? 1 : 0,
                  },
                ]}
                placeholder="Select gender"
                placeholderStyle={styles.placeholderStyle}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                arrowIconStyle={styles.arrowIconStyle}
                ArrowUpIconComponent={() => (
                  <CustomIcon type="AntDesign" name="up" size={24} />
                )}
                ArrowDownIconComponent={() => (
                  <CustomIcon
                    type="AntDesign"
                    name="down"
                    size={24}
                    color={
                      (touched.gender && errors.gender) || values.gender === ''
                        ? constantColors.red
                        : constantColors.grey
                    }
                  />
                )}
                onChangeValue={value => {
                  setFieldValue('gender', value);
                }}
              />
              <CustomInput
                name="Address"
                error={touched.address && errors.address}
                right={
                  <CustomIcon
                    type="Ionicons"
                    name={
                      (touched.address && errors.address) ||
                      values.address === ''
                        ? 'close-circle-outline'
                        : 'checkmark-circle-outline'
                    }
                    size={24}
                    color={
                      (touched.address && errors.address) ||
                      values.address === ''
                        ? constantColors.red
                        : constantColors.grey
                    }
                  />
                }
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              <CustomButton
                onPress={handleSubmit}
                color={constantColors.white}
                title="Save"
                backgroundColor={constantColors.background}
                styleTouch={{marginTop: 50}}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditAccount;
