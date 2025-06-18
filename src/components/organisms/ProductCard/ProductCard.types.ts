import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { ButtonIconGroupItem } from "../../molecules/ButtonIconGroup/ButtonIconGroup";

export type ProductCardProps = {
  imageSource: ImageSourcePropType;
  title: string;
  price: string;
  iconGroupData?: ButtonIconGroupItem[];
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  imageSize?: number;
  iconGroupSpacing?: number;
  iconGroupSize?: number;
  onItemPress: (item: ButtonIconGroupItem) => void;
};
