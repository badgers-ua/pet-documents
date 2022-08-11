import styled from '@emotion/native';
import React from 'react';
import { TextProps } from 'react-native';
import Typography from './Typography';

const Label = ({ children, ...other }: TextProps) => {
  return <StyledTypography {...other}>{children}</StyledTypography>;
};

export default Label;

const StyledTypography = styled(Typography)({
  fontWeight: '600',
  fontFamily: 'OpenSans_600SemiBold',
  fontSize: 15,
});
