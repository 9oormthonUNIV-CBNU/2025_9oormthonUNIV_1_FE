import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostListItem from '@/components/PostListItem';
import {useNavigation} from '@react-navigation/native';
import {postNavigations} from '@/constants';

type Post = {
  id: number;
  tags: string[];
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  views: number;
};

type PostListProps = {
  posts?: Post[];
};
const PostList: React.FC<PostListProps> = ({posts}) => {
  const navigation = useNavigation();
  console.log('posts:', posts);
  return (
    <SafeAreaView>
      {posts && posts.map(post => <PostListItem key={post.id} post={post} />)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    borderColor: colors.BLUE_400,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 12,
    color: colors.BLUE_400,
  },
  title: {
    color: '#333',
    marginVertical: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    maxHeight: 300,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    fontSize: 14,
    color: colors.GRAY_800,
  },
  statsContainer: {
    marginTop: 28,
    flexDirection: 'row',
    gap: 2,
  },
  stat: {
    fontSize: 14,
    color: '#555',
    marginRight: 16,
  },
});

export default PostList;
