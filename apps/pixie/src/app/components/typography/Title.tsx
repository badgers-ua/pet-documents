import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import tw from 'twrnc';
import { Style } from 'twrnc/dist/esm/types';

const Title = ({ children, style, ...other }: TextProps) => {
  return (
    <Text style={{ ...tw`font-bold text-xl`, ...(style as Style) }} {...other}>
      {children}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({});
