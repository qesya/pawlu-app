import { authAxios } from "@/src/config/axios-config";
import { CreateCartPayload, ICreateCartResponse } from "@/src/domain";
import { endpoints } from "@/src/services";
import { formatApiErrors } from "@/src/utils";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

const createCart = async (
  payload: CreateCartPayload,
): Promise<ICreateCartResponse> => {
  try {
    const { data } = await authAxios.post(endpoints.cart.createCart(), payload);
    return data;
  } catch (error: any) {
    console.error("ERROR", error);
    if (error.response) {
      throw error;
    }
    throw new Error("No response received from the server");
  }
};

export const useCreateCartMutationAPI = () => {
  const onCreateCartMutationAPI = useMutation({
    mutationFn: ({ payload }: { payload: CreateCartPayload }) =>
      createCart(payload),
    onSuccess: (res, variables) => {},
    onError: (error) => {
      const message = formatApiErrors(error);
      Alert.alert("Oops!", message);
    },
  });

  return {
    onCreateCartMutationAPI,
  };
};
