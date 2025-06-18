import { publicAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { GetProductsParams, IGetProductResponse } from "@/src/domain";
import { endpoints } from "@/src/services";

import { extractErrorMessage } from "@/src/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const getProducts = async (
  params?: GetProductsParams,
): Promise<IGetProductResponse> => {
  try {
    const { data } = await publicAxios.get(endpoints.products.getProducts(), {
      params,
    });
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

export const useGetProductsAPI = (params?: GetProductsParams) => {
  return useQuery<IGetProductResponse, Error>({
    queryKey: [REACT_QUERY_KEYS.GET_PRODUCTS, params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
};
