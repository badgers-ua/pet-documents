import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import tw from 'twrnc';
import { Style } from 'twrnc/dist/esm/types';

const PetCard = ({ style, ...other }: ViewProps) => {
  return (
    <View
      style={{
        ...tw`h-36 w-36 bg-white rounded-xl shadow-lg`,
        ...(style as Style),
      }}
      {...other}
    >
      <Text>PetCard</Text>
    </View>
  );
};

export default PetCard;
