import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapInfoScreen from '@/screens/map/MapInfoScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {mapNavigations} from '@/constants';

export type MapStackParamList = {
  [mapNavigations.MAP_INFO]: undefined;
  [mapNavigations.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={mapNavigations.MAP_INFO}
        component={MapInfoScreen}
        options={{headerShown: true, title: ' '}}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
