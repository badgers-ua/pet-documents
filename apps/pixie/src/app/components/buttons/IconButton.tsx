import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

const IconButton = ({ children, ...other }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...other}>
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default IconButton;
