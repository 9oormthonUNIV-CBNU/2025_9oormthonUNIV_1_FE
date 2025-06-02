// GoogleMapView.tsx

import React, {forwardRef} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import {MarkerType, colors} from '@/constants';

type Props = {
  location: {latitude: number; longitude: number};
  Markers?: MarkerType[];
  onMarkerPress?: (marker: MarkerType) => void;
  style?: ViewStyle;
};

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{color: '#e6f2e6'}],
  },
  {
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{color: '#4d774e'}],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{color: '#f0f9f0'}],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{color: '#a2cfa2'}],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#cdeacc'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#a8d5a2'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#3e6e3e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#ffffff'}],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#d7f0d7'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#b2e0b2'}],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{color: '#eaf7ea'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#d5efd5'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#bde0bd'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#3a6b3a'}],
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
        style={[styles.container, style]}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        region={region}
        customMapStyle={mapStyle}>
        {Markers?.map((coord, idx) => (
          <Marker
            key={idx}
            coordinate={{latitude: coord.latitude, longitude: coord.longitude}}
            image={require('@/assets/icons/map_marker.png')}
            onPress={() => onMarkerPress?.(coord)}
          />
        ))}
      </MapView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default GoogleMapView;
