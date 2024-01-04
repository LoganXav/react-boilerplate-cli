import { CoreApi } from "configs/StoreQueryConfig";
import { StoreQueryTagEnum } from "constants/StoreConstants";

export const BASE_URL = "/authentication";

export const CoreAuthenticationApi = CoreApi.injectEndpoints({
  endpoints: (builder) => ({
    authentication: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: () => [{ type: StoreQueryTagEnum.USER }],
    }),
    resetPassword: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/reset-password`,
        method: "POST",
        ...config,
      }),
    }),
  }),
});

export default CoreAuthenticationApi;
