import {
  useAddCartItemMutationAPI,
  useCreateCartMutationAPI,
  useGetProductsShowAPI,
} from "@/src/services";
import { useCartStore, useLocationStore } from "@/src/store";
import { extractProductDetails } from "@/src/utils";
import { mapProductMedia } from "@/src/utils/media";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import ProductDetailsView from "./product-details-view";

export default function ProductDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const { data, isLoading } = useGetProductsShowAPI(slug ?? "");

  const productDetails = useMemo(() => {
    if (!data) return null;
    return extractProductDetails(data);
  }, [data]);

  const media = useMemo(() => mapProductMedia(data?.media ?? []), [data]);

  // STATE
  const [qtyValue, setQtyValue] = useState<number>(0);

  // API
  const { onCreateCartMutationAPI } = useCreateCartMutationAPI();
  const { onAddCartItemMutationAPI } = useAddCartItemMutationAPI();

  const isAddToBagLoading = onAddCartItemMutationAPI.isPending;

  // STORE
  const { location } = useLocationStore();
  const { cartId, setCartId } = useCartStore();

  const onHandleAddToBag = async () => {
    try {
      if (!productDetails?.id) throw new Error("Invalid product information.");

      let currentCartId = cartId;

      if (!currentCartId) {
        if (!location?.id) throw new Error("No location selected.");

        const createCartResponse = await onCreateCartMutationAPI.mutateAsync({
          payload: {
            location_id: location.id,
          },
        });

        if (!createCartResponse?.id) throw new Error("Failed to create cart.");

        currentCartId = createCartResponse.id;
        setCartId(currentCartId);
      }

      console.log({
        locationId: location?.id,
        currentCartId,
        id: Number(productDetails.id),
        quantity: qtyValue,
        type: "product_variant",
      });

      await onAddCartItemMutationAPI.mutateAsync({
        cartId: currentCartId,
        payload: {
          id: Number(productDetails.id),
          quantity: qtyValue,
          type: "product_variant",
        },
      });

      Alert.alert("Success", "Item added to cart.");
    } catch (error: any) {
      console.error(error);
    }
  };

  const onHandleAddToFav = () => {
    Alert.alert(
      "Not Available",
      "Add to Favorites is not implemented because there's no defined flow in Figma.",
    );
  };

  return (
    <ProductDetailsView
      isLoading={isLoading || !productDetails}
      media={media}
      title={productDetails?.title ?? ""}
      price={productDetails?.formattedPrice ?? ""}
      description={productDetails?.description ?? null}
      colors={productDetails?.availableColors ?? []}
      sizes={productDetails?.availableSizes ?? []}
      maxQuantity={productDetails?.maxQuantity ?? 0}
      onAddToBag={onHandleAddToBag}
      onFavoritePress={onHandleAddToFav}
      isAddToBagLoading={isAddToBagLoading}
      quantity={qtyValue}
      onQuantityChange={setQtyValue}
    />
  );
}
