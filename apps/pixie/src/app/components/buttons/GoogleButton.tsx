import styled from '@emotion/native';
import React from 'react';
import useThemeColor from '../../hooks/useThemeColor';
import { darkTheme } from '../../theme';
import GoogleIcon from '../icons/google.svg';
import Subtitle from '../typography/SubTitle';
import Button, { ButtonLocalProps } from './Button';

type GoogleButtonProps = Omit<ButtonLocalProps, 'children' | 'startIcon'>;

const GoogleButton = ({ ...buttonLocalProps }: GoogleButtonProps) => {
  const colorTheme = useThemeColor();

  return (
    <StyledButton {...buttonLocalProps} startIcon={GoogleIcon}>
      <Subtitle>Sign in with Google</Subtitle>
    </StyledButton>
  );
};

export default GoogleButton;

const StyledButton = styled(Button)(() => {
  const colorTheme = useThemeColor();

  return {
    backgroundColor: colorTheme === 'light' ? darkTheme.colors.text : '#2270E6',
    borderWidth: colorTheme === 'light' ? 1 : 0,
  };
});
