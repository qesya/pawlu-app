import { IconButton } from "@/src/components";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type HeaderMenuProps = {
  onPressBack?: () => void;
  imageSource?: ImageSourcePropType;
  onCartPress: () => void;
  badgeCount?: number;
  style?: StyleProp<ViewStyle>;
};

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  onPressBack,
  imageSource,
  onCartPress,
  badgeCount,
  style,
}) => {
  const source: ImageSourcePropType =
    imageSource ?? require("../../../assets/images/app-logo.png");

  return (
    <View style={[styles.container, style]}>
      <View style={styles.wrapper}>
        {onPressBack ? (
          <IconButton icon="chevron-left-icon" onPress={onPressBack} />
        ) : null}
        <Image source={source} style={styles.logo} resizeMode="contain" />
      </View>

      <IconButton
        icon="shopping-bag-icon"
        badgeCount={badgeCount}
        onPress={onCartPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  logoWrapper: {
    alignItems: "center",
  },
  logo: {
    width: 74.89,
    height: 25.69,
  },
});

export default React.memo(HeaderMenu);
