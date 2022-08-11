import styled from '@emotion/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyPetsPage from './MyPetsPage';

const Tab = createBottomTabNavigator();

const TabsPage = () => {
  return (
    <StyledSafeAreaView edges={['top', 'right', 'left']}>
      <Tab.Navigator
        initialRouteName="MyPets"
        screenOptions={{
          headerShown: false,
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
    </StyledSafeAreaView>
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

const StyledSafeAreaView = styled(SafeAreaView)(() => {
  return {
    flex: 1,
  };
});
