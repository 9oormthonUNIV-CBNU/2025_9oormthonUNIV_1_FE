import React from 'react';
import MainBottomNavigator from '../stack/RootStackNavigator.js';
import AuthStackNavigator from '../stack/AuthStackNavigator.js';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const {isLogin} = useAuth();

  return <>{isLogin ? <MainBottomNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
