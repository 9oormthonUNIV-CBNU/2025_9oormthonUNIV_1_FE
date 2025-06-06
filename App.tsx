import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import RootStackNavigator from '@/navigations/stack/RootStackNavigator'; //auth이후
import RootNavigator from '@/navigations/root/RootNavigator'; //auth부터
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';

import KakaoLoginButton from '@/components/KakaoLoginButton';
import {AuthProvider} from '@/contexts/AuthContext';
import CustomHeader from '@/components/CustomHeader';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
