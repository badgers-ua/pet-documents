import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import tw from 'twrnc';
import { Style } from 'twrnc/dist/esm/types';
import { Children } from '../../types';
import SubTitle from '../typography/SubTitle';

export type ButtonLocalProps = {
  startIcon?: React.FC<SvgProps>;
} & TouchableOpacityProps &
  Children;

const iconSize = 28;

const Button = ({
  startIcon: IconComponent,
  children,
  style,
  ...touchableOpacityProps
}: ButtonLocalProps) => {
  return (
    <TouchableOpacity
      style={{
        ...tw`bg-amber-500 p-4 rounded-full flex-row justify-between items-center`,
        ...(style as Style),
      }}
      {...touchableOpacityProps}
    >
      <View>
        {IconComponent ? (
          <IconComponent width={iconSize} height={iconSize} />
        ) : null}
      </View>
      <View
        style={{
          ...tw`flex-1 justify-between items-center`,
        }}
      >
        <SubTitle
          style={tw`text-white ${IconComponent ? '-ml-' + iconSize / 4 : ''}`}
        >
          {children}
        </SubTitle>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
