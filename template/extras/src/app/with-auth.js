import { lazy } from "react"
import { IconButton, Icon } from "@mui/material"
import { SnackbarProvider } from "notistack"
import AppThemeProvider from "libs/mui/ThemeProvider"
import { notistackRef } from "constants/RefConstants"
import useAuthUser from "hooks/useAuthUser"
import Suspense from "common/Suspense"
import LoadingContent from "common/LoadingContent"

function App() {
  const authUser = useAuthUser()

  return (
    <LoadingContent>
      {() => (
        <AppThemeProvider>
          <SnackbarProvider
            ref={notistackRef}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            preventDuplicate
            action={(key) => (
              <IconButton
                onClick={() => {
                  notistackRef.current.closeSnackbar(key)
                }}
                color="inherit"
                size="small"
              >
                <Icon>close</Icon>
              </IconButton>
            )}
          >
            <Suspense>
              {authUser?.twoFactorInfo ? <AppProtected /> : <AppPublic />}
            </Suspense>
          </SnackbarProvider>
        </AppThemeProvider>
      )}
    </LoadingContent>
  )
}

export default App

const AppPublic = lazy(() => import("./AppPublic"))
const AppProtected = lazy(() => import("./AppProtected"))
