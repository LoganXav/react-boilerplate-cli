import { lazy, useMemo } from "react"
import { APP_SIDE_MENU_WIDTH, MediaQueryBreakpointEnum } from "constants/Global"
import { Navigate, useRoutes } from "react-router-dom"
import Suspense from "common/Suspense"
import { configureRoutes } from "utils/RouterUtils"
import { RouteEnum } from "constants/RouterConstants"
import ProtectedPageHeader from "./common/ProtectedPageHeader"
import AppProtectedSideNavigation from "./AppProtectedSideNavigation"
import useAuthUser from "hooks/useAuthUser"
import LoadingContent from "common/LoadingContent"
import useMediaQuery from "hooks/useMediaQuery"
import Container from "libs/mui/Container"

function AppProtected() {
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg)

  const authUser = useAuthUser()

  const routes = useRoutes(
    useMemo(
      () => getRoutes({ authUser, redirectTo: RouteEnum.DASHBOARD }),
      [authUser]
    )
  )

  return (
    <LoadingContent>
      {() => (
        <>
          <ProtectedPageHeader elevation={0} position="sticky" />
          <AppProtectedSideNavigation />
          <div
            style={{
              marginLeft: islg ? APP_SIDE_MENU_WIDTH : 0,
            }}
          >
            <Container maxWidth="xl" className="p-4">
              <Suspense>{routes}</Suspense>
            </Container>
          </div>
        </>
      )}
    </LoadingContent>
  )
}

export default AppProtected

const getRoutes = function getRoutes({ redirectTo }) {
  return configureRoutes([
    {
      path: "*",
      element: <Navigate to={redirectTo} replace />,
    },
    {
      path: RouteEnum.DASHBOARD,
      element: lazy(() => import("pages/dashboard/Dashboard")),
    },

    // --- Add more Route declarations here --- //
  ])
}
