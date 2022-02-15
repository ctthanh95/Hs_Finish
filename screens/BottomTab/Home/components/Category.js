import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CustomText} from '../../../../components';
import {colors} from '../../../../constants';

const Category = ({data, category, setCategory}) => {
  const handleClick = value => {
    setCategory(value);
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <CustomText
              width={150}
              title={item.name}
              left={
                <FastImage
                  style={styles.image}
                  source={{
                    uri: item.image,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              }
              styleTouch={{
                marginRight: index === data.length - 1 ? 0 : 25,
                backgroundColor:
                  category === item.id ? colors.background : colors.light,
              }}
              styleText={{
                color: category === item.id ? colors.white : colors.grey,
                fontSize: 16,
              }}
              onPress={() => handleClick(item.id)}
            />
          );
        }}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  image: {
    height: 40,
    width: 40,
  },
});
