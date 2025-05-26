import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '@/constants';

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

type PostListItemProps = {
  post: Post;
  onPress?: () => void;
};

const PostListItem: React.FC<PostListItemProps> = ({post, onPress}) => (
  <TouchableOpacity
    style={styles.postContainer}
    onPress={onPress}
    activeOpacity={0.8}>
    <View style={styles.titleContainer}>
      <View style={styles.tagsContainer}>
        {(post.tags ?? []).map(tag => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
      <Text style={styles.title}>{post.title}</Text>
    </View>
    <Text style={styles.content}>{post.content}</Text>
    <View style={styles.statsContainer}>
      <Text style={styles.stat}>👍 {post.likes}</Text>
      <Text style={styles.stat}>💬 {post.comments}</Text>
      <Text style={styles.stat}>👁️ {post.views}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  postContainer: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 8,
    padding: 16,
    backgroundColor: colors.WHITE,
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
    marginBottom: -4,
    fontSize: 12,
    color: colors.BLUE_400,
  },
  title: {
    color: colors.BLACK,
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
    color: colors.GRAY_600,
    marginRight: 16,
  },
});

export default PostListItem;
