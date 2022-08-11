import styled from '@emotion/native';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import useThemeColor from '../hooks/useThemeColor';
import { darkTheme } from '../theme';

const PetCard = ({ ...other }: ViewProps) => {
  return (
    <StyledPetCard {...other}>
      <Text>PetCard</Text>
    </StyledPetCard>
  );
};

export default PetCard;

const StyledPetCard = styled(View)(() => {
  const themeColor = useThemeColor();

  return {
    height: 36,
    width: 36,
    borderRadius: 12,
    backgroundColor: themeColor === 'light' ? darkTheme.colors.text : '#3f3f46',
  };
});
