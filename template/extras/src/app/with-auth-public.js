import { lazy, useMemo } from "react"
import Suspense from "common/Suspense"
import { matchPath, Navigate, useLocation, useRoutes } from "react-router-dom"
import { configureRoutes } from "utils/RouterUtils"
import { RouteEnum } from "constants/RouterConstants"
import PageFooter from "common/PageFooter"
import PublicPageHeader from "common/PublicPageHeader"
import { Container } from "@mui/material"

function AppPublic() {
  const location = useLocation()

  const routeConfig = useMemo(
    () =>
      [
        { path: RouteEnum.SIGNIN },
        // --- Add more Route Paths here --- //
      ].find((route) => matchPath(route, location.pathname)),
    [location.pathname]
  )

  const routes = useRoutes(ROUTES)

  return (
    <>
      {(routeConfig ? !!routeConfig.header : true) && (
        <PublicPageHeader elevation={0} position="sticky" />
      )}
      {(routeConfig ? !!routeConfig.content : true) ? (
        <Container className="min-h-full p-4 md:p-8">
          <Suspense>{routes}</Suspense>
        </Container>
      ) : (
        <Suspense>{routes}</Suspense>
      )}
      {(routeConfig ? !!routeConfig.footer : true) && <PageFooter />}
    </>
  )
}

const ROUTES = configureRoutes([
  {
    path: "*",
    element: <Navigate to={RouteEnum.SIGNIN} replace />,
  },
  {
    path: RouteEnum.HOME,
    element: lazy(() => import("pages/home/Home")),
  },
  {
    path: RouteEnum.SIGNIN,
    element: lazy(() => import("pages/signin/Signin")),
  },

  // --- Add more Route declarations here --- //
])

export default AppPublic
