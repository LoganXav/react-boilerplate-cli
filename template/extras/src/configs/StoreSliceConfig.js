import { createSlice } from "@reduxjs/toolkit"
import { logoutAction } from "./StoreActionConfig"
import CoreAuthenticationApi from "apis/CoreAuthenticationApi"
import CoreTwoFactorApi from "apis/CoreTwoFactorApi"
import CoreUserApi from "apis/CoreUserApi"

export const globalInitialState = {
  themeMode: "light", // 'dark'| 'light' | 'media'
  isLoadingModal: false,
  isSideNavigation: false,
  authUser: null,
}

const slice = createSlice({
  name: "global",
  initialState: globalInitialState,
  reducers: {
    toggleSideNavigationAction: (state, { payload }) => {
      state.isSideNavigation =
        payload !== undefined ? !!payload : !state.isSideNavigation
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(logoutAction, () => ({ ...globalInitialState, authUser: null }))
      .addMatcher(
        CoreAuthenticationApi.endpoints.authentication.matchFulfilled,
        (state, { payload }) => {
          state.authUser = payload?.data
        }
      )
      .addMatcher(
        CoreTwoFactorApi.endpoints.getTwoFactorDeliveryMethods.matchFulfilled,
        (state, { payload }) => {
          state.authUser.twoFactorDeliveryMethods = payload?.data
          state.authUser.normalizedTwoFactorDeliveryMethods =
            payload?.data.reduce((acc, curr) => {
              acc[curr.name] = curr
              return acc
            }, {})
        }
      )
      .addMatcher(
        CoreTwoFactorApi.endpoints.requestTwoFactor.matchFulfilled,
        (state, { payload }) => {
          state.authUser.twoFactorValidateInfo = payload?.data
        }
      )
      .addMatcher(
        CoreTwoFactorApi.endpoints.validateTwoFactor.matchFulfilled,
        (state, { payload }) => {
          state.authUser.twoFactorInfo = payload?.data
        }
      )
      .addMatcher(
        CoreUserApi.endpoints.getAuthenticatedUserInfo.matchFulfilled,
        (state, { payload }) => {
          Object.assign(state.authUser, payload?.data, {
            fullname: `${payload?.data?.firstname} ${payload?.data?.lastname}`,
          })
        }
      ),
})

export const { toggleSideNavigationAction } = slice.actions

export default slice

export function getGlobalSliceStorageState({ authUser }) {
  return { authUser }
}
