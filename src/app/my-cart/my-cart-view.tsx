import {
  CartItemList,
  CartSummaryCard,
  Footer,
  Typography,
} from "@/src/components";
import { CartItem } from "@/src/components/molecules/CartItemCard/CartItemCard";
import { useColors } from "@/src/hooks";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MyCartViewProps = {
  isLoading: boolean;
  productList: CartItem[];
  onDelete: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
  onCheckout: () => void;
  subtotal: string;
  tax: string;
  shipping: string;
  total: string;
};

export default function MyCartView({
  productList,
  onDelete,
  onQtyChange,
  onCheckout,
  subtotal,
  tax,
  shipping,
  total,
}: Readonly<MyCartViewProps>) {
  const { primaryColor400, gray600 } = useColors();
  const { bottom } = useSafeAreaInsets();

  const hasItems = productList.length > 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innterContainer}>
        <Typography size="textXL" weight="semiBold" style={styles.txtTitle}>
          My Cart
        </Typography>

        {hasItems ? (
          <>
            <CartItemList
              productList={productList}
              onDelete={onDelete}
              onQtyChange={onQtyChange}
            />

            <CartSummaryCard
              onCheckout={onCheckout}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              style={styles.summaryWrapper}
            />
          </>
        ) : (
          <View style={styles.emptyWrapper}>
            <Typography
              size="textBase"
              weight="regular"
              color={gray600}
              style={styles.emptyMessage}
              centerText
            >
              No products added to cart.
            </Typography>
          </View>
        )}

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
    marginTop: 63,
    marginBottom: 30,
  },
  innterContainer: {
    paddingHorizontal: 16,
  },
  summaryWrapper: {
    marginTop: 16,
  },
  footerWrapper: {
    marginHorizontal: -16,
  },
  emptyWrapper: {
    flex: 1,
  },
  emptyMessage: {
    marginTop: 48,
    marginBottom: 200,
  },
});
