import styled from '@emotion/native';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TextProps } from 'react-native';

const Typography = ({ children, ...other }: TextProps) => {
  return <TypographyText {...other}>{children}</TypographyText>;
};

export default Typography;

const TypographyText = styled(Text)(() => {
  const theme = useTheme();

  return {
    color: theme.colors.text,
    fontFamily: 'OpenSans_400Regular',
  };
});
