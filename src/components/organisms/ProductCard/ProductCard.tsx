import { PressableButton, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ProductCardProps } from "./ProductCard.types";

const ProductCard: React.FC<ProductCardProps> = ({
  imageSource,
  title,
  price,
  onPress,
  style,
  cardStyle,
  imageSize = 164,
}) => {
  const { gray700, primaryColor400 } = useColors();

  return (
    <PressableButton
      onPress={onPress}
      style={[styles.cardContainer, { width: imageSize }, style]}
    >
      <View
        style={[
          styles.imageContainer,
          { width: imageSize, height: imageSize },
          cardStyle,
        ]}
      >
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.infoContainerMobile}>
        <Typography
          size="textXS"
          weight="semiBold"
          color={gray700}
          style={styles.titleTextMobile}
          numberOfLines={2}
        >
          {title}
        </Typography>
        <Typography
          size="textXS"
          weight="bold"
          color={primaryColor400}
          style={styles.priceTextMobile}
        >
          {price}
        </Typography>
      </View>
    </PressableButton>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "flex-start",
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    borderWidth: 2,
    borderColor: "hsla(216, 24%, 96%, 1)",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  infoContainerMobile: {
    marginTop: 12,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  titleTextMobile: {
    marginBottom: 4,
  },
  priceTextMobile: {},
});

export default React.memo(ProductCard);
