import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import tw from 'twrnc';
import { Style } from 'twrnc/dist/esm/types';

const SubTitle = ({ children, style, ...other }: TextProps) => {
  return (
    <Text
      style={{ ...tw`font-semibold text-xl`, ...(style as Style) }}
      {...other}
    >
      {children}
    </Text>
  );
};

export default SubTitle;

const styles = StyleSheet.create({});
