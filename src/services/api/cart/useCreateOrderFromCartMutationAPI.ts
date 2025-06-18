import { authAxios } from "@/src/config/axios-config";
import {
  CreateOrderFromCartPayload,
  ICreateOrderFromCartResponse,
} from "@/src/domain";
import { endpoints } from "@/src/services";
import { formatApiErrors } from "@/src/utils";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

const createOrderFromCart = async (
  cartId: string,
  payload: CreateOrderFromCartPayload,
): Promise<ICreateOrderFromCartResponse> => {
  try {
    const { data } = await authAxios.post(
      endpoints.cart.createOrderFromCart(cartId),
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

export const useCreateOrderFromCartMutationAPI = () => {
  const onCreateOrderFromCartMutationAPI = useMutation({
    mutationFn: ({
      cartId,
      payload,
    }: {
      cartId: string;
      payload: CreateOrderFromCartPayload;
    }) => createOrderFromCart(cartId, payload),
    onSuccess: (res, variables) => {},
    onError: (error) => {
      const message = formatApiErrors(error);
      console.log("message", message);
      Alert.alert("Checkout Failed", message);
    },
  });

  return {
    onCreateOrderFromCartMutationAPI,
  };
};
