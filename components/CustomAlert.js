import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts, lotties} from '../constants';
import CustomButton from './CustomButton';
const CustomAlert = ({modal, setModal, isSuccess, description, onPress}) => {
  const closeModal = () => {
    setModal(false);
    if (onPress) {
      onPress();
    }
  };
  return (
    <Modal transparent visible={modal} onRequestClose={closeModal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.wModal}>
          <Text style={styles.title}>
            {isSuccess ? 'Congratulations' : 'Ooops'}
          </Text>
          <Text style={styles.description}>{description}</Text>
          <CustomButton
            backgroundColor={isSuccess ? '#00CCFF' : '#696969'}
            color={'white'}
            title="Done"
            onPress={closeModal}
          />
          <View style={styles.circle}>
            <LottieView
              autoPlay
              loop
              source={isSuccess ? lotties.success : lotties.fail}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000075',
  },
  wModal: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.black,
    marginTop: 50,
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black,
    marginBottom: 15,
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    position: 'absolute',
    top: -50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
