// MapHomeScreen.tsx

import React, {useRef, useEffect, useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';

import {useNavigation, NavigationProp} from '@react-navigation/native';
import useUserLocation from '@/hooks/useUserLocation';
import {colors, mapNavigations, MarkerType} from '@/constants';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import GoogleMapView from '@/components/GoogleMapView';
import axiosInstance from '@/api/axiosInstance';
import CustomHeader from '@/components/CustomHeader';
import iconApp from '@/assets/icons/app_icon_200.png';
import {tagIdsToNames} from '@/utils/tagMap';

function MapHomeScreen() {
  const navigation = useNavigation<NavigationProp<MapStackParamList>>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();

  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 모든 태그 추출 (중복 제거)
  const allTags = useMemo(() => {
    const tags = markers.flatMap(m => m.tags ?? []);
    return Array.from(new Set(tags));
  }, [markers]);

  // 필터링된 마커
  const filteredMarkers = useMemo(() => {
    if (selectedTags.length === 0) return markers;
    return markers.filter(m => m.tags?.some(tag => selectedTags.includes(tag)));
  }, [markers, selectedTags]);

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
              tags: tagIdsToNames(place.tagIds),
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

  const handleMarkerPress = (marker: MarkerType) => {
    navigation.navigate(mapNavigations.MAP_INFO, {placeId: marker.id});
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader text="청마루" iconSource={iconApp} />
      <GoogleMapView
        ref={mapRef}
        location={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        Markers={filteredMarkers}
        onMarkerPress={handleMarkerPress}
      />
      {/* 태그 필터 버튼 하단에 추가 */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* 전체 선택: 모두 해제 */}
          <TouchableOpacity
            style={[
              styles.filterBtn,
              selectedTags.length === 0 && styles.filterBtnSelected,
            ]}
            onPress={() => setSelectedTags([])}>
            <Text
              style={[
                styles.filterText,
                selectedTags.length === 0 && styles.filterTextSelected,
              ]}>
              #전체
            </Text>
          </TouchableOpacity>
          {allTags.map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.filterBtn,
                  isSelected && styles.filterBtnSelected,
                ]}
                onPress={() => {
                  if (isSelected) {
                    setSelectedTags(selectedTags.filter(t => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}>
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.filterTextSelected,
                  ]}>
                  #{tag}
                </Text>
              </TouchableOpacity>
            );
          })}
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
    bottom: 160,
    left: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.GRAY_200,
    marginHorizontal: 8,
  },
  filterBtnSelected: {
    backgroundColor: colors.BLUE_400,
  },
  filterText: {
    color: colors.GRAY_800,
    fontWeight: 'bold',
  },
  filterTextSelected: {
    color: colors.WHITE,
  },
});

export default MapHomeScreen;
