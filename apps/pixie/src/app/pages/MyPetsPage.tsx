import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import Card from '../components/Card';
import CreatePetCard from '../components/CreatePetCard';
import PetCard from '../components/PetCard';
import Subtitle from '../components/typography/SubTitle';

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

  const arr = [0, 0, 0];

  return (
    <Root>
      <CardsList>
        {arr.map((_, i) => {
          return (
            <CardsButton onPress={() => navigate('PetProfile' as any)} key={i}>
              <PetCardButton />
            </CardsButton>
          );
        })}
        <CardsButton>
          <StyledCreatePetCard />
        </CardsButton>
      </CardsList>

      <EventsList>
        <EventsListTitle>Today Events (1)</EventsListTitle>

        <TouchableOpacity>
          <EventCardButton />
        </TouchableOpacity>
      </EventsList>

      <EventsList>
        <EventsListTitle>Tomorrow Events (2)</EventsListTitle>

        <TouchableOpacity>
          <EventCardButton />
        </TouchableOpacity>

        <TouchableOpacity>
          <EventCardButton />
        </TouchableOpacity>
      </EventsList>
    </Root>
  );
};

const Root = styled(ScrollView)(() => {
  return {
    flex: 1,
    marginTop: 16,
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

const PetCardButton = styled(PetCard)(() => {
  return {
    width: '100%',
    height: '100%',
  };
});

const EventsList = styled(View)(() => {
  return {
    paddingHorizontal: 26,
    paddingTop: 32,
  };
});

const EventsListTitle = styled(Subtitle)(() => {
  return {
    marginBottom: 24,
  };
});

const EventCardButton = styled(Card)(() => {
  return {
    width: '100%',
    height: 60,
    marginBottom: 12,
  };
});

const StyledCreatePetCard = styled(CreatePetCard)(() => {
  return {
    width: '100%',
    height: '100%',
  };
});
