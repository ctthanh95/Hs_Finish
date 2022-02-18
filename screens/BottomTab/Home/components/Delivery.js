import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../../constants';
import {CustomText} from '../../../../components';
const Delivery = ({delivery, setDelivery}) => {
  const temp = [10, 20, 30];
  const handleClick = e => {
    setDelivery(e);
  };
  return (
    <View style={styles.container}>
      {temp.map((e, i) => {
        return (
          <CustomText
            width={100}
            title={`${e} Mins`}
            onPress={() => handleClick(e)}
            key={i}
            styleTouch={{
              backgroundColor:
                delivery === e ? colors.background : colors.light,
            }}
            styleText={{
              color: delivery === e ? colors.white : colors.grey,
            }}
          />
        );
      })}
    </View>
  );
};

export default memo(Delivery);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});
