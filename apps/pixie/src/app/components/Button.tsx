import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';
import tw from 'twrnc';
import SubTitle from './typography/SubTitle';

const Button = () => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => {
        console.log();
      }}
      style={{
        ...tw`rounded-full h-14 flex justify-center items-center`,
        backgroundColor: theme.colors.background,
      }}
    >
      <SubTitle style={tw`text-white`}>Log In</SubTitle>
    </Pressable>
  );
};

export default Button;
