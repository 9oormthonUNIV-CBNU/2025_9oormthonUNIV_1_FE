// MapHomeScreen.tsx

import React, {useRef, useEffect, useState, useMemo} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import MapView from 'react-native-maps';
import useAuth from '@/hooks/queries/useAuth';
import useUserLocation from '@/hooks/useUserLocation';
import {colors, mapNavigations, MarkerType} from '@/constants';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import GoogleMapView from '@/components/GoogleMapView';
import axiosInstance from '@/api/axiosInstance';
import {ScrollView, TouchableOpacity} from 'react-native';
import CustomHeader from '@/components/CustomHeader';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  const navigation = useNavigation<NavigationProp<MapStackParamList>>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();

  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 모든 태그 추출 (중복 제거)
  const allTags = useMemo(() => {
    const tags = markers.flatMap(m => m.tags ?? []);
    return Array.from(new Set(tags));
  }, [markers]);

  // 필터링된 마커
  const filteredMarkers = useMemo(() => {
    if (!selectedTag) return markers;
    return markers.filter(m => m.tags?.includes(selectedTag));
  }, [markers, selectedTag]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await axiosInstance.get('/api/places');
        if (Array.isArray(res.data)) {
          console.log('res', res.data);
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
        console.log('e', e);
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
    <View style={{flex: 1}}>
      <CustomHeader text="지도" />
      <GoogleMapView
        ref={mapRef}
        location={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        Markers={filteredMarkers}
        onMarkerPress={handleMarkerPress}
        style={{flex: 1}}
      />
      {/* 태그 필터 버튼 하단에 추가 */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterBtn, !selectedTag && styles.filterBtnSelected]}
            onPress={() => setSelectedTag(null)}>
            <Text style={styles.filterText}>전체</Text>
          </TouchableOpacity>
          {allTags.map(tag => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.filterBtn,
                selectedTag === tag && styles.filterBtnSelected,
              ]}
              onPress={() => setSelectedTag(tag)}>
              <Text style={styles.filterText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
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
  filterContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  filterBtnSelected: {
    backgroundColor: colors.BLUE_400,
  },
  filterText: {
    color: colors.BLACK,
    fontWeight: 'bold',
  },
});

export default MapHomeScreen;
