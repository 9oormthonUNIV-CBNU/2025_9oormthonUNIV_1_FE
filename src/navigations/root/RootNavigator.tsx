import React from 'react';
import RootStackNavigator from '@/navigations/stack/RootStackNavigator';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import {useAuthContext} from '@/contexts/AuthContext';

function RootNavigator() {
  const {isLogin} = useAuthContext(true);
  console.log('isLogin:', isLogin);

  // if (isLoading) {
  //   return <LoadingSpinner />; // 로딩 컴포넌트 보여주기
  // }

  return <>{isLogin ? <RootStackNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
RootNavigator;
