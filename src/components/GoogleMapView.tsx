// GoogleMapView.tsx

import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import {MarkerType} from '@/constants';

type Props = {
  location: {latitude: number; longitude: number};
  Markers: MarkerType[];
  onMarkerPress?: (marker: MarkerType) => void;
};

const GoogleMapView = forwardRef<MapView, Props>(
  ({location, Markers, onMarkerPress}, ref) => {
    const region: Region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    return (
      <MapView
        ref={ref}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        region={region}>
        {Markers.map((coord, idx) => (
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
    flex: 1,
  },
});

export default GoogleMapView;
