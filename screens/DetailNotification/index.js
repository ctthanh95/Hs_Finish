import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {CustomHeader, CustomLoading} from '../../components';
import styles from './styles';
//
import {useNavigation, useTheme, useRoute} from '@react-navigation/native';
//

const DetailCard = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const {content, id, name, time} = route.params;
  //Function
  const navigateGoBack = () => {
    navigation.goBack();
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
              <CustomHeader
                title="DETAIL NOTIFICATION"
                onPress={navigateGoBack}
              />
              <FastImage
                style={styles.image}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/hs-project-335212.appspot.com/o/Users%2Fblack_firiday.jpeg?alt=media&token=d3d99c0c-b78c-4215-94d3-e7e7b68d05f4',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                style={[
                  styles.name,
                  {
                    color: colors.text,
                  },
                ]}>
                {name}
              </Text>
              <Text
                style={[
                  styles.content,
                  {
                    color: colors.text,
                  },
                ]}>
                {content}
              </Text>
              <Text
                style={[
                  styles.time,
                  {
                    color: colors.text,
                  },
                ]}>
                {time}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default DetailCard;
