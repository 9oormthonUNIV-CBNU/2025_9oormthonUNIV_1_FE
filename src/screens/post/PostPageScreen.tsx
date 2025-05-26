import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Post 타입 정의
type Post = {
  id: string | number;
  title: string;
  content: string;
  tags?: string[];
  imageUrl?: string;
  likes: number;
  comments: number;
  views: number;
};

// 예시 posts 데이터 (실제 앱에서는 서버에서 받아오거나 context로 관리)
const posts: Post[] = [
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

// 네비게이션 param 타입 정의
type PostPageScreenRouteProp = RouteProp<
  {PostPage: {postId: number}},
  'PostPage'
>;

function PostPageScreen() {
  const route = useRoute<PostPageScreenRouteProp>();
  const {postId} = route.params;

  // postId로 해당 게시글 찾기
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>게시글을 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.tagsContainer}>
            {(post.tags ?? []).map(tag => (
              <Text key={tag} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
        {post.imageUrl && (
          <Image source={{uri: post.imageUrl}} style={styles.image} />
        )}
        <Text style={styles.content}>{post.content}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stat}>👍 {post.likes}</Text>
          <Text style={styles.stat}>💬 {post.comments}</Text>
          <Text style={styles.stat}>👁️ {post.views}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {margin: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 8},
  tagsContainer: {flexDirection: 'row', marginBottom: 8},
  tag: {
    borderColor: '#2196f3',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 12,
    color: '#2196f3',
    marginRight: 6,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {fontSize: 16, color: '#333', margin: 20},
  statsContainer: {flexDirection: 'row', marginLeft: 20, marginTop: 12},
  stat: {fontSize: 14, color: '#555', marginRight: 16},
});

export default PostPageScreen;
