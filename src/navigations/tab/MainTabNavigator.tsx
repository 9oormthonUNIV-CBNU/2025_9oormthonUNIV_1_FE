import React from 'react';
import {Image, View, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import PostHomeScreen from '@/screens/post/PostHomeScreen';
import MyPageScreen from '@/screens/mypage/MyPageScreen';
import {colors} from '@/constants/colors';
import MapStackNavigator from '../stack/MapStackNavigator';
import PostStackNavigator from '../stack/PostStackNavigator';

const Tab = createBottomTabNavigator();
const TAB_ICON_SIZE = 32;

import {Dimensions} from 'react-native';

const TAB_BAR_HEIGHT = Dimensions.get('window').height * 0.16;

export const TAB_BAR_STYLE = {
  paddingHorizontal: 20,
  paddingVertical: 20,
  width: Dimensions.get('window').width,
  height: TAB_BAR_HEIGHT,
  backgroundColor: colors.WHITE,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: 'visible' as 'visible',
  position: 'absolute' as 'absolute',
};

export const MAIN_TAB_SCREEN_OPTIONS = {
  headerShown: false,
  tabBarStyle: TAB_BAR_STYLE,
  tabBarIconStyle: {
    flex: 1,
  },
  tabBarLabelStyle: {
    flex: 1,
    fontSize: 12,
    color: colors.BLACK,
  },
};

function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={MAIN_TAB_SCREEN_OPTIONS}>
      <Tab.Screen
        name="홈"
        component={MapStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('@/assets/icons/map_active.png')
                  : require('@/assets/icons/map.png')
              }
              style={{
                width: TAB_ICON_SIZE,
                height: TAB_ICON_SIZE,
                // ...(focused && {tintColor: colors.BLACK}), // focused일 때만 tintColor 적용
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="게시판"
        component={PostStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('@/assets/icons/post_active.png')
                  : require('@/assets/icons/post.png')
              }
              style={{
                width: TAB_ICON_SIZE,
                height: TAB_ICON_SIZE,
                // ...(focused && {tintColor: colors.BLACK}), // focused일 때만 tintColor 적용
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="MY"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('@/assets/icons/mypage_active.png')
                  : require('@/assets/icons/mypage.png')
              }
              style={{
                width: TAB_ICON_SIZE,
                height: TAB_ICON_SIZE,
                // ...(focused && {tintColor: colors.BLACK}), // focused일 때만 tintColor 적용
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
