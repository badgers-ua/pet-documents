import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import tw from 'twrnc';
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
    <SafeAreaView style={tw`p-4 z-20 relative h-full`}>
      <View style={tw`pl-10 pr-10`}>
        <Title style={tw`text-center mt-5`}>{i18n.t('petDocuments')}</Title>
        <View style={tw`flex items-center mt-6 mb-4`}>
          <LogoIcon width={150} height={150} />
        </View>
        <SubTitle style={tw`text-center mt-5`}>{i18n.t('welcome')}</SubTitle>
        <AppleButton style={tw`mt-5`} onPress={handleSignIn} />
        <GoogleButton style={tw`mt-5`} onPress={handleSignIn} />
      </View>
    </SafeAreaView>
  );
};

export default SignInPage;
