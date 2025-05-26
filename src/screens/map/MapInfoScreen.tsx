// screens/MapInfoScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '@/navigations/stack/types'; // 네비게이션 타입 정의 파일

type MapInfoScreenRouteProp = RouteProp<RootStackParamList, 'MapInfoScreen'>;

const MapInfoScreen: React.FC = () => {
  const route = useRoute<MapInfoScreenRouteProp>();
  const marker = route.params?.marker;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{marker?.name || '장소명 미지정'}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>주소</Text>
        <Text style={styles.value}>{marker?.address || '주소 정보 없음'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>태그</Text>
        <Text style={styles.value}>
          {marker?.tags?.join(', ') || '태그 없음'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>이용시간</Text>
        <Text style={styles.value}>{marker?.hours || '이용시간 정보 없음'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>수용 인원</Text>
        <Text style={styles.value}>
          {marker?.capacity ? `${marker.capacity}명` : '정보 없음'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>웹사이트</Text>
        {marker?.website ? (
          <TouchableOpacity onPress={() => Linking.openURL(marker.website)}>
            <Text style={[styles.value, styles.link]}>{marker.website}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.value}>웹사이트 정보 없음</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});

export default MapInfoScreen;
