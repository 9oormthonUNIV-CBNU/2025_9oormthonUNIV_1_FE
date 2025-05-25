import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import CustomButton from '@/components/CustomButton';

function AuthLocationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>위치인증하기</Text>
        <Text>청마루 이용을 위해서는 청주시 위치 인증이 필요해요</Text>
      </View>
      <View style={styles.mapContainer}>
        <View style={styles.map} />
        <View style={styles.locContainer}>
          <Text style={styles.h3}>현재 나의 위치는 </Text>
          <Text style={styles.locText}>“청주시 서원구”</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          label="위치 인증하기"
          onPress={() => {
            // Handle location authentication logic here
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
    gap: 60,
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
    flex: 1,
    gap: 10,
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
    backgroundColor: colors.GRAY_200,
    alignSelf: 'stretch',
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
});

export default AuthLocationScreen;
