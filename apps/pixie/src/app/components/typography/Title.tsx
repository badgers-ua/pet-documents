import styled from '@emotion/native';
import React from 'react';
import { TextProps } from 'react-native';
import Typography from './Typography';

const Title = ({ children, ...other }: TextProps) => {
  return <TitleText {...other}>{children}</TitleText>;
};

export default Title;

const TitleText = styled(Typography)({
  fontWeight: '700',
  fontFamily: 'OpenSans_700Bold',
  fontSize: 19,
});
