import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import AppleButton from '../components/buttons/AppleButton';
import GoogleButton from '../components/buttons/GoogleButton';
import SubTitle from '../components/typography/SubTitle';
import Title from '../components/typography/Title';
import i18n from '../i18n';
import LogoIcon from '../icons/logo.svg';

const SignInPage = () => {
  const { reset } = useNavigation();

  const handleSignIn = () => {
    reset({
      index: 0,
      routes: [{ name: 'Tabs' } as any],
    });
  };

  return (
    <Root>
      <Content>
        <Title>{i18n.t('petDocuments')}</Title>
        <LogoWrapper>
          <LogoIcon width={150} height={150} />
        </LogoWrapper>
        <StyledSubTitle>{i18n.t('welcome')}</StyledSubTitle>
        <StyledAppleButton onPress={handleSignIn} />
        <StyledGoogleButton onPress={handleSignIn} />
      </Content>
    </Root>
  );
};

export default SignInPage;

const Root = styled(SafeAreaView)(() => {
  return {
    flex: 1,
  };
});

const Content = styled(View)(() => {
  return {
    marginTop: 80,
    flex: 1,
    padding: 0,
    alignItems: 'center',
    paddingLeft: 33,
    paddingRight: 33,
  };
});

const LogoWrapper = styled(View)(() => {
  return {
    marginTop: 24,
    marginBottom: 24,
  };
});

const StyledSubTitle = styled(SubTitle)(() => {
  return {
    marginBottom: 16,
  };
});

const StyledAppleButton = styled(AppleButton)(() => {
  return {
    marginBottom: 16,
  };
});

const StyledGoogleButton = styled(GoogleButton)(() => {
  return {
    marginBottom: 16,
  };
});
