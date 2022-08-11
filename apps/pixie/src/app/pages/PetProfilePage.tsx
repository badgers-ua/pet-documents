import styled from '@emotion/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import CatIcon from '../icons/cat.svg';
import { darkTheme } from '../theme';

const Tab = createMaterialTopTabNavigator();

const image = {
  uri: 'https://www.thesprucepets.com/thmb/d-Mk298Jc8NHEWePgK8vNfdDTdE=/941x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/black-cat-on-tree-stump-588278854-5804d25b3df78cbc2867566c.jpg',
};

const PetProfilePage = () => {
  const { goBack } = useNavigation();
  const [flipKey, setFlipKey] = useState<number | undefined>(undefined);
  const theme = useTheme();

  useEffect(() => {
    setFlipKey(0);
  }, []);

  return (
    <Root>
      <StatusBar barStyle={image ? 'light-content' : 'dark-content'} />
      <StyledBackGroundImage source={image} />
      <StyledHeader
        title={'My Pets'}
        onNavigateBack={goBack}
        buttonColor={image ? darkTheme.colors.text : undefined}
      />
      <SubHeader>{!image ? <CatIcon /> : null}</SubHeader>
      <Tab.Navigator
        key={flipKey}
        initialRouteName="Info"
        screenOptions={{
          swipeEnabled: true,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: image
            ? darkTheme.colors.text
            : theme.colors.text,
          tabBarIndicatorStyle: {
            borderWidth: 1.5,
            borderColor: theme.colors.primary,
          },
          tabBarLabelStyle: {
            fontWeight: '600',
          },
          tabBarStyle: {
            backgroundColor: image
              ? 'rgba(0,0,0,.55)'
              : theme.colors.background,
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

const StyledHeader = styled(Header)(() => {
  return {
    backgroundColor: image ? 'rgba(0,0,0,.55)' : 'transparent',
  };
});

const StyledBackGroundImage = styled(ImageBackground)(() => {
  return {
    flex: 1,
    height: 254,
    position: 'absolute',
    width: '100%',
  };
});

const SubHeader = styled(View)(() => {
  return {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    backgroundColor: image ? 'rgba(0,0,0,.55)' : 'transparent',
    height: 106,
  };
});
