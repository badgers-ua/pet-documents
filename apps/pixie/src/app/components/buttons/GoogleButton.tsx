import React from 'react';
import { Text } from 'react-native';
import tw from 'twrnc';
import { Style } from 'twrnc/dist/esm/types';
import useThemeColor from '../../hooks/useThemeColor';
import GoogleIcon from '../icons/google.svg';
import Button, { ButtonLocalProps } from './Button';

type GoogleButtonProps = Omit<ButtonLocalProps, 'children' | 'startIcon'>;

const GoogleButton = ({ style, ...buttonLocalProps }: GoogleButtonProps) => {
  const colorTheme = useThemeColor();

  return (
    <Button
      {...buttonLocalProps}
      style={{
        ...tw`${colorTheme === 'light' ? 'border bg-white' : ' bg-blue-600'}`,
        ...(style as Style),
      }}
      startIcon={GoogleIcon}
    >
      <Text style={tw`${colorTheme === 'light' ? 'text-black' : 'text-white'}`}>
        Sign in with Google
      </Text>
    </Button>
  );
};

export default GoogleButton;
