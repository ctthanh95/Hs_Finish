import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {colors as constantColors, fonts} from '../../../../constants';

const Menu = ({data, menu, setMenu}) => {
  const {colors} = useTheme();
  const handleClick = id => {
    setMenu(id);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleClick(item.id)}
                style={{
                  marginRight: index === data.length - 1 ? 0 : 50,
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        menu === item.id ? constantColors.red : colors.text,
                    },
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  row: {flexDirection: 'row'},
  text: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
});
