import React, {memo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {lotties} from '../constants';
const CustomLoading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={lotties.loading}
        autoPlay={true}
        loop={true}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </SafeAreaView>
  );
};

export default memo(CustomLoading);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
