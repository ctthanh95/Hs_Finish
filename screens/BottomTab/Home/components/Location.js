import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CustomIcon} from '../../../../components';
import {colors as constantColors, fonts} from '../../../../constants';
//
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

const Location = ({item, index, colors, handleItem}) => {
  const {dismiss} = useBottomSheetModal();
  const handleClick = item => {
    handleItem(item);
    dismiss();
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleClick(item)}>
      <View style={styles.header}>
        <CustomIcon
          type="MaterialIcons"
          name={index === 0 ? 'my-location' : 'access-time'}
          size={24}
          color={constantColors.grey}
        />
        <View style={styles.wText}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}>
            {index === 0 ? 'Your current location' : item.street}
          </Text>
          <Text
            style={[
              styles.description,
              {
                color: colors.text,
              },
            ]}>
            {item.label}
          </Text>
          <View
            style={[
              styles.underline,
              {
                backgroundColor: colors.border,
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
  },
  wText: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.light,
    marginVertical: 10,
  },
  underline: {
    height: StyleSheet.hairlineWidth,
    marginTop: 15,
  },
});
