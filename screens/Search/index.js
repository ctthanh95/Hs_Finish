import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader, CustomIcon, CustomLoading} from '../../components';
import {colors as constantColors} from '../../constants';
import {Item} from '../BottomTab/Home/components';
import styles from './styles';
import {Empty} from '../BottomTab/Home/components';
//
import {useTheme, useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';

const Search = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState(route.params);
  const [search, setSearch] = useState('');
  const navigateGoBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    let arr = route.params.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase()),
    );
    setData(arr);
  }, [search]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <CustomHeader onPress={navigateGoBack} title="SEARCH" />
        <View style={styles.search}>
          <CustomIcon
            type="AntDesign"
            name="search1"
            size={24}
            color={constantColors.black}
          />
          <TextInput
            placeholder="Name product..."
            style={styles.input}
            placeholderTextColor={constantColors.black}
            onChangeText={setSearch}
            value={search}
            autoFocus={true}
          />
        </View>
        <FlatList
          ListEmptyComponent={Empty}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index + ''}
          renderItem={({item}) => <Item item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
