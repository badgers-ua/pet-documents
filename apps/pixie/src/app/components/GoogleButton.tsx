import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import tw from 'twrnc';
import { Style } from 'twrnc/dist/esm/types';
import GoogleIcon from '../icons/google.svg';
import SubTitle from './typography/SubTitle';

const GoogleButton = ({ style, ...other }: PressableProps) => {
  return (
    <Pressable
      onPress={() => {
        console.log();
      }}
      style={{ ...tw`flex-row border rounded-full h-14`, ...(style as Style) }}
      {...other}
    >
      <View style={tw`p-3 absolute`}>
        <GoogleIcon />
      </View>
      <View style={tw`flex-row w-full justify-center items-center`}>
        <SubTitle>Sign in with Google</SubTitle>
      </View>
    </Pressable>
  );
};

export default GoogleButton;
