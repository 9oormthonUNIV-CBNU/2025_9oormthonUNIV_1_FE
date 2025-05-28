// screens/MapInfoScreen.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '@/constants';
import {colors} from '@/constants';

type MapInfoScreenRouteProp = RouteProp<RootStackParamList, 'MapInfoScreen'>;

const MapInfoScreen: React.FC = () => {
  const route = useRoute<MapInfoScreenRouteProp>();
  const marker = route.params?.marker;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{marker?.name || '장소명 미지정'}</Text>
        <Text style={styles.address}>
          {marker?.address || '주소 정보 없음'}
        </Text>
      </View>

      <View style={styles.tagsContainer}>
        {(marker.tags ?? []).map(tag => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>

      <View style={styles.infoWrapper}>
        {[
          {
            key: 'time',
            label: '이용시간',
            value: marker?.hours || '주소 정보 없음',
          },
          {
            key: 'capacity',
            label: '수용인원',
            value: marker?.capacity || '주소 정보 없음',
          },
          {
            key: 'website',
            label: '웹사이트',
            value: marker?.website || null,
          },
        ].map((item, index, arr) => (
          <View
            key={item.key}
            style={[
              styles.infoContainer,
              index === arr.length - 1 && {
                borderBottomWidth: 1,
                borderColor: colors.GRAY_400,
              },
            ]}>
            <Image
              style={styles.iconimage}
              source={require('@/assets/icons/time.png')}
            />
            <Text style={styles.label}>{item.label}</Text>

            {item.key === 'website' ? (
              item.value ? (
                <TouchableOpacity onPress={() => Linking.openURL(item.value)}>
                  <Text style={[styles.value, styles.link]}>{item.value}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.value}>웹사이트 정보 없음</Text>
              )
            ) : (
              <Text style={styles.value}>{item.value}</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.desContainer}>
        <Text style={styles.value}>{marker?.describe || '설명 정보 없음'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 60,
    backgroundColor: colors.WHITE,
    gap: 50,
  },
  header: {
    gap: 10,
  },
  name: {
    fontSize: 24,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: colors.GRAY_800,
    marginBottom: 10,
  },

  tagsContainer: {flexDirection: 'row'},
  tag: {
    fontSize: 12,
    borderBottomWidth: 0.8,
    color: colors.BLUE_400,
    borderColor: colors.BLUE_400,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 8,
  },

  infoWrapper: {
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: colors.GRAY_400,
    paddingVertical: 10,
  },
  iconimage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: -4,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.BLACK,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.BLACK,
  },
  link: {
    color: colors.BLUE_400,
    textDecorationLine: 'underline',
  },

  desContainer: {
    backgroundColor: colors.GRAY_200,
    padding: 20,
    borderRadius: 20,
  },
});

export default MapInfoScreen;
