import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import {colors} from '@/constants';

type CustomHeaderProps = {
  text: string;
  iconSource?: ImageSourcePropType;
  iconSize?: {width: number; height: number}; // 추가: 아이콘 크기 props
};

function CustomHeader({text, iconSource, iconSize}: CustomHeaderProps) {
  return (
    <View
      style={{
        width: '100%',
        height: 20,
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 1,
      }}>
      {/* 배경 이미지 */}
      <Image
        source={require('@/assets/header.png')}
        style={{
          width: '100%',
          height: 100,
          resizeMode: 'cover',
          top: 10,
          left: 0,
        }}
      />
      <View style={[styles.textContainer, {zIndex: 2}]}>
        {iconSource && (
          <Image
            source={iconSource}
            style={{
              width: iconSize?.width ?? 40,
              height: iconSize?.height ?? 40,
              marginRight: 14,
              marginBottom: -4,
              resizeMode: 'contain',
              tintColor: 'gray',
            }}
          />
        )}
        <Text style={styles.h1}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    right: 28,
    top: 24,
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
