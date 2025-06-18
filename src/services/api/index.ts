// PRODUCTS API
import { useGetProductsAPI } from "./products/useGetProductsAPI";
import { useGetProductsShowAPI } from "./products/useGetProductsShowAPI";

// CART API
import { useAddCartItemMutationAPI } from "./cart/useAddCartItemMutationAPI";
import { useCreateCartMutationAPI } from "./cart/useCreateCartMutationAPI";
import { useCreateOrderFromCartMutationAPI } from "./cart/useCreateOrderFromCartMutationAPI";
import { useGetCartAPI } from "./cart/useGetCartAPI";
import { useGetShippingOptionsAPI } from "./cart/useGetShippingOptionsAPI";
import { useUpdateCartItemMutationAPI } from "./cart/useUpdateCartItemMutationAPI";

// LOCATIONS API
import { useGetLocationsIndexAPI } from "./locations/useGetLocationsIndexAPI";

export {
  useAddCartItemMutationAPI,
  useCreateCartMutationAPI,
  useCreateOrderFromCartMutationAPI,
  useGetCartAPI,
  useGetLocationsIndexAPI,
  useGetProductsAPI,
  useGetProductsShowAPI,
  useGetShippingOptionsAPI,
  useUpdateCartItemMutationAPI,
};
