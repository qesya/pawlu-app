import { publicAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { IGetLocationsIndexResponse } from "@/src/domain";
import { endpoints } from "@/src/services";
import { extractErrorMessage } from "@/src/utils";
import { useQuery } from "@tanstack/react-query";

const getLocationsIndex = async (): Promise<IGetLocationsIndexResponse[]> => {
  try {
    const { data } = await publicAxios.get(
      endpoints.locations.getLocationsIndex(),
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

export const useGetLocationsIndexAPI = () => {
  return useQuery<IGetLocationsIndexResponse[], Error>({
    queryKey: [REACT_QUERY_KEYS.GET_LOCATIONS_INDEX],
    queryFn: () => {
      return getLocationsIndex();
    },
  });
};
