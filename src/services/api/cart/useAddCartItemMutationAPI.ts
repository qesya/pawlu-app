import { authAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { AddCartItemPayload, IAddCartItemResponse } from "@/src/domain";
import { endpoints } from "@/src/services";
import { formatApiErrors } from "@/src/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const createCart = async (
  cartId: string,
  payload: AddCartItemPayload,
): Promise<IAddCartItemResponse> => {
  try {
    const { data } = await authAxios.post(
      endpoints.cart.addCartItem(cartId),
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

export const useAddCartItemMutationAPI = () => {
  const queryClient = useQueryClient();
  const onAddCartItemMutationAPI = useMutation({
    mutationFn: ({
      cartId,
      payload,
    }: {
      cartId: string;
      payload: AddCartItemPayload;
    }) => createCart(cartId, payload),
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
    onAddCartItemMutationAPI,
  };
};
