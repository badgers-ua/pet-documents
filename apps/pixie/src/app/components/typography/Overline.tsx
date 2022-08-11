import styled from '@emotion/native';
import React from 'react';
import { TextProps } from 'react-native';
import Typography from './Typography';

const Overline = ({ children, ...other }: TextProps) => {
  return <StyledTypography {...other}>{children}</StyledTypography>;
};

export default Overline;

const StyledTypography = styled(Typography)({
  fontWeight: '600',
  fontFamily: 'OpenSans_600SemiBold',
  fontSize: 10,
  opacity: 0.4,
});
