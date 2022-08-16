import styled from '@emotion/native';
import React from 'react';
import { Text } from 'react-native';
import useThemeColor from '../../hooks/useThemeColor';
import { lightTheme } from '../../theme';
import AppleIcon from '../icons/apple.svg';
import Button, { ButtonLocalProps } from './Button';

type AppleButtonProps = Omit<ButtonLocalProps, 'children' | 'startIcon'>;

const AppleButton = ({ ...buttonLocalProps }: AppleButtonProps) => {
  return (
    <StyledButton {...buttonLocalProps} startIcon={AppleIcon}>
      <StyledSubtitle>Sign in with Apple</StyledSubtitle>
    </StyledButton>
  );
};

export default AppleButton;

const StyledButton = styled(Button)(() => {
  const colorTheme = useThemeColor();

  return {
    backgroundColor: lightTheme.colors.background,
    borderWidth: colorTheme === 'light' ? 1 : 0,
  };
});

const StyledSubtitle = styled(Text)(() => {
  return {
    color: lightTheme.colors.text,
  };
});
