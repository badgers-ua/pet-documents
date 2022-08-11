import styled from '@emotion/native';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
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
  ...touchableOpacityProps
}: ButtonLocalProps) => {
  return (
    <StyledButton {...touchableOpacityProps}>
      <View>
        {IconComponent ? (
          <IconComponent width={iconSize} height={iconSize} />
        ) : null}
      </View>
      <ContentWrapper>
        <StyledSubTitle isStartIconPresented={!!IconComponent}>
          {children}
        </StyledSubTitle>
      </ContentWrapper>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled(TouchableOpacity)(() => {
  const theme = useTheme();

  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 100,
  };
});

const ContentWrapper = styled(View)(() => {
  return {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };
});

const StyledSubTitle = styled(SubTitle)(
  ({ isStartIconPresented }: { isStartIconPresented: boolean }) => {
    return {
      marginLeft: isStartIconPresented ? -iconSize : 0,
    };
  }
);
