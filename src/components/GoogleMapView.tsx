import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';

type Props = {
  location: {
    latitude: number;
    longitude: number;
  };
};

function GoogleMapView({location}: Props) {
  const region: Region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <MapView
      style={styles.container}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      followsUserLocation
      showsMyLocationButton={false}
      region={region}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GoogleMapView;
