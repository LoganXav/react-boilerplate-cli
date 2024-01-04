import { CoreApi } from "configs/StoreQueryConfig";

export const BASE_URL = "/twofactor";

export const CoreTwoFactorApi = CoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getTwoFactorDeliveryMethods: builder.query({
      query: (config) => ({
        url: `${BASE_URL}`,
        method: "POST",
        ...config,
      }),
    }),
    requestTwoFactor: builder.query({
      query: (config) => ({
        url: `${BASE_URL}/delivery`,
        method: "POST",
        ...config,
      }),
    }),
    validateTwoFactor: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/validate`,
        method: "POST",
        ...config,
      }),
    }),
  }),
});

export default CoreTwoFactorApi;
