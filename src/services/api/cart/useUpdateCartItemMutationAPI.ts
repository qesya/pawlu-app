import { authAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { IUpdateCartItemResponse, UpdateCartItemPayload } from "@/src/domain";
import { endpoints } from "@/src/services";
import { formatApiErrors } from "@/src/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const updateCartItem = async (
  cartId: string,
  itemId: string,
  payload: UpdateCartItemPayload,
): Promise<IUpdateCartItemResponse> => {
  try {
    const { data } = await authAxios.put(
      endpoints.cart.updateCartItem(cartId, itemId),
      payload,
    );
    return data;
  } catch (error: any) {
    console.error("ERROR", error);
    if (error.response) {
      throw error;
    }
    throw new Error("No response received from the server");
  }
};

export const useUpdateCartItemMutationAPI = () => {
  const queryClient = useQueryClient();
  const onUpdateCartItemMutationAPI = useMutation({
    mutationFn: ({
      cartId,
      itemId,
      payload,
    }: {
      cartId: string;
      itemId: string;
      payload: UpdateCartItemPayload;
    }) => updateCartItem(cartId, itemId, payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.GET_CART, variables.cartId],
      });
    },
    onError: (error) => {
      const message = formatApiErrors(error);
      Alert.alert("Oops!", message);
    },
  });

  return {
    onUpdateCartItemMutationAPI,
  };
};
