import React, {useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants';
import CustomButton from '@/components/CustomButton';
import MapView from 'react-native-maps';
import GoogleMapView from '@/components/GoogleMapView';
import axios from 'axios';
import useUserLocation from '@/hooks/useUserLocation';
import axiosInstance from '@/api/axiosInstance';
import {useAuthContext} from '@/contexts/AuthContext';

function AuthLocationScreen() {
  const {setIsLogin} = useAuthContext(true);
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
            try {
              // 1. GET으로 위치 인증 여부 확인
              const checkRes = await axiosInstance.get(
                '/api/location/certified',
              );

              // 200 OK이면 이미 인증된 것으로 처리
              if (checkRes.status === 200) {
                console.log('위치 인증 완료');
                setIsLogin(true);
                return;
              }

              if (
                userLocation &&
                userLocation.latitude &&
                userLocation.longitude
              ) {
                console.log(
                  '현재 위경도:',
                  userLocation.latitude,
                  userLocation.longitude,
                );
              } else {
                console.log('userLocation is not available:', userLocation);
              }

              // 2. POST로 위경도 전송하여 위치 인증 시도
              const response = await axiosInstance.post(
                '/api/location/certify',
                {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                },
              );

              if (response.data.success) {
                alert('위치 인증 성공!');
              }
            } catch (error: any) {
              if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                  alert('접근 권한이 없습니다.');
                  console.log('error', error);
                } else if (error.response?.status === 403) {
                  alert('청주 지역이 아닙니다.');
                  console.log('error', error);
                } else if (error.response?.status === 404) {
                  alert('위치 인증 API를 찾을 수 없습니다.');
                  console.log('error', error);
                }
                console.error('Unknown error:', error);
              }
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
