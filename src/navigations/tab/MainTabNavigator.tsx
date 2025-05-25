import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import PostHomeScreen from '@/screens/post/PostHomeScreen';
import MyPageScreen from '@/screens/mypage/MyPageScreen';
import {colors} from '@/constants/colors';

const Tab = createBottomTabNavigator();
const TAB_ICON_SIZE = 32; // 아이콘 크기 설정
const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    paddingVertical: 16,
    height: '12%',
    backgroundColor: colors.WHITE,
    elevation: 0,
  },
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
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Map"
        component={MapHomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('@/assets/icons/map_active.png')
                  : require('@/assets/icons/map.png')
              }
              style={{width: TAB_ICON_SIZE, height: TAB_ICON_SIZE}}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="post"
        component={PostHomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('@/assets/icons/post_active.png')
                  : require('@/assets/icons/post.png')
              }
              style={{width: TAB_ICON_SIZE, height: TAB_ICON_SIZE}}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="mypage"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('@/assets/icons/mypage_active.png')
                  : require('@/assets/icons/mypage.png')
              }
              style={{width: TAB_ICON_SIZE, height: TAB_ICON_SIZE}}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
