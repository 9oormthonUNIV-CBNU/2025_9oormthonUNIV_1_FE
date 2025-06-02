import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants';
import CustomHeader from '@/components/CustomHeader';

function CalendarHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomHeader text="청마루" /> */}
      <View
        style={[
          styles.buttonContainer,
          {paddingVertical: 40, borderRadius: 20, marginTop: 180},
        ]}>
        <Image
          source={require('@/assets/profile.png')}
          style={{width: 100, height: 100, borderRadius: 50, marginBottom: 20}}
        />
        <Text style={styles.place}>서원구</Text>
        <Text style={styles.name}>충북대우왕이</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('');
          }}>
          <Text style={styles.buttonText}>나의 게시글</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: colors.GRAY_400,
            width: '100%',
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('');
          }}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  place: {
    fontSize: 16,
    color: colors.GRAY_800,
  },
  buttonContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: colors.WHITE,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button: {
    padding: 10,
    width: '80%',
  },
  buttonText: {
    fontSize: 15,
    color: colors.BLACK,
    marginHorizontal: 10,
    marginVertical: 4,
    textAlign: 'center',
  },
});

export default CalendarHomeScreen;
