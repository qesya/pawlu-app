import { publicAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { IGetShippingCartResponse } from "@/src/domain";
import { endpoints } from "@/src/services";
import { extractErrorMessage } from "@/src/utils";
import { useQuery } from "@tanstack/react-query";

const getShippingOptions = async (
  cartId: string,
  locationCode: string,
): Promise<IGetShippingCartResponse> => {
  try {
    const { data } = await publicAxios.get(
      endpoints.cart.getCartShippingOptions(cartId, locationCode),
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const message = extractErrorMessage(error.response.data);
      throw new Error(message);
    }
    console.error("ERROR REQUEST:", error.request);
    throw new Error("No response received from the server");
  }
};

export const useGetShippingOptionsAPI = (
  cartId?: string,
  locationCode?: string,
) => {
  return useQuery<IGetShippingCartResponse, Error>({
    queryKey: [
      REACT_QUERY_KEYS.GET_CART_SHIPPING_OPTIONS,
      cartId,
      locationCode,
    ],
    queryFn: () => {
      if (!cartId) throw new Error("Cart ID is required");
      if (!locationCode) throw new Error("Location code is required");
      return getShippingOptions(cartId, locationCode);
    },
    enabled: !!cartId && !!locationCode,
  });
};
