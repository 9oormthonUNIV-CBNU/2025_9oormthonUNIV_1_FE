export type MarkerType = {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
  tags?: string[];
  hours?: string;
  capacity?: number;
  website?: string;
};

export type RootStackParamList = {
  MapHomeScreen: undefined;
  MapInfoScreen: {marker: MarkerType};
};
