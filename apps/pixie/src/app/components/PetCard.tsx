import styled from '@emotion/native';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, ViewProps } from 'react-native';
import useThemeColor from '../hooks/useThemeColor';
import DogIcon from '../icons/dog.svg';
import Label from './typography/Label';
import Overline from './typography/Overline';

const PetCard = ({ ...other }: ViewProps) => {
  return (
    <StyledPetCard {...other}>
      <IconWrapper>
        <DogIcon height={78} />
      </IconWrapper>
      <StyledLabel>Tom</StyledLabel>
      <Overline>Age: 3</Overline>
    </StyledPetCard>
  );
};

export default PetCard;

const StyledPetCard = styled(View)(() => {
  const themeColor = useThemeColor();
  const theme = useTheme();

  return {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
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

const StyledLabel = styled(Label)(() => {
  return {
    paddingTop: 8,
  };
});

const IconWrapper = styled(View)(() => {
  return {
    paddingTop: 16,
  };
});
