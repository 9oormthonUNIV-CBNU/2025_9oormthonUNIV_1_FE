// MapHomeScreen.tsx

import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import MapView from 'react-native-maps';
import useAuth from '@/hooks/queries/useAuth';
import useUserLocation from '@/hooks/useUserLocation';
import {colors, mapNavigations, MarkerType} from '@/constants';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import GoogleMapView from '@/components/GoogleMapView';
import axiosInstance from '@/api/axiosInstance';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  const navigation = useNavigation<NavigationProp<MapStackParamList>>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();

  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await axiosInstance.get('/api/places');
        if (Array.isArray(res.data)) {
          setMarkers(
            res.data.map((place: any) => ({
              id: place.id, // 반드시 포함!
              latitude: place.latitude,
              longitude: place.longitude,
              name: place.name,
              address: place.address,
              tags: place.tags,
              hours: place.hours,
              capacity: place.capacity,
              website: place.website,
              describe: place.description,
            })),
          );
        }
      } catch (e) {
        // 에러 처리
      }
    };
    fetchMarkers();
  }, []);

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

  const handleMarkerPress = (marker: MarkerType) => {
    navigation.navigate(mapNavigations.MAP_INFO, {placeId: marker.id});
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
      <GoogleMapView
        ref={mapRef}
        location={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        Markers={markers}
        onMarkerPress={handleMarkerPress}
      />
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
