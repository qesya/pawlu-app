import { IGetProductShowResponse, ProductDetails } from "@/src/domain";

export function extractProductDetails(
  product: IGetProductShowResponse,
): ProductDetails {
  const variants = product.product_variants || [];

  const colorMap = new Map<number, string>();
  const sizeMap = new Map<number, string>();
  let maxQuantity = 0;
  let formattedPrice = "";

  for (const variant of variants) {
    if (!formattedPrice && variant.price?.formatted) {
      formattedPrice = variant.price.formatted;
    }

    for (const option of variant.variant_type_options || []) {
      if (option.variant_type.name === "Color") {
        colorMap.set(option.id, option.value);
      } else if (option.variant_type.name === "Size") {
        sizeMap.set(option.id, option.value);
      }
    }

    for (const inventoryItem of variant.inventory_items || []) {
      if (inventoryItem.available_quantity > maxQuantity) {
        maxQuantity = inventoryItem.available_quantity;
      }
    }
  }

  return {
    id: product.id,
    slug: product.slug,
    name: product.title,
    title: product.title,
    description: product.description,
    formattedPrice,
    availableColors: Array.from(colorMap.entries()).map(([id, value]) => ({
      id,
      value,
    })),
    availableSizes: Array.from(sizeMap.entries()).map(([id, value]) => ({
      id,
      value,
    })),
    maxQuantity,
  };
}
