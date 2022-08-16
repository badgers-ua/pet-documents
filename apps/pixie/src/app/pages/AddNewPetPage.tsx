import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import TextField from '../components/TextField';

const AddNewPetPage = () => {
  const { goBack } = useNavigation();

  return (
    <Root>
      <Header title={'Add new Pet'} onNavigateBack={goBack} />
      <TextField />
    </Root>
  );
};

export default AddNewPetPage;

const Root = styled(View)(() => {
  return {
    flex: 1,
  };
});
