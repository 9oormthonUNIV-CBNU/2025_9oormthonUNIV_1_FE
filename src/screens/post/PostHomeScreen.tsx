import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PostList from '@/components/PostList';
import {colors} from '@/constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostListItem from '@/components/PostListItem';
import {postNavigations} from '@/constants';
import {useNavigation} from '@react-navigation/native';

const posts = [
  {
    id: 1,
    tags: ['공부'],
    title: '충북대생 모여라~',
    content: '학교 근처에서 스터디 할 인원 구합니다. 최대...',
    imageUrl: undefined,
    likes: 10,
    comments: 10,
    views: 10,
  },
  {
    id: 2,
    tags: ['공부'],
    title: '충북대생 모여라~',
    content: '학교 근처에서 스터디 할 인원 구합니다. 최대...',
    imageUrl: undefined,
    likes: 10,
    comments: 10,
    views: 10,
  },
];

function FeedHomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/icons/post_active.png')}
          style={{
            width: 32,
            height: 32,
            marginRight: 16,
            marginBottom: -6,
            resizeMode: 'contain',
            alignItems: 'center',
          }}
        />
        <Text style={styles.h1}>게시글</Text>
      </View>
      <View style={{gap: 0}}>
        {posts.map(post => (
          <PostListItem
            key={post.id}
            post={post}
            onPress={() =>
              navigation.navigate(postNavigations.POST_PAGE, {postId: post.id})
            }
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, gap: 40, backgroundColor: colors.GRAY_200},
  header: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    paddingHorizontal: 24,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
    textAlignVertical: 'center',
  },
});

export default FeedHomeScreen;
