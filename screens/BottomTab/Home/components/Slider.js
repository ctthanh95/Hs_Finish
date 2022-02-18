import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  colors as constantColors,
  dimensions,
  fonts,
} from '../../../../constants';
const Slider = ({values, min, max, step, description, onValuesChange}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <MultiSlider
        sliderLength={dimensions.width - 70}
        values={values}
        min={min}
        max={max}
        step={step}
        selectedStyle={styles.selected}
        trackStyle={styles.track}
        markerOffsetY={5}
        onValuesChange={values => onValuesChange(values)}
        customMarker={e => {
          return (
            <>
              <View style={styles.wrap}>
                <View style={styles.circle} />
              </View>
              <Text
                style={[
                  styles.text,
                  {
                    color: colors.text,
                  },
                ]}>
                {e.currentValue + ` ${description}`}
              </Text>
            </>
          );
        }}
      />
    </View>
  );
};

export default memo(Slider);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  selected: {
    backgroundColor: constantColors.background,
  },
  track: {
    height: 10,
    borderRadius: 10,
    backgroundColor: constantColors.light,
  },
  wrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: constantColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: constantColors.white,
  },
  text: {
    position: 'absolute',
    top: 25,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
});
