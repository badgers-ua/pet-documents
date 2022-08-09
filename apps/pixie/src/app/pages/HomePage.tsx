import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import IconButton from '../components/IconButton';
import SubTitle from '../components/typography/SubTitle';
import LogoIcon from '../icons/logo.svg';
import MyPetsPage from './MyPetsPage';

const Tab = createBottomTabNavigator();

const HomePage = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: (props) => <SubTitle {...props} style={tw`ml-3`} />,
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: theme.colors.background,
          shadowColor: 'transparent',
        },
        headerTitleContainerStyle: {
          display: 'flex',
        },
        headerRight: () => (
          <IconButton style={tw`mr-6`}>
            <LogoIcon width={36} height={36} />
          </IconButton>
        ),
      }}
    >
      <Tab.Screen name="MyPets" component={MyPetsPage} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
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

export default HomePage;
