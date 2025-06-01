import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/CustomButton';
import {authNaviagtions} from '@/constants';
import KakaoLoginButton from '@/components/KakaoLoginButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNaviagtions.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.appName}>청마루</Text>
      </View>
      <View style={styles.buttonContainer}>
        <KakaoLoginButton />
        {/* <CustomButton
          variant="kakao"
          label="카카오톡으로 로그인하기"
          onPress={() => navigation.navigate(authNaviagtions.AUTH_LOC)}
        /> */}
        {/* <CustomButton
          label="회원가입하기"
          variant="outlined"
          onPress={() => navigation.navigate(authNaviagtions.SIGNUP)}
        /> */}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  appName: {
    color: '#222222',
    fontSize: 38,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default AuthHomeScreen;
