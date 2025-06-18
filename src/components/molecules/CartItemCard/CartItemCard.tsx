import { DropdownField, IconButton, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { DropdownOption } from "../DropdownField/DropdownField";

export type CartItemCardProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  price: string;
  selectedQuantity: DropdownOption;
  quantityOptions: DropdownOption[];
  onQuantityChange: (value: number) => void;
  onDelete: () => void;
  image?: ImageSourcePropType;
  variantLabel?: string;
  totalPrice: string;
};

export type CartItem = Omit<
  CartItemCardProps,
  "style" | "onDelete" | "onQuantityChange"
> & { id: string };

const CartItemCard: React.FC<Readonly<CartItemCardProps>> = ({
  style,
  title,
  price,
  selectedQuantity,
  quantityOptions,
  onQuantityChange,
  onDelete,
  image = require("../../../assets/images/no-image.png"),
  variantLabel,
  totalPrice,
}) => {
  const { gray500, gray600, primaryColor400 } = useColors();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.product}>
        <View style={styles.itemWrapper}>
          <Image source={image} style={styles.productImg} />
          <View style={styles.productInforWrapper}>
            <Typography
              size="textSM"
              weight="medium"
              color={gray500}
              style={styles.txtProductName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {title}
            </Typography>
            <Typography
              size="textSM"
              weight="semiBold"
              color={gray600}
              style={styles.txtPrice}
            >
              {price}
            </Typography>
            {variantLabel && (
              <Typography size="textXS" weight="regular" color={gray500}>
                {variantLabel}
              </Typography>
            )}
          </View>
        </View>
        <View style={styles.icnCloseWrapper}>
          <IconButton
            icon="x-icon"
            onPress={onDelete}
            size={20}
            style={{ padding: 6 }}
          />
        </View>
      </View>

      <View style={styles.summaryWrapper}>
        <View style={styles.dropdown}>
          <DropdownField
            onSelect={(opt) => onQuantityChange(Number(opt.value))}
            options={quantityOptions}
            placeholder="Qty"
            selected={selectedQuantity}
          />
        </View>
        <Typography size="textBase" weight="medium" color={primaryColor400}>
          {totalPrice}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  product: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productInforWrapper: {
    marginLeft: 16,
    flex: 1,
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  txtProductName: {
    marginBottom: 4,
    flexShrink: 1,
  },
  txtPrice: {
    marginBottom: 12,
  },
  summaryWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
  },
  dropdown: {
    width: "18%",
  },
  productImg: {
    resizeMode: "cover",
    width: 74,
    height: 74,
    borderRadius: 6,
    backgroundColor: "hsla(210, 20%, 98%, 1)",
  },
  icnCloseWrapper: {
    alignSelf: "flex-start",
  },
});

export default React.memo(CartItemCard);
