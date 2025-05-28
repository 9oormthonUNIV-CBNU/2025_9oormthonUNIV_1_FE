import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import RootStackNavigator from '@/navigations/stack/RootStackNavigator';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';

function App() {
  return (
    // <Text>test</Text>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
