import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';

import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';
import MapHomeScreen from './src/screens/map/MapHomeScreen';
import MainBottomNavigator from './src/navigations/stack/MainStackNavigator';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <MapHomeScreen /> */}
      {/* <NavigationContainer>
        <RootNavigator />
      </NavigationContainer> */}
      <NavigationContainer>
        <MainBottomNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
