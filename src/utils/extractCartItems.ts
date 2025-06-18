import { IGetCartResponse } from "@/src/domain";
import { ImageSourcePropType } from "react-native";
import { CartItem } from "../components/molecules/CartItemCard/CartItemCard";
import { DropdownOption } from "../components/molecules/DropdownField/DropdownField";

export function extractCartItems(cartData: IGetCartResponse): CartItem[] {
  if (!cartData?.cart_items || !Array.isArray(cartData.cart_items)) return [];

  return cartData.cart_items.map((item: any) => {
    const variant = item.product_variant;
    const product = variant?.product;

    const id = String(item.id);
    const title = product?.title ?? "Untitled Product";

    const mediaUrl =
      product?.media?.[0]?.url ??
      product?.media?.[0]?.conversions?.["medium-square"] ??
      null;

    const image: ImageSourcePropType = mediaUrl
      ? { uri: mediaUrl }
      : require("@/src/assets/images/no-image.png");

    const quantity = item.quantity ?? 1;

    const quantityOptions: DropdownOption[] = Array.from(
      { length: 10 },
      (_, i) => ({
        label: String(i + 1),
        value: i + 1,
      }),
    );

    return {
      id,
      title,
      price: item.unit_price?.formatted ?? "€0.00",
      totalPrice: item.total_price?.formatted ?? "€0.00",
      selectedQuantity: {
        label: String(quantity),
        value: quantity,
      },
      quantityOptions,
      image,
      variantLabel: undefined,
    };
  });
}
