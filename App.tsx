import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import RootStackNavigator from '@/navigations/stack/RootStackNavigator';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import AuthLocationScreen from '@/screens/auth/AuthLocationScreen';
import RootNavigator from '@/navigations/root/RootNavigator';

function App() {
  return (
    // <Text>asdfadsftest</Text>
    // <AuthLocationScreen />
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
