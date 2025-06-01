import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, postNavigations} from '@/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostListItem from '@/components/PostListItem';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axiosInstance from '@/api/axiosInstance';
import {Post} from '@/constants/types';
import {ScrollView} from 'react-native-gesture-handler';

function mapBackendPostToPost(backendPost: any): Post {
  return {
    id: backendPost.id,
    title: backendPost.title,
    content: '...자세히보기', // 백엔드에 content가 없으므로 빈 문자열
    tags: backendPost.category ? [backendPost.category] : [],
    imageUrl: '', // 필요시 매핑
    likes: backendPost.likeCount,
    comments: backendPost.commentCount,
    views: backendPost.viewCount,
    // author, category, createdAt 등 필요시 타입/컴포넌트에 추가
  };
}

function PostHomeScreen() {
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPosts = async () => {
        try {
          const res = await axiosInstance.get('/api/posts');
          if (res.data.success) {
            console.log('게시글 불러오기 성공:', res.data.response);
            setPosts(res.data.response.map(mapBackendPostToPost));
          } else {
            console.log('게시글 불러오기 실패:', res.data.error?.message);
          }
        } catch (error) {
          console.error('게시글 불러오기 에러:', error);
        }
      };
      fetchPosts();
    }, []),
  );

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
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.map(post => (
          <PostListItem
            key={post.id}
            post={post}
            onPress={() =>
              navigation.navigate(postNavigations.POST_PAGE, {postId: post.id})
            }
          />
        ))}
      </ScrollView>
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

export default PostHomeScreen;
