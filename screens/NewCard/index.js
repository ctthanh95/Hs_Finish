import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import styles from './styles';
import {
  CustomButton,
  CustomHeader,
  CustomIcon,
  CustomInput,
  CustomLoading,
} from '../../components';
import {colors as constantColors, images} from '../../constants';
//
import {useNavigation, useTheme, useRoute} from '@react-navigation/native';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';
//
const numberRegExp =
  /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
const dateRegExp = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
const validationSchema = Yup.object().shape({
  number: Yup.string()
    .required('Required')
    .length(16, 'Must be 16 characters number'),
  name: Yup.string().required('Required'),
  date: Yup.string()
    .required('Required')
    .matches(dateRegExp, 'MM/YY')
    .length(5, 'MM/YY'),
  ccv: Yup.string().required('Required').length(3, '3 characters'),
});

const NewCard = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const route = useRoute();
  const {type, icon, name, id} = route.params;
  const [nameCard, setNameCard] = useState('Your name');
  const [numberCard, setNumberCard] = useState('5555 5555 5555 5555');
  const [dateCard, setDateCard] = useState('10/25');
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [yourCard, setYourCard] = useState([]);
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const handleAdd = value => {
    setIsLoading(true);
    let data = auth().currentUser.providerData[0];
    if (check) {
      let arr = yourCard.map(e => {
        return {...e, cardDefault: false};
      });
      arr.push(value);
      firestore()
        .collection('user')
        .doc(data.uid)
        .update({
          card: arr,
        })
        .then(() => {
          setIsLoading(false);
          navigateGoBack();
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      firestore()
        .collection('user')
        .doc(data.uid)
        .update({
          card: firestore.FieldValue.arrayUnion(value),
        })
        .then(() => {
          setIsLoading(false);
          navigateGoBack();
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };
  useEffect(() => {
    setIsLoading(true);
    let uid = auth().currentUser?.providerData[0]?.uid;
    const subscriber = firestore()
      .collection('user')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        setYourCard(documentSnapshot.data().card);
        setIsLoading(false);
      });
    return () => {
      subscriber();
    };
  }, []);
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
              <CustomHeader title="ADD NEW CARD" onPress={navigateGoBack} />
              <View style={styles.wCard}>
                <Image source={images.card} style={styles.image} />
                <Text style={styles.date}>{dateCard}</Text>
                <View style={styles.wInfo}>
                  <Text style={styles.name}>{nameCard}</Text>
                  <Text style={styles.number}>{numberCard}</Text>
                </View>
                <View style={styles.wLogo}>
                  <CustomIcon
                    type={type}
                    name={icon}
                    size={40}
                    color={constantColors.white}
                  />
                </View>
              </View>
              <Formik
                initialValues={{
                  number: '',
                  name: '',
                  date: '',
                  ccv: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  const {number, name: userName, date, ccv} = values;
                  setDateCard(date);
                  setNameCard(name);
                  let rs =
                    number.slice(0, 4) +
                    ' ' +
                    number.slice(4, 8) +
                    ' ' +
                    number.slice(8, 12) +
                    ' ' +
                    number.slice(12);
                  setNumberCard(rs);
                  handleAdd({
                    name,
                    number,
                    date,
                    ccv,
                    type,
                    icon,
                    cardDefault: check,
                    id,
                    idCard: uuid.v4(),
                    userName: userName,
                  });
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
                      name="Card Number"
                      right={
                        <CustomIcon
                          type="Ionicons"
                          name={
                            (touched.number && errors.number) ||
                            values.number === ''
                              ? 'close-circle-outline'
                              : 'checkmark-circle-outline'
                          }
                          size={24}
                          color={
                            (touched.number && errors.number) ||
                            values.number === ''
                              ? constantColors.red
                              : constantColors.grey
                          }
                        />
                      }
                      error={touched.number && errors.number}
                      onChangeText={handleChange('number')}
                      onBlur={handleBlur('number')}
                      value={values.number}
                      keyboardType="number-pad"
                    />
                    <CustomInput
                      name="Cardholder Name"
                      error={touched.name && errors.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
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
                    />
                    <View style={styles.row}>
                      <View style={styles.space}>
                        <CustomInput
                          keyboardType="phone-pad"
                          name="Expiry Date"
                          error={touched.date && errors.date}
                          onChangeText={handleChange('date')}
                          onBlur={handleBlur('date')}
                          value={values.date}
                          right={
                            <CustomIcon
                              type="Ionicons"
                              name={
                                (touched.date && errors.date) ||
                                values.date === ''
                                  ? 'close-circle-outline'
                                  : 'checkmark-circle-outline'
                              }
                              size={24}
                              color={
                                (touched.date && errors.date) ||
                                values.date === ''
                                  ? constantColors.red
                                  : constantColors.grey
                              }
                            />
                          }
                        />
                      </View>
                      <View style={styles.space}>
                        <CustomInput
                          name="CCV"
                          keyboardType="number-pad"
                          error={touched.ccv && errors.ccv}
                          onChangeText={handleChange('ccv')}
                          onBlur={handleBlur('ccv')}
                          value={values.ccv}
                          right={
                            <CustomIcon
                              type="Ionicons"
                              name={
                                (touched.ccv && errors.ccv) || values.ccv === ''
                                  ? 'close-circle-outline'
                                  : 'checkmark-circle-outline'
                              }
                              size={24}
                              color={
                                (touched.ccv && errors.ccv) || values.ccv === ''
                                  ? constantColors.red
                                  : constantColors.grey
                              }
                            />
                          }
                        />
                      </View>
                    </View>
                    <View style={styles.wRemember}>
                      <CircleCheckBox
                        checked={check}
                        onToggle={() => setCheck(!check)}
                        labelPosition={LABEL_POSITION.RIGHT}
                        outerSize={20}
                        filterSize={17}
                        innerSize={12}
                        outerColor={constantColors.background}
                        innerColor={constantColors.background}
                      />
                      <Text style={[styles.remember, {color: colors.text}]}>
                        Remember this card details.
                      </Text>
                    </View>
                    <CustomButton
                      onPress={handleSubmit}
                      title="Add Card"
                      backgroundColor={constantColors.background}
                      color={constantColors.white}
                    />
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default NewCard;
