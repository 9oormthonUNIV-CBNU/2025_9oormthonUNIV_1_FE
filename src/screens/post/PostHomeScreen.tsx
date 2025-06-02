import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, postNavigations} from '@/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostListItem from '@/components/PostListItem';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axiosInstance from '@/api/axiosInstance';
import {Post} from '@/constants/types';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '@/components/CustomHeader';
import iconApp from '@/assets/icons/post_active.png';

function mapBackendPostToPost(backendPost: any): Post {
  return {
    id: backendPost.id,
    title: backendPost.title,
    content: backendPost.content,
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
            console.log('게시글 전체 조회 성공:', res.data.response);
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
      <CustomHeader
        text="게시판"
        iconSource={iconApp}
        iconSize={{width: 24, height: 24}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 150,
          paddingHorizontal: 8,
          // borderTopWidth: 2,
          // borderTopColor: colors.GRAY_400,
        }}>
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
  container: {flex: 1, backgroundColor: colors.GRAY_200},
  fab: {
    position: 'absolute',
    bottom: 150,
    right: 30,
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    backgroundColor: colors.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default PostHomeScreen;
