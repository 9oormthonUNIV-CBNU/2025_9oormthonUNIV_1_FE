import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from '../tab/MainTabNavigator';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
