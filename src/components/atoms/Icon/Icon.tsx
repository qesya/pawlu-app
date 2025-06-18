import React, { memo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import ArrowRightIcon from "./assets/ArrowRightIcon";
import ChevronDownIcon from "./assets/ChevronDownIcon";
import ChevronLeftIcon from "./assets/ChevronLeftIcon";
import ChevronRightIcon from "./assets/ChevronRightIcon";
import ChevronUpIcon from "./assets/ChevronUpIcon";
import DeliverIcon from "./assets/DeliverIcon";
import ellipsisIcon from "./assets/EllipsisIcon";
import FacebookIcon from "./assets/FacebookIcon";
import HeartIcon from "./assets/HeartIcon";
import HeartSolidIcon from "./assets/HeartSolidIcon";
import InstagramIcon from "./assets/InstagramIcon";
import MarkerIcon from "./assets/MarkerIcon";
import PickupIcon from "./assets/PickupIcon";
import SearchIcon from "./assets/SearchIcon";
import ShoppingBagIcon from "./assets/ShoppingBagIcon";
import ShoppingBagSolidIcon from "./assets/ShoppingBagSolidIcon";
import UserIcon from "./assets/UserIcon";
import XIcon from "./assets/XIcon";
import { IIconProps } from "./iconTypes";

export const BUTTON_ICON_TYPES = {
  "search-icon": SearchIcon,
  "heart-icon": HeartIcon,
  "shopping-bag-icon": ShoppingBagIcon,
  "user-icon": UserIcon,
  "arrow-right-icon": ArrowRightIcon,
  "chevron-down-icon": ChevronDownIcon,
  "chevron-up-icon": ChevronUpIcon,
  "marker-icon": MarkerIcon,
  "x-icon": XIcon,
  "facebook-icon": FacebookIcon,
  "instagram-icon": InstagramIcon,
  "heart-solid-icon": HeartSolidIcon,
  "shopping-bag-solid-icon": ShoppingBagSolidIcon,
  "chevron-left-icon": ChevronLeftIcon,
  "chevron-right-icon": ChevronRightIcon,
  "ellipsis-icon": ellipsisIcon,
  "deliver-icon": DeliverIcon,
  "pickup-icon": PickupIcon,
};

export type IconProps = IIconProps & {
  icon: keyof typeof BUTTON_ICON_TYPES;
  style?: StyleProp<ViewStyle>;
};

const Icon: React.FC<IconProps> = ({
  height = 24,
  width = 24,
  fill,
  icon,
  testID,
  style,
}) => {
  const IconComponent = BUTTON_ICON_TYPES[icon];
  return (
    <IconComponent
      width={width}
      height={height}
      fill={fill}
      testID={testID}
      style={style}
    />
  );
};

export default memo(Icon);
