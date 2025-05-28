// navigations/stack/types.ts

export type MarkerType = {
  name?: string;
  address?: string;
  tags?: string[];
  hours?: string;
  capacity?: number;
  website?: string;
  describe?: string;
};

export type RootStackParamList = {
  MapInfoScreen: {
    marker: MarkerType;
  };
  // 다른 스크린도 여기에 추가할 수 있습니다.
  // HomeScreen: undefined;
  // DetailScreen: { id: string };
};
