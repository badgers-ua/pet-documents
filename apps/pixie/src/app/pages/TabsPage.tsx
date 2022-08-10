import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import IconButton from '../components/buttons/IconButton';
import SubTitle from '../components/typography/SubTitle';
import useThemeColor from '../hooks/useThemeColor';
import LogoIcon from '../icons/logo.svg';
import MyPetsPage from './MyPetsPage';

const Tab = createBottomTabNavigator();

const TabsPage = () => {
  const theme = useTheme();
  const themeColor = useThemeColor();

  return (
    <Tab.Navigator
      initialRouteName="MyPets"
      screenOptions={{
        headerTitle: (props) => (
          <SubTitle
            {...props}
            style={tw`ml-3 ${themeColor === 'light' ? '' : 'text-white'}`}
          />
        ),
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: theme.colors.background,
          shadowColor: 'transparent',
        },
        headerRight: () => (
          <IconButton style={tw`mr-6`}>
            <LogoIcon width={36} height={36} />
          </IconButton>
        ),
      }}
    >
      <Tab.Screen
        name="MyPets"
        component={MyPetsPage}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default TabsPage;
