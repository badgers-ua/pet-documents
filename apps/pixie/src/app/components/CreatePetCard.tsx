import styled from '@emotion/native';
import IonIcons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, ViewProps } from 'react-native';
import Label from './typography/Label';

const CreatePetCard = ({ ...other }: ViewProps) => {
  const theme = useTheme();
  return (
    <StyledCreatePet {...other}>
      <IonIcons name="add" color={theme.colors.primary} size={72} />
      <StyledLabel>Add new pet</StyledLabel>
    </StyledCreatePet>
  );
};

export default CreatePetCard;

const StyledCreatePet = styled(View)(() => {
  const theme = useTheme();

  return {
    paddingTop: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderRadius: 12,
  };
});

const StyledLabel = styled(Label)(() => {
  const theme = useTheme();

  return {
    color: theme.colors.primary,
  };
});
