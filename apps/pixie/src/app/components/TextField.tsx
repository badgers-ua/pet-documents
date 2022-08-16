import styled from '@emotion/native';
import React from 'react';
import { TextInput } from 'react-native';

const TextField = () => {
  return <StyledTextField placeholder="Input my tralala" />;
};

export default TextField;

const StyledTextField = styled(TextInput)(() => {
  return {
    height: 52,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 23,
    borderColor: '#949494',
  };
});
