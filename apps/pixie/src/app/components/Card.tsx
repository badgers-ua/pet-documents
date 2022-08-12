import styled from '@emotion/native';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, ViewProps } from 'react-native';
import useThemeColor from '../hooks/useThemeColor';

const Card = ({ ...other }: ViewProps) => {
  return <StyledCard {...other}></StyledCard>;
};

export default Card;

const StyledCard = styled(View)(() => {
  const themeColor = useThemeColor();
  const theme = useTheme();

  return {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 12,
    backgroundColor:
      themeColor === 'light' ? theme.colors.background : '#3f3f46',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  };
});
