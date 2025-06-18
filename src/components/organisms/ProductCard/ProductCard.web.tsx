import { ButtonIconGroup, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ProductCardProps } from "./ProductCard.types";

const ProductCard: React.FC<ProductCardProps> = ({
  imageSource,
  title,
  price,
  iconGroupData,
  onPress,
  style,
  imageSize = 286,
  iconGroupSpacing = 8,
  iconGroupSize = 24,
  onItemPress,
}) => {
  const { gray700, primaryColor400 } = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.cardContainer, { width: imageSize }, style]}
    >
      <View
        style={[styles.imageContainer, { width: imageSize, height: imageSize }]}
      >
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.iconGroupContainer}>
          <ButtonIconGroup
            data={iconGroupData ?? []}
            direction="vertical"
            spacing={iconGroupSpacing}
            size={iconGroupSize}
            onItemPress={onItemPress}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Typography
          size="textBase"
          weight="semiBold"
          color={gray700}
          style={styles.titleText}
          numberOfLines={2}
        >
          {title}
        </Typography>
        <Typography
          size="textBase"
          weight="semiBold"
          color={primaryColor400}
          style={styles.priceText}
        >
          {price}
        </Typography>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "flex-start",
    width: 286,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    borderWidth: 3.38,
    borderColor: "hsla(216, 24%, 96%, 1)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  iconGroupContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  infoContainer: {
    marginTop: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleText: {
    flex: 1,
    marginRight: 8,
  },
  priceText: {
    flexShrink: 0,
  },
});

export default React.memo(ProductCard);
