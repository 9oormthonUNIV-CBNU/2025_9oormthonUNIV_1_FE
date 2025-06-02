// GoogleMapView.tsx

import React, {forwardRef} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import {MarkerType, colors} from '@/constants';
let markerImage = require('@/assets/icons/marker_shareoffice_v2.png');

type Props = {
  location: {latitude: number; longitude: number};
  Markers?: MarkerType[];
  onMarkerPress?: (marker: MarkerType) => void;
  style?: ViewStyle;
};

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{color: '#e3f2d3'}], // 전체 바탕: 밝은 연두
  },
  {
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{color: '#3e703b'}], // 텍스트: 진한 녹색
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{color: '#ffffff'}], // 텍스트 테두리: 흰색
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{color: '#cce8b5'}], // 구역 경계: 연녹색
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#d9f0c2'}], // 주요 지점 배경: 연한 초록
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#c2e6b4'}], // 공원: 밝은 연두
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#4b7d35'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#ffffff'}], // 도로 바탕: 흰색
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#e4f4d5'}], // 주요 도로: 아주 연한 연두
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#cbe6a8'}],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{color: '#f6fbef'}], // 거의 흰 연두
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#bddf9f'}],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [{color: '#d0efbc'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#e6f6cd'}], // 교통: 흐린 연두
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#d4f1e2'}], // 물: 연한 민트 계열
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#4e8c2b'}],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{color: '#5a5a5a'}],
  },
];

const GoogleMapView = forwardRef<MapView, Props>(
  ({location, Markers, onMarkerPress, style}, ref) => {
    const region: Region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    return (
      <MapView
        ref={ref}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        region={region}
        customMapStyle={mapStyle}
        style={[style, styles.container]}>
        {Markers?.map((coord, idx) => {
          console.log('coord:', coord);
          let markerImg = markerImage;
          const tagImageMap: {[key: string]: any} = {
            공유오피스: require('@/assets/marker_imgs/공유오피스.png'),
            도서관: require('@/assets/marker_imgs/도서관.png'),
            스터디카페: require('@/assets/marker_imgs/스터디카페.png'),
            청년지원기관: require('@/assets/marker_imgs/청년지원기관.png'),
            창업지원: require('@/assets/marker_imgs/창업지원.png'),
            취업지원: require('@/assets/marker_imgs/취업지원.png'),
            문화공간: require('@/assets/marker_imgs/문화공간.png'),
          };

          if (coord.tags) {
            for (const tag of coord.tags) {
              const found = Object.keys(tagImageMap).find(key =>
                tag.includes(key),
              );
              if (found) {
                markerImg = tagImageMap[found];
                break;
              }
            }
          }

          return (
            <Marker
              key={idx}
              coordinate={{
                latitude: coord.latitude,
                longitude: coord.longitude,
              }}
              image={markerImg}
              onPress={() => onMarkerPress?.(coord)}
            />
          );
        })}
      </MapView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GoogleMapView;
