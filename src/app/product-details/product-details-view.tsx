import {
  Button,
  ColorSelector,
  Footer,
  IconButton,
  NumericInputField,
  ProductImageDetails,
  SizeSelector,
  Typography,
} from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductDetailsSkeletonView from "./product-details-view-skeleton";

const { width } = Dimensions.get("window");

type ProductOption = {
  id: number;
  value: string;
};

type ProductDetailsViewProps = {
  isLoading: boolean;
  media: any[];
  title: string;
  price: string;
  description: string | null;
  colors: ProductOption[];
  sizes: ProductOption[];
  maxQuantity: number;
  onAddToBag: () => void;
  onFavoritePress: () => void;
  isAddToBagLoading: boolean;
  quantity: number;
  onQuantityChange: (qty: number) => void;
};

export default function ProductDetailsView({
  isLoading,
  media,
  title,
  price,
  description,
  colors,
  sizes,
  maxQuantity,
  onAddToBag,
  onFavoritePress,
  isAddToBagLoading,
  quantity,
  onQuantityChange,
}: Readonly<ProductDetailsViewProps>) {
  const { primaryColor400, gray600, secondaryColor50 } = useColors();
  const { bottom } = useSafeAreaInsets();

  const hasColors = colors.length > 0;
  const hasSizes = sizes.length > 0;
  const hasDescription = !!description && description.trim().length > 0;

  if (isLoading) {
    return <ProductDetailsSkeletonView />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innterContainer}>
        <ProductImageDetails media={media} style={styles.productWrapper} />

        <Typography size="textXL" weight="semiBold" style={styles.txtTitle}>
          {title}
        </Typography>

        <Typography
          size="textXL"
          weight="medium"
          color={primaryColor400}
          style={styles.txtDesc}
        >
          {price}
        </Typography>

        {hasDescription && (
          <Typography size="textSM" weight="regular" color={gray600}>
            {description}
          </Typography>
        )}

        {hasColors && (
          <View style={styles.colorSelectorWrapper}>
            <ColorSelector
              colors={colors}
              onColorSelect={(color) => console.log("Selected color", color)}
              title="Color"
            />
          </View>
        )}

        {hasSizes && (
          <View style={styles.sizeSelectorWrapper}>
            <SizeSelector
              sizes={sizes}
              onSizeSelect={(size) => console.log("Selected size", size)}
              title="Size"
            />
          </View>
        )}

        {maxQuantity === 0 ? (
          <Typography
            size="textSM"
            weight="medium"
            color={gray600}
            style={styles.txtEmpty}
          >
            This product is currently out of stock.
          </Typography>
        ) : (
          <View style={styles.qtyFieldWrapper}>
            <NumericInputField
              maxQuantity={maxQuantity}
              initialQuantity={quantity}
              onChange={onQuantityChange}
              title="Quantity"
            />
          </View>
        )}

        <View style={styles.actionWrapper}>
          <View style={styles.addBtn}>
            <Button
              onPress={onAddToBag}
              title="Add To Bag"
              type="primary"
              isLoading={isAddToBagLoading}
              isDisabled={quantity === 0 || maxQuantity === 0}
            />
          </View>
          <IconButton
            icon="heart-icon"
            onPress={onFavoritePress}
            backgroundColor={secondaryColor50}
          />
        </View>

        <View style={styles.footerWrapper}>
          <Footer />
          <View
            style={{ paddingBottom: bottom, backgroundColor: primaryColor400 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  productWrapper: {
    marginTop: 16,
    marginBottom: 40,
  },
  txtTitle: {
    marginBottom: 12,
  },
  txtDesc: {
    marginBottom: 32,
  },
  innterContainer: {
    paddingHorizontal: 16,
  },
  colorSelectorWrapper: {
    marginTop: 48,
  },
  sizeSelectorWrapper: {
    marginTop: 32,
  },
  footerWrapper: {
    marginTop: 40,
    marginHorizontal: -16,
  },
  qtyFieldWrapper: {
    width: "70%",
    marginTop: 32,
  },
  actionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 48,
  },
  addBtn: {
    flex: 1,
  },
  txtEmpty: {
    marginTop: 24,
  },
});
