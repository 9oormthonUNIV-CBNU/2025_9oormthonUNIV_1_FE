import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import AuthLocationScreen from '@/screens/auth/AuthLocationScreen';
import {authNaviagtions} from '@/constants';

export type AuthStackParamList = {
  [authNaviagtions.AUTH_HOME]: undefined;
  [authNaviagtions.AUTH_LOC]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          shadowColor: 'gray',
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={authNaviagtions.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNaviagtions.AUTH_LOC}
        component={AuthLocationScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
