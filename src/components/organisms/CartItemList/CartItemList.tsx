import { CartItemCard, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import type { CartItem } from "../../molecules/CartItemCard/CartItemCard";

export type CartItemListProps = {
  productList: CartItem[];
  onQtyChange: (id: string, qty: number) => void;
  onDelete: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};

function CartItemList({
  productList,
  onQtyChange,
  onDelete,
  style,
}: Readonly<CartItemListProps>) {
  const { gray500, gray200 } = useColors();

  const renderItem = ({ item }: { item: CartItem }) => (
    <CartItemCard
      {...item}
      onQuantityChange={(value) => onQtyChange(item.id, value)}
      onDelete={() => onDelete(item.id)}
    />
  );

  const renderSeparator = () => (
    <View style={[styles.separator, { backgroundColor: gray200 }]} />
  );

  return (
    <View style={[styles.container, { borderColor: gray200 }, style]}>
      <View style={[styles.header, { borderBottomColor: gray200 }]}>
        <Typography size="textSM" weight="medium" color={gray500}>
          Product
        </Typography>
      </View>

      <View style={styles.productWrapper}>
        <FlashList
          data={productList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={150}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  productWrapper: {
    paddingVertical: 28,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  separator: {
    height: 1,
    width: "100%",
    marginVertical: 20,
  },
});

export default React.memo(CartItemList);
