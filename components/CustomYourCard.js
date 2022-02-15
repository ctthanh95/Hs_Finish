import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import {colors, fonts} from '../constants';
import CustomIcon from './CustomIcon';
const CustomYourCard = ({item, check, handleDetail, isCheckOut, ...props}) => {
  const handleClick = item => {
    handleDetail(item);
  };
  return (
    <TouchableOpacity
      style={[
        styles.wItem,
        {
          borderWidth: item.cardDefault ? 1 : 0,
        },
      ]}
      {...props}
      onPress={() => handleClick(isCheckOut ? item.idCard : item)}>
      <View style={styles.row}>
        <View style={styles.wImage}>
          <CustomIcon
            type={item.type}
            name={item.icon}
            size={24}
            color={colors.background}
          />
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <CircleCheckBox
        checked={item.cardDefault}
        onToggle={() => handleClick(item)}
        namePosition={LABEL_POSITION.RIGHT}
        outerSize={20}
        filterSize={17}
        innerSize={12}
        outerColor={colors.background}
        innerColor={colors.background}
      />
    </TouchableOpacity>
  );
};

export default CustomYourCard;

const styles = StyleSheet.create({
  wItem: {
    padding: 20,
    backgroundColor: colors.light,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wImage: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.bold,
  },
});
