import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNaviagtions, colors} from '@/constants';
import KakaoLoginButton from '@/components/KakaoLoginButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNaviagtions.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <LinearGradient
      colors={['#E2F994', '#C4F044', '#9DE806']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <Image
        source={require('@/assets/icons/app_icon_800.png')}
        style={{width: 180, height: undefined, aspectRatio: 180 / 70}}
        resizeMode="contain"
      />
      <Image
        source={require('@/assets/청마루.png')}
        style={{
          width: 100,
          height: undefined,
          aspectRatio: 2,
          marginBottom: 10,
        }}
        resizeMode="contain"
      />
      {/* <Text style={styles.appName}>청마루</Text> */}
      <Text style={styles.subtitle}>청주 시민들을 위한 커뮤니티</Text>
      <View style={styles.buttonContainer}>
        <KakaoLoginButton />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  appName: {
    fontFamily: 'SOYOMapleBold',
    color: '#222222',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'SOYO MAPLE',
    color: '#222222',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 120,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.WHITE,
    width: '100%',
    height: '20%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    paddingHorizontal: 20,
    paddingVertical: 28,
  },
});

export default AuthHomeScreen;
