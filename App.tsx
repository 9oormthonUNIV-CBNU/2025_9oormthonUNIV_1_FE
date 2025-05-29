import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import RootStackNavigator from '@/navigations/stack/RootStackNavigator'; //auth이후후
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import AuthLocationScreen from '@/screens/auth/AuthLocationScreen';
import RootNavigator from '@/navigations/root/RootNavigator'; //auth부터터

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
