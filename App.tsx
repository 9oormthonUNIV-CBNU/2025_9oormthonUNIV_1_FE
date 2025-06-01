import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import RootStackNavigator from '@/navigations/stack/RootStackNavigator'; //auth이후
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import AuthLocationScreen from '@/screens/auth/AuthLocationScreen';
import RootNavigator from '@/navigations/root/RootNavigator'; //auth부터
import KakaoLoginButton from '@/components/KakaoLoginButton';
import {AuthProvider} from '@/contexts/AuthContext';

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
  // return (
  //   <SafeAreaView style={{flex: 1}}>
  //     {/* 앱 시작 시 액세스 토큰 유효성 검사 */}
  //     {/* <RefreshTokenCheck /> */}

  //     {/* 사용자 로그인 UI */}
  //     <KakaoLoginButton />
  //   </SafeAreaView>
  // );
  // return <AuthLocationScreen />;
}

export default App;
