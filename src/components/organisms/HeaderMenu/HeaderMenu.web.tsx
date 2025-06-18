import IconButton from "@/src/components/atoms/IconButton";
import Typography from "@/src/components/atoms/Typography";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type HeaderMenuProps = {
  title?: string;
  imageSource?: ImageSourcePropType;
  onCartPress: () => void;
  badgeCount?: number;
};

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  title = "Product",
  imageSource,
  onCartPress,
  badgeCount,
}) => {
  const source = imageSource ?? require("../../../assets/images/app-logo.png");

  return (
    <View style={styles.container}>
      <Typography size="textSM" weight="medium">
        {title}
      </Typography>
      <Image source={source} style={styles.logo} resizeMode="contain" />
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
    height: 64,
    paddingHorizontal: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 134,
    height: 45.37,
  },
});

export default React.memo(HeaderMenu);
