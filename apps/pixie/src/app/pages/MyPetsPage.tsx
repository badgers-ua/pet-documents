import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import PetCard from '../components/PetCard';

const MyPetsStack = createNativeStackNavigator();

const MyPetsPage = () => {
  return (
    <MyPetsStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MyPetsStack.Screen name="Home" component={Home} />
    </MyPetsStack.Navigator>
  );
};

export default MyPetsPage;

const Home = () => {
  const { navigate } = useNavigation();

  const arr = [0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <Root>
      <CardsList>
        {arr.map((_, i) => {
          return (
            <CardsButton onPress={() => navigate('PetProfile' as any)} key={i}>
              <StyledPetCard />
            </CardsButton>
          );
        })}
      </CardsList>
    </Root>
  );
};

const Root = styled(ScrollView)(() => {
  return {
    flex: 1,
  };
});

const CardsList = styled(View)(() => {
  return {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };
});

const CardsButton = styled(TouchableOpacity)(() => {
  const deviceWidth = Dimensions.get('window').width;
  const cardWidth = deviceWidth / 2.2;

  return {
    padding: 6,
    width: cardWidth,
    height: cardWidth,
  };
});

const StyledPetCard = styled(PetCard)(() => {
  return {
    width: '100%',
    height: '100%',
  };
});
