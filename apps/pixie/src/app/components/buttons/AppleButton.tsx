import React from 'react';
import { Text } from 'react-native';
import tw from 'twrnc';
import { Style } from 'twrnc/dist/esm/types';
import useThemeColor from '../../hooks/useThemeColor';
import AppleIcon from '../icons/apple.svg';
import Button, { ButtonLocalProps } from './Button';

type AppleButtonProps = Omit<ButtonLocalProps, 'children' | 'startIcon'>;

const AppleButton = ({ style, ...buttonLocalProps }: AppleButtonProps) => {
  const colorTheme = useThemeColor();

  return (
    <Button
      {...buttonLocalProps}
      style={{
        ...tw`${colorTheme === 'light' ? 'border bg-white' : ' bg-white'}`,
        ...(style as Style),
      }}
      startIcon={AppleIcon}
    >
      <Text style={tw`text-black`}>Sign in with Google</Text>
    </Button>
  );
};

export default AppleButton;
