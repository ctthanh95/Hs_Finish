import React, {memo} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

const CustomIcon = ({type, ...props}) => {
  switch (type) {
    case 'AntDesign':
      return <AntDesign {...props} />;
    case 'Entypo':
      return <Entypo {...props} />;
    case 'EvilIcons':
      return <EvilIcons {...props} />;
    case 'Feather':
      return <Feather {...props} />;
    case 'FontAwesome':
      return <FontAwesome {...props} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...props} />;
    case 'Fontisto':
      return <Fontisto {...props} />;
    case 'Foundation':
      return <Foundation {...props} />;
    case 'Ionicons':
      return <Ionicons {...props} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...props} />;
    case 'MaterialIcons':
      return <MaterialIcons {...props} />;
    case 'Octicons':
      return <Octicons {...props} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons {...props} />;
    case 'Zocial':
      return <Zocial {...props} />;
  }
};

export default memo(CustomIcon);
