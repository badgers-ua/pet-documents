import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export const lightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#E67E22',
  },
};

export const darkTheme: Theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    text: '#ffffff',
    primary: '#E67E22',
  },
};
