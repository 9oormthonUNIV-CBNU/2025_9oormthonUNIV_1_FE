import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants';

function CalendarHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@/assets/profile.png')}
        style={{width: 150, height: 150, borderRadius: 50}}
      />
      <Text style={styles.name}>우왕이</Text>
      <Text style={styles.place}>서원구</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('');
        }}>
        <Text style={styles.buttonText}>나의 게시글</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('');
        }}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.BLACK,
    marginVertical: 12,
  },
  place: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 40,
    color: colors.BLUE_400,
  },
  button: {
    padding: 10,
    marginVertical: 4,
    borderColor: colors.GRAY_400,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: '80%',
  },
  buttonText: {
    fontSize: 16,
    color: colors.BLACK,
    textAlign: 'center',
  },
});

export default CalendarHomeScreen;
