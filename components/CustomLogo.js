import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {fonts, images} from '../constants';

const CustomLogo = ({size, title, description}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={[
          styles.image,
          {
            width: size,
            height: size,
          },
        ]}
      />
      {title && (
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          {title}
        </Text>
      )}
      {description && (
        <Text
          style={[
            styles.description,
            {
              color: colors.text,
            },
          ]}>
          {description}
        </Text>
      )}
    </View>
  );
};

export default CustomLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  image: {
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginTop: 5,
  },
});
