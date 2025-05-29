import React, {useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import CustomButton from '@/components/CustomButton';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import MapView from 'react-native-maps';
import GoogleMapView from '@/components/GoogleMapView';
import axios from 'axios';
import useUserLocation from '@/hooks/useUserLocation';

function AuthLocationScreen() {
  const {userLocation, isUserLocationError} = useUserLocation();
  const mapRef = useRef<MapView | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>위치인증하기</Text>
        <Text>청마루 이용을 위해서는 청주시 위치 인증이 필요해요</Text>
      </View>
      {isUserLocationError && (
        <Text style={styles.errorText}>
          ⚠️ 위치 정보를 가져오는 데 실패했습니다. 설정에서 위치 권한을
          허용했는지 확인해주세요.
        </Text>
      )}
      <View style={styles.mapContainer}>
        <GoogleMapView
          ref={mapRef}
          location={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        />
        <View style={styles.locContainer}>
          <Text style={styles.h3}>현재 나의 위치는 </Text>
          <Text style={styles.locText}>“청주시 서원구”</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          label="위치 인증하기"
          onPress={async () => {
            console.log('✅ 현재 사용자 위치:', {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            });

            try {
              const response = await axios.post(
                'https://your-api.com/api/auth/location',
                {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                },
              );

              console.log('위치 인증 성공:', response.data);
            } catch (error) {
              console.error('위치 인증 실패:', error);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    justifyContent: 'center',
    gap: 80,
  },
  header: {
    gap: 12,
    marginHorizontal: 24,
  },
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.BLACK,
  },
  h2: {
    fontSize: 14,
    color: colors.GRAY_400,
  },
  mapContainer: {
    gap: 10,
    justifyContent: 'center',
    height: '50%',
  },
  buttonContainer: {
    marginHorizontal: 24,
  },
  locContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  h3: {
    fontSize: 12,
    color: colors.GRAY_800,
  },
  locText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.BLACK,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default AuthLocationScreen;
