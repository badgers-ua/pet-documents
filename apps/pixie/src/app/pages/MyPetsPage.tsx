import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
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

  const arr = [0, 0, 0, 0];
  const deviceWidth = Dimensions.get('window').width;

  const cardWidth = deviceWidth / 2.2;

  return (
    <View style={tw`flex-1 mt-2`}>
      <View style={tw`flex-row flex-wrap justify-center`}>
        {arr.map((_, i) => {
          return (
            <TouchableOpacity
              onPress={() => navigate('PetProfile' as any)}
              style={{
                ...tw`p-2`,
                ...{
                  width: cardWidth,
                  height: cardWidth,
                },
              }}
              key={i}
            >
              <PetCard style={tw`w-full h-full`} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
