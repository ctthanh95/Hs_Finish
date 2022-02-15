import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import {colors, fonts} from '../constants';
import CustomIcon from './CustomIcon';
const CustomCard = ({item, check, handleCheckbox, isCheckOut, ...props}) => {
  const handleClick = item => {
    handleCheckbox(item);
  };
  return (
    <TouchableOpacity
      style={[
        styles.wItem,
        {
          borderWidth: isCheckOut
            ? check?.idCard === item.idCard
              ? 1
              : 0
            : check?.name === item.name
            ? 1
            : 0,
        },
      ]}
      {...props}
      onPress={() => handleClick(item)}>
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
        checked={
          isCheckOut ? check?.idCard === item.idCard : check?.name === item.name
        }
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

export default CustomCard;

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
