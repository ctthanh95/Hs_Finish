import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Item from './Item';
import Empty from './Empty';
import {colors as constantColors, fonts} from '../../../../constants';

const Recommend = ({data, recommendRef}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.recommend, {color: colors.text}]}>
          Recommended
        </Text>
        <TouchableOpacity>
          <Text style={styles.show}>Show all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={recommendRef}
        contentContainerStyle={styles.flat}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        ListEmptyComponent={Empty}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Item item={item} big={true} />}
      />
    </View>
  );
};

export default Recommend;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  recommend: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  show: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: constantColors.red,
  },
  flat: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
