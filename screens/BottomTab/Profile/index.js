import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Modal,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors as constantColors} from '../../../constants';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {CustomConfirm, CustomIcon, CustomLoading} from '../../../components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//
import {useNavigation, useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import strings from '../../../helpers/localization';
import Share from 'react-native-share';

const Profile = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const data = [
    {
      id: 1,
      name: 'Account',
      icon: 'person',
      type: 'MaterialIcons',
      onPress: function () {
        navigateScreen('Account');
      },
    },
    {
      id: 2,
      name: 'Wallet',
      icon: 'wallet',
      type: 'Entypo',
      onPress: function () {
        navigateScreen('Card');
      },
    },
    {
      id: 3,
      name: 'Order',
      icon: 'list',
      type: 'Entypo',
      onPress: function () {
        navigateScreen('Order');
      },
    },
    {
      id: 4,
      name: 'Coupons',
      icon: 'sale',
      type: 'MaterialCommunityIcons',
      onPress: function () {
        navigateScreen('Coupon');
      },
    },
    {
      id: 5,
      name: 'Setting',
      icon: 'player-settings',
      type: 'Fontisto',
      onPress: function () {
        navigateScreen('Setting');
      },
    },
    {
      id: 6,
      name: 'Invite a Friend',
      icon: 'mobile-friendly',
      type: 'MaterialIcons',
      onPress: function () {
        Share.open({
          message: 'Hs',
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
      },
    },
    {
      id: 7,
      name: 'Help Center',
      icon: 'live-help',
      type: 'MaterialIcons',
      onPress: function () {
        Linking.openURL(`tel:0123456789`);
      },
    },
    {
      id: 8,
      name: 'Logout',
      icon: 'logout',
      type: 'MaterialCommunityIcons',
      onPress: function () {
        setConfirm(true);
      },
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [info, setInfo] = useState({});
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };
  const handleImage = result => {
    setIsLoading(true);
    let uid = auth().currentUser?.providerData[0]?.uid;
    const name = `Users/${result?.assets[0]?.fileName}`;
    const reference = storage().ref(name);
    const task = reference.putFile(result?.assets[0]?.uri);
    task.then(async () => {
      const url = await storage().ref(name).getDownloadURL();
      firestore()
        .collection('user')
        .doc(uid)
        .update({
          photoURL: url,
        })
        .then(() => setIsLoading(false));
    });
  };
  const onImageLibraryPress = async () => {
    closeModal();
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    const result = await launchImageLibrary(options);
    if (result?.assets) {
      handleImage(result);
    }
  };
  const onCameraPress = async () => {
    closeModal();
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    const result = await launchCamera(options);
    if (result?.assets) {
      handleImage(result);
    }
  };
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted1 = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Hs App',
            message: 'Hs App access to your camera',
          },
        );
        const granted2 = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Hs App',
            message: 'Hs App access to your camera',
          },
        );
      } catch (err) {
        console.warn(err);
      }
    }
  };
  useEffect(() => {
    checkPermission();
  }, []);

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
  const CustomModal = () => {
    return (
      <Modal
        visible={modal}
        transparent
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.wModal}>
          <View style={styles.modal}>
            <Text style={styles.select}>Select Image</Text>
            <TouchableOpacity style={styles.imgEdit} onPress={onCameraPress}>
              <CustomIcon
                type="Ionicons"
                name="camera"
                size={24}
                color={constantColors.background}
              />
              <Text style={styles.choose}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imgEdit}
              onPress={onImageLibraryPress}>
              <CustomIcon
                type="Ionicons"
                name="images"
                size={24}
                color={constantColors.background}
              />
              <Text style={styles.choose}>Choose from Library</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
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
          <ScrollView style={styles.wrap}>
            <Text style={[styles.title, {color: colors.text}]}>
              {strings.profile}
            </Text>
            <View style={styles.profile}>
              <View style={styles.wImage}>
                <FastImage
                  style={styles.imgP}
                  source={{
                    uri: info?.photoURL,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <TouchableOpacity onPress={openModal} style={styles.edit}>
                  <CustomIcon
                    type="MaterialCommunityIcons"
                    name="image-edit-outline"
                    size={24}
                    color={constantColors.background}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.wTxtP}>
                <Text
                  style={[
                    styles.txtName,
                    {
                      color: colors.text,
                    },
                  ]}>
                  {info?.displayName}
                </Text>
                <Text style={styles.txtEmail}>{info?.email}</Text>
              </View>
            </View>
            <View style={styles.underline} />
            {data.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={[
                    styles.wItem,
                    {
                      marginBottom: index === 4 ? 0 : 10,
                    },
                  ]}
                  onPress={item.onPress}>
                  <View style={styles.wLeft}>
                    <View style={styles.wIcon}>
                      <CustomIcon
                        type={item.type}
                        name={item.icon}
                        size={24}
                        color={constantColors.white}
                      />
                    </View>
                    <Text
                      style={[
                        styles.name,
                        {
                          color: colors.text,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </View>
                  <CustomIcon
                    type="AntDesign"
                    name="right"
                    size={24}
                    color={constantColors.background}
                  />
                </TouchableOpacity>
                {index === 4 && <View style={styles.underline} />}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
      <CustomModal />
      <CustomConfirm
        modal={confirm}
        setModal={setConfirm}
        onPress={handleLogout}
      />
    </>
  );
};

export default Profile;
