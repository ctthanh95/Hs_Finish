import React, {useState} from 'react';
import {View, Text, TouchableOpacity, DevSettings} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SwitchToggle from 'react-native-switch-toggle';
import DropDownPicker from 'react-native-dropdown-picker';
import {CustomHeader, CustomLoading} from '../../components';
import strings from '../../helpers/localization';
import {colors as constantColors} from '../../constants';
import styles from './styles';
//
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {changeMode} from '../../redux/actions/settingAction';
import {getValue, setValue as setValueMKKV} from '../../helpers/mmkv';

const Setting = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector(state => state.settingReducer.mode);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => {
    let result = getValue('string', 'language');
    return result ? result : strings.getLanguage();
  });
  const [items, setItems] = useState([
    {label: 'English', value: 'en'},
    {label: 'Tiếng Việt', value: 'vi'},
  ]);
  const navigateGoBack = () => {
    navigation.goBack();
  };
  const navigateScreen = screen => {
    navigation.navigate(screen);
  };
  const Item = ({name, right}) => {
    return (
      <View style={styles.wItem}>
        <View style={styles.left}>
          <Text style={[styles.txtItem, {color: colors.text}]}>{name}</Text>
        </View>
        <View style={styles.right}>{right}</View>
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.wrap}>
            <CustomHeader onPress={navigateGoBack} title={strings.setting} />
            <Item
              name={strings.darkMode}
              right={
                <SwitchToggle
                  switchOn={mode === 'dark' ? true : false}
                  onPress={() => {
                    if (mode === 'dark') {
                      dispatch(changeMode('light'));
                    } else {
                      dispatch(changeMode('dark'));
                    }
                  }}
                  circleColorOff={constantColors.white}
                  circleColorOn={constantColors.background}
                  backgroundColorOn={constantColors.light}
                  backgroundColorOff={constantColors.light}
                  containerStyle={styles.containerStyle}
                  circleStyle={styles.circleStyle}
                />
              }
            />
            <Item
              name={strings.language}
              right={
                <DropDownPicker
                  placeholder=""
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={styles.dropDownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  onSelectItem={item => {
                    setValueMKKV('language', item.value);
                    DevSettings.reload();
                  }}
                />
              }
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Setting;
