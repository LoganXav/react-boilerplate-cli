import { CoreApi } from "configs/StoreQueryConfig";
import { StoreQueryTagEnum } from "constants/StoreConstants";

export const BASE_URL = "/users";

export const CoreUserApi = CoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthenticatedUserInfo: builder.query({
      queryFn: (_, { getState }, ___, baseQuery) => {
        const { userId } = getState().global.authUser;
        return baseQuery({ url: `${BASE_URL}/${userId}/info` });
      },
    }),
    getUsersInfo: builder.query({
      query: (config) => ({
        url: `${BASE_URL}/info`,
        method: "POST",
        ...config,
      }),
      providesTags: () => [{ type: StoreQueryTagEnum.USER }],
    }),
    getUser: builder.query({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path?.userId}/info`,
        ...config,
      }),
      providesTags: () => [{ type: StoreQueryTagEnum.USER }],
    }),
    createUser: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: () => [{ type: StoreQueryTagEnum.USER }],
    }),
    updateUser: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path?.userId}`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: () => [{ type: StoreQueryTagEnum.USER }],
    }),
    userAction: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path?.userId}/action`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: () => [{ type: StoreQueryTagEnum.USER }],
    }),

    setNewPassword: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/business/change-password`,
        method: "POST",
        ...config,
      }),
    }),
    getUserTemplate: builder.query({
      query: (config) => ({
        url: `${BASE_URL}/template`,
        ...config,
      }),
    }),
  }),
});
export default CoreUserApi;
