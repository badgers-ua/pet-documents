import styled from '@emotion/native';
import React from 'react';
import { TextProps } from 'react-native';
import Typography from './Typography';

const Subtitle = ({ children, ...other }: TextProps) => {
  return <SubtitleText {...other}>{children}</SubtitleText>;
};

export default Subtitle;

const SubtitleText = styled(Typography)({
  fontWeight: '600',
  fontFamily: 'OpenSans_600SemiBold',
  fontSize: 19,
});
