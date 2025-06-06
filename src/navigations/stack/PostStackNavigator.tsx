import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PostHomeScreen from '@/screens/post/PostHomeScreen';
import PostPageScreen from '@/screens/post/PostPageScreen';
import PostCreateScreen from '@/screens/post/PostCreateScreen';
import {postNavigations} from '@/constants';

export type PostStackParamList = {
  [postNavigations.POST_HOME]: undefined;
  [postNavigations.POST_PAGE]: undefined;
  [postNavigations.POST_CREATE]: undefined;
};

const Stack = createStackNavigator<PostStackParamList>();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={postNavigations.POST_HOME}
        component={PostHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={postNavigations.POST_PAGE}
        component={PostPageScreen}
        options={{
          headerShown: true,
          title: ' ',
        }}
      />
      <Stack.Screen
        name={postNavigations.POST_CREATE}
        component={PostCreateScreen}
        options={{headerShown: true, title: ' '}}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
