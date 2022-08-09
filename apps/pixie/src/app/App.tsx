/* eslint-disable jsx-a11y/accessible-emoji */
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
  useTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import tw from 'twrnc';
import LogoIcon from '../icons/logo.svg';
import IconButton from './components/IconButton';
import HomePage from './pages/HomePage';
import PetProfilePage from './pages/PetProfilePage';
import SignInPage from './pages/SignInPage';

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PetProfile"
        component={PetProfilePage}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
          title: undefined,
          headerBackTitle: 'My Pets',
          headerBackTitleStyle: {
            fontSize: 19,
          },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <IconButton style={tw`mr-2`}>
              <LogoIcon width={36} height={36} />
            </IconButton>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E67E22',
    background: '#E5E5E5',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <NavigationStack />
    </NavigationContainer>
  );
};

export default App;
