import { publicAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { GetProductsShowParams, IGetProductShowResponse } from "@/src/domain";
import { endpoints } from "@/src/services";
import { extractErrorMessage } from "@/src/utils";
import { useQuery } from "@tanstack/react-query";

const getProductsShow = async (
  slug: string,
  params?: GetProductsShowParams,
): Promise<IGetProductShowResponse> => {
  try {
    const { data } = await publicAxios.get(
      endpoints.products.getProductsShow(slug),
      {
        params,
      },
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

export const useGetProductsShowAPI = (
  slug: string,
  params?: GetProductsShowParams,
) => {
  return useQuery<IGetProductShowResponse, Error>({
    queryKey: [REACT_QUERY_KEYS.GET_PRODUCTS_SHOW, slug, params],
    queryFn: () => getProductsShow(slug, params),
    enabled: !!slug,
  });
};
