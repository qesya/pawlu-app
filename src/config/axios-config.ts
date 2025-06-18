import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { router } from "expo-router";
import { APP_CONFIG } from "./app-config";

const publicAxios = axios.create({
  baseURL: `${APP_CONFIG.BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const authAxios = axios.create({
  baseURL: `${APP_CONFIG.BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

authAxios.interceptors.request.use(
  async (config: any) => {
    try {
      /**
       * The access token will be used later when the application becomes more complex and requires an access token as an Authorization header
       */
      const accessToken = "";

      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
    } catch (error) {
      console.error("Error fetching the access token", error);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

authAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newSession = "";
        console.log("session", newSession);

        if (newSession) {
          const newAccessToken = newSession;
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error(
          "Error refreshing the access token",
          JSON.stringify(refreshError),
        );

        // kick user
        router.replace({
          pathname: "/",
        });
      }
    }
    return Promise.reject(error);
  },
);

export { authAxios, publicAxios };
