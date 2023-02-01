import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { TouchableOpacity } from 'react-native';

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
  Fontisto,
};

const AnyIcon = ({ name, color, type, size, onPress = () => console.log('Nothing to act'), disabled, style }) => {
  const Tag = type;
  return (
    <>
      {type && name && (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={disabled}
          style={{ paddingHorizontal: 2 }}
          onPress={onPress}>
          <Tag
            name={name}
            size={size}
            color={color}
            style={style}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default AnyIcon;
