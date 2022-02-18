import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomText} from '../../../../components';
import {colors} from '../../../../constants';

const Tag = ({tag, setTag, data}) => {
  const handleClick = e => {
    setTag(e);
  };
  return (
    <View style={styles.container}>
      {data.map(e => (
        <CustomText
          key={e.id}
          onPress={() => handleClick(e.id)}
          width={100}
          title={e.name}
          styleTouch={{
            backgroundColor: tag === e.id ? colors.background : colors.light,
            marginHorizontal: 10,
            marginBottom: 10,
          }}
          styleText={{
            color: tag === e.id ? colors.white : colors.grey,
          }}
        />
      ))}
    </View>
  );
};

export default memo(Tag);
const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
});
