import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomIcon, CustomText} from '../../../../components';
import {colors} from '../../../../constants';

const Star = ({star, setStar}) => {
  const temp = [1, 2, 3, 4, 5];
  const handleClick = e => {
    setStar(e);
  };
  return (
    <View style={styles.container}>
      {temp.map((e, i) => {
        return (
          <CustomText
            title={e}
            key={i}
            onPress={() => handleClick(e)}
            width={50}
            right={
              <CustomIcon
                type="AntDesign"
                name="star"
                size={20}
                color={star === e ? colors.white : colors.grey}
              />
            }
            styleTouch={{
              backgroundColor: star === e ? colors.background : colors.light,
            }}
            styleText={{
              color: star === e ? colors.white : colors.grey,
            }}
          />
        );
      })}
    </View>
  );
};

export default Star;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});
