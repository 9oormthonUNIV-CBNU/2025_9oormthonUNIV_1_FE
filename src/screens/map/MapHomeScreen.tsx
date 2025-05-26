// MapHomeScreen.tsx

import React, {useRef} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import useAuth from '@/hooks/queries/useAuth';
import useUserLocation from '@/hooks/useCurrentLocation';
import {colors} from '@/constants/colors';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {mapNavigations} from '@/constants';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';

// 예시마커
const coordinates = [
  {
    latitude: 37.5765,
    longitude: 126.978,
    name: 'Marker 1',
    address: 'Address 1',
    tags: ['tag1', 'tag2'],
    hours: '9:00-18:00',
    capacity: 10,
    website: 'https://example1.com',
  },
  {
    latitude: 37.5615,
    longitude: 126.958,
    name: 'Marker 2',
    address: 'Address 2',
    tags: ['tag3', 'tag4'],
    hours: '10:00-19:00',
    capacity: 20,
    website: 'https://example2.com',
  },
  {
    latitude: 37.5665,
    longitude: 127,
    name: 'Marker 3',
    address: 'Address 3',
    tags: ['tag5', 'tag6'],
    hours: '8:00-17:00',
    capacity: 15,
    website: 'https://example3.com',
  },
];

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const {logoutMutation} = useAuth();
  const navigation = useNavigation<NavigationProp<MapStackParamList>>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError || !userLocation) {
      // 에러메세지를 표시하기
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <>
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
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        initialRegion={
          userLocation
            ? {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : undefined
        }>
        {coordinates.map((coord, idx) => (
          <Marker
            key={idx}
            coordinate={{
              latitude: coord.latitude,
              longitude: coord.longitude,
            }}
            image={require('@/assets/icons/map_marker.png')}
            onPress={() =>
              navigation.navigate(mapNavigations.MAP_INFO, {marker: coord})
            }
          />
        ))}
      </MapView>
    </>
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
