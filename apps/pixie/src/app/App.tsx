/* eslint-disable jsx-a11y/accessible-emoji */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
  useTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import tw from 'twrnc';
import LogoIcon from '../icons/logo.svg';
import IconButton from './components/buttons/IconButton';
import useThemeColor from './hooks/useThemeColor';
import PetProfilePage from './pages/PetProfilePage';
import SignInPage from './pages/SignInPage';
import TabsPage from './pages/TabsPage';

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
        name="Tabs"
        component={TabsPage}
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

const lightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: tw`text-amber-500`.color as string,
  },
};

const darkTheme: Theme = {
  ...DarkTheme,
  dark: false,
  colors: {
    ...DarkTheme.colors,
    primary: tw`text-amber-500`.color as string,
  },
};

const App = () => {
  const colorTheme = useThemeColor();

  return (
    <NavigationContainer
      theme={colorTheme === 'light' ? lightTheme : darkTheme}
    >
      <NavigationStack />
    </NavigationContainer>
  );
};

export default App;
