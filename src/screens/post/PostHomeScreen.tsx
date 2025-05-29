import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, postNavigations} from '@/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostListItem from '@/components/PostListItem';
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
    title: '충북대생 모여라~2',
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
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate(postNavigations.POST_CREATE)}>
        <Image
          source={require('@/assets/icons/plus.png')}
          style={styles.image}
        />
      </TouchableOpacity>
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
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    backgroundColor: colors.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default FeedHomeScreen;
