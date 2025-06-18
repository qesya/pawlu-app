import { StyleProp, ViewStyle } from "react-native";

export type ProductImageDetailsMedia = {
  id: string | number;
  src: string;
};

export type ProductImageDetailsProps = {
  media: ProductImageDetailsMedia[];
  style?: StyleProp<ViewStyle>;
};
