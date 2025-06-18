import { publicAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { IGetCartResponse } from "@/src/domain";
import { endpoints } from "@/src/services";
import { extractErrorMessage } from "@/src/utils";
import { useQuery } from "@tanstack/react-query";

const getCart = async (cartId: string): Promise<IGetCartResponse> => {
  try {
    const { data } = await publicAxios.get(endpoints.cart.getCart(cartId));
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

export const useGetCartAPI = (cartId?: string) => {
  return useQuery<IGetCartResponse, Error>({
    queryKey: [REACT_QUERY_KEYS.GET_CART, cartId],
    queryFn: () => {
      if (!cartId) throw new Error("Cart ID is required");
      return getCart(cartId);
    },
    enabled: !!cartId,
  });
};
