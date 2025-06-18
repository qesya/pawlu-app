import { Button, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export type CartSummaryCardProps = {
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  onCheckout: () => void;
  isSummaryMode?: boolean;
  style?: StyleProp<ViewStyle>;
};

const CartSummaryCard: React.FC<Readonly<CartSummaryCardProps>> = ({
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
  isSummaryMode = false,
  style,
}) => {
  const { gray50, gray700, gray200, gray500 } = useColors();
  const paddingVertical = isSummaryMode ? 0 : 32;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: gray50, paddingVertical },
        style,
      ]}
    >
      {!isSummaryMode ? (
        <Typography size="textBase" weight="semiBold" color={gray700}>
          Summary
        </Typography>
      ) : null}

      <View style={styles.calculationWrapper}>
        <View style={styles.row}>
          <Typography size="textBase" weight="medium" color={gray500}>
            Subtotal
          </Typography>
          <Typography size="textBase" weight="medium" color={gray700}>
            {subtotal}
          </Typography>
        </View>

        <View style={styles.row}>
          <Typography size="textBase" weight="medium" color={gray500}>
            Shipping estimate
          </Typography>
          <Typography size="textBase" weight="medium" color={gray700}>
            {shipping}
          </Typography>
        </View>

        <View style={styles.row}>
          <Typography size="textBase" weight="medium" color={gray500}>
            Tax estimate
          </Typography>
          <Typography size="textBase" weight="medium" color={gray700}>
            {tax}
          </Typography>
        </View>
      </View>

      <View
        style={[
          isSummaryMode ? styles.totalRowSummary : styles.totalRow,
          { borderColor: gray200 },
        ]}
      >
        <Typography size="textBase" weight="medium" color={gray700}>
          Total
        </Typography>
        <Typography size="textBase" weight="medium" color={gray700}>
          {total}
        </Typography>
      </View>

      {!isSummaryMode ? (
        <View style={styles.btnWrapper}>
          <Button title="Checkout" type="primary" onPress={onCheckout} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  calculationWrapper: {
    marginTop: 28,
    gap: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalRow: {
    marginTop: 44,
    paddingVertical: 32,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalRowSummary: {
    marginTop: 44,
    paddingVertical: 32,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnWrapper: {
    marginTop: 32,
  },
});

export default React.memo(CartSummaryCard);
