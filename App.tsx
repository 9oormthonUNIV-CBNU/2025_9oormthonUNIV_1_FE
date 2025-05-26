import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';

import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';
import MapHomeScreen from './src/screens/map/MapHomeScreen';
import MainBottomNavigator from './src/navigations/stack/RootStackNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostList from '@/components/PostList';
import PostHomeScreen from '@/screens/post/PostHomeScreen';
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainBottomNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
