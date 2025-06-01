// navigations/stack/types.ts

import {mapNavigations} from './navigations';

export type MarkerType = {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
  tags?: string[];
  hours?: string;
  capacity?: number | string;
  website?: string;
  describe?: string;
};

export type RootStackParamList = {
  [mapNavigations.MAP_INFO]: {
    marker: MarkerType;
  };
  // 다른 스크린도 여기에 추가할 수 있습니다.
  // HomeScreen: undefined;
  // DetailScreen: { id: string };
};

export type Post = {
  id: string | number;
  title: string;
  content: string;
  tags?: string[];
  imageUrl?: string;
  likes: number;
  comments: number;
  views: number;
};

export type PostListItemProps = {
  post: Post;
  onPress?: () => void;
};
