import styled from '@emotion/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const PetProfilePage = () => {
  const [flipKey, setFlipKey] = useState<number | undefined>(undefined);
  const theme = useTheme();

  useEffect(() => {
    setFlipKey(0);
  }, []);

  return (
    <Root>
      <Tab.Navigator
        key={flipKey}
        initialRouteName="Info"
        screenOptions={{
          swipeEnabled: true,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarIndicatorStyle: {
            borderWidth: 1.5,
            borderColor: theme.colors.primary,
          },
          tabBarLabelStyle: {
            fontWeight: '600',
          },
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            shadowOffset: {
              width: 0,
              height: 1.5,
            },
          },
        }}
      >
        <Tab.Screen name="Info" component={Info} />
        <Tab.Screen name="Events" component={Events} />
      </Tab.Navigator>
    </Root>
  );
};

export default PetProfilePage;

const Info = () => {
  const arr = new Array(200).fill(undefined);

  return (
    <ScrollView>
      {arr.map((_, i) => (
        <Text key={i}>Info</Text>
      ))}
    </ScrollView>
  );
};

const Events = () => {
  return (
    <View>
      <Text>Events</Text>
    </View>
  );
};

const Root = styled(View)(() => {
  return {
    flex: 1,
  };
});
