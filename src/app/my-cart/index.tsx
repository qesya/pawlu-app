import { useGetCartAPI, useUpdateCartItemMutationAPI } from "@/src/services";
import { useCartStore } from "@/src/store";
import { extractSummaryTotal } from "@/src/utils";
import { extractCartItems } from "@/src/utils/extractCartItems";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Alert } from "react-native";
import MyCartView from "./my-cart-view";

export default function MyCartScreen() {
  // STORE
  const { cartId } = useCartStore();

  // API
  const { data, isLoading } = useGetCartAPI(cartId);
  const { onUpdateCartItemMutationAPI } = useUpdateCartItemMutationAPI();

  const productList = useMemo(() => {
    return data ? extractCartItems(data) : [];
  }, [data]);

  const summary = useMemo(() => extractSummaryTotal(data), [data]);

  const onHandleProductQty = async (id: string, qty: number) => {
    try {
      if (!cartId) throw new Error("Missing cart ID.");
      await onUpdateCartItemMutationAPI.mutateAsync({
        cartId,
        itemId: id,
        payload: {
          quantity: qty,
        },
      });
    } catch (error: any) {
      console.error("Error", error?.message ?? "Failed to update quantity.");
    }
  };

  const onHandleDelete = async (id: string) => {
    Alert.alert("Coming Soon", "Delete API isn't available yet.");
  };

  const onHandleCheckout = () => {
    router.navigate("/checkout");
  };

  return (
    <MyCartView
      isLoading={isLoading}
      productList={productList}
      onDelete={onHandleDelete}
      onQtyChange={onHandleProductQty}
      subtotal={summary.subtotal}
      tax={summary.tax}
      shipping={summary.shipping}
      total={summary.total}
      onCheckout={onHandleCheckout}
    />
  );
}
