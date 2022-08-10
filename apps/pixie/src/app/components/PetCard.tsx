import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import tw from 'twrnc';
import { Style } from 'twrnc/dist/esm/types';
import useThemeColor from '../hooks/useThemeColor';

const PetCard = ({ style, ...other }: ViewProps) => {
  const themeColor = useThemeColor();

  return (
    <View
      style={{
        ...tw`h-36 w-36 rounded-xl shadow-lg ${
          themeColor === 'light' ? 'bg-white' : 'bg-zinc-500'
        }`,
        ...(style as Style),
      }}
      {...other}
    >
      <Text>PetCard</Text>
    </View>
  );
};

export default PetCard;
