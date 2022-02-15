import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts, lotties} from '../constants';
import CustomButton from './CustomButton';
const CustomConfirm = ({modal, setModal, onPress}) => {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <Modal transparent visible={modal} onRequestClose={closeModal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.wModal}>
          <Text style={styles.title}>Do you want to continue?</Text>
          <View style={styles.wButton}>
            <View style={styles.left}>
              <CustomButton
                backgroundColor={colors.light}
                color={colors.red}
                title="No"
                onPress={closeModal}
              />
            </View>
            <View style={styles.right}>
              <CustomButton
                backgroundColor={colors.background}
                color={colors.white}
                title="Yes"
                onPress={onPress}
              />
            </View>
          </View>
          <View style={styles.circle}>
            <LottieView
              autoPlay
              loop
              source={lotties.confirm}
              style={{
                width: 125,
                height: 125,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default CustomConfirm;

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
  wButton: {
    flexDirection: 'row',
    marginTop: 10,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    marginLeft: 10,
  },
});
