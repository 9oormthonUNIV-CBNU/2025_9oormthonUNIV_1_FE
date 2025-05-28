import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
  Dimensions,
  View,
} from 'react-native';

import {colors} from '@/constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined' | 'kakao';
  size?: 'large' | 'medium';
  inValid?: boolean;
  onPress?: () => void;
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
      ]}
      {...props}>
      <View style={styles[size]}>
        <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inValid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: colors.GREEN,
  },
  outlined: {
    borderColor: colors.GREEN,
    borderWidth: 1,
  },
  kakao: {
    backgroundColor: colors.KAKAO_YELLOW,
  },
  filledPressed: {
    backgroundColor: colors.BLACK,
  },
  outlinedPressed: {
    borderColor: colors.GREEN,
    borderWidth: 1,
    opacity: 0.5,
  },
  kakaoPressed: {
    backgroundColor: colors.GRAY_200,
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 20 : 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {
    color: colors.BLACK,
  },
  outlinedText: {
    color: colors.GREEN,
  },
  kakaoText: {
    color: colors.BLACK,
  },
});

export default CustomButton;
