/* eslint-disable jsx-a11y/accessible-emoji */
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  useFonts,
} from '@expo-google-fonts/open-sans';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import useThemeColor from './hooks/useThemeColor';
import PetProfilePage from './pages/PetProfilePage';
import SignInPage from './pages/SignInPage';
import TabsPage from './pages/TabsPage';
import { darkTheme, lightTheme } from './theme';

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return <View></View>;
  }

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
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const colorTheme = useThemeColor();

  return (
    <NavigationContainer
      theme={colorTheme === 'light' ? lightTheme : darkTheme}
    >
      <StatusBar
        barStyle={colorTheme === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationStack />
    </NavigationContainer>
  );
};

export default App;
