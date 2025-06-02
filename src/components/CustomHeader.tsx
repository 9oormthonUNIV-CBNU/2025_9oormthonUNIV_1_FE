import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors} from '@/constants';

type CustomHeaderProps = {
  text: string;
};

function CustomHeader({text}: CustomHeaderProps) {
  return (
    <View style={{width: '100%', height: 100, position: 'relative', zIndex: 1}}>
      {/* 배경 이미지 */}
      <Image
        source={require('@/assets/header.png')}
        style={{
          width: '100%',
          height: 100,
          resizeMode: 'cover',
          top: 0,
          left: 0,
        }}
      />
      <View style={[styles.textContainer, {zIndex: 2}]}>
        {/* <Image
        source={require('@/assets/icons/app_icon_200.png')}
        style={{
        width: 40,
        height: 40,
        marginRight: 12,
        resizeMode: 'contain',
        }}
      /> */}
        <Text style={styles.h1}>청마루</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    right: 24,
    top: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
});

export default CustomHeader;
