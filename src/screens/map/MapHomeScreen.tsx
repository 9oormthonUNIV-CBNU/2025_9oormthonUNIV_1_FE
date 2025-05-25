import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import useAuth from '@/hooks/queries/useAuth';
import {tapGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler';
import GoogleMapView from '@/components/GoogleMapView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/icons/app_icon_200.png')}
          style={{
            width: 40,
            height: 40,
            marginRight: 12,
            resizeMode: 'contain',
          }}
        />
        <Text style={styles.h1}>청마루</Text>
      </View>

      <GoogleMapView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    paddingHorizontal: 24,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
});

export default MapHomeScreen;
