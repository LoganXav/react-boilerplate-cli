import clsx from "clsx"
import { APP_SIDE_MENU_WIDTH, MediaQueryBreakpointEnum } from "constants/Global"
import useAuthUser from "hooks/useAuthUser"
import useLogout from "hooks/useLogout"
import usePopover from "hooks/usePopover"
import useSideNavigationToggle from "hooks/useSideNavigationToggle"
import "./ProtectedPageHeader.css"
import SearchTextField from "./SearchTextField"
import useMediaQuery from "hooks/useMediaQuery"
import AppBar from "libs/mui/AppBar"
import Container from "libs/mui/Container"
import Toolbar from "libs/mui/Toolbar"
import IconButton from "libs/mui/IconButton"
import Icon from "libs/mui/Icon"
import ButtonBase from "libs/mui/ButtonBase"
import Avatar from "libs/mui/Avatar"
import Popover from "libs/mui/Popover"
import ListItemButton from "libs/mui/ListItemButton"
import Typography from "libs/mui/Typography"

/**
 *
 * @param {PublicPageHeaderProps} props
 */
function ProtectedPageHeader(props) {
  const { className, position, ...rest } = props
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg)
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md)
  const { logout } = useLogout()

  const authUser = useAuthUser()

  const [isSideNavigation, toggleSideNavigation] = useSideNavigationToggle()

  const infoPopover = usePopover()

  function handleLogout() {
    infoPopover.togglePopover()
    logout()
  }

  const avatarInfo = (
    <div>
      <Typography className="font-semibold">
        {authUser?.firstname} {authUser?.lastname?.[0]?.concat(".") || ""}
      </Typography>
      <Typography
        variant="body2"
        className="whitespace-nowrap text-text-secondary"
      >
        {authUser?.officeName}
      </Typography>
    </div>
  )

  return (
    <>
      <AppBar
        className={clsx("ProtectedPageHeader", className)}
        position={position}
        style={{
          left: islg ? APP_SIDE_MENU_WIDTH : 0,
          width: islg ? `calc(100% - ${APP_SIDE_MENU_WIDTH}px)` : "100%",
          ...rest,
        }}
        {...rest}
      >
        <Container maxWidth="xl" className="py-2">
          <Toolbar disableGutters>
            {!islg && (
              <IconButton
                color="inherit"
                onClick={() => toggleSideNavigation()}
              >
                <Icon>menu</Icon>
              </IconButton>
            )}
            {ismd && (
              <div>
                <Typography variant="h5" className="font-semibold">
                  Hi, {authUser?.firstname}
                </Typography>
                <Typography
                  variant="body2"
                  className="whitespace-nowrap text-text-secondary"
                >
                  Last Seen: N/A
                </Typography>
              </div>
            )}
            <div className="flex-1" />
            <SearchTextField size="small" label="Go to (Search Page)" />
            <div className="flex-1" />

            <ButtonBase
              className="flex text-start items-center gap-2"
              onClick={infoPopover.togglePopover}
            >
              <Avatar className="ml-2" src={authUser?.clients?.[0].avatar}>
                {authUser?.fullName?.[0]}
              </Avatar>
              {ismd && avatarInfo}
              <Icon fontSize="small">
                {infoPopover.isOpen ? "expand_less" : "expand_more"}
              </Icon>
            </ButtonBase>
            <Popover
              open={infoPopover.isOpen}
              anchorEl={infoPopover.anchorEl}
              onClose={infoPopover.togglePopover}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{ paper: { className: "w-56" } }}
            >
              {!ismd && <div className="p-2 px-4">{avatarInfo}</div>}
              <div className="py-2">
                {[
                  // {
                  //   icon: "person",
                  //   children: "Profile",
                  //   component: Link,
                  //   to: RouteEnum.DASHBOARD,
                  // },
                  // {
                  //   icon: "settings",
                  //   children: "Settings",
                  //   component: Link,
                  //   to: RouteEnum.DASHBOARD,
                  // },

                  { icon: "logout", children: "Logout", onClick: handleLogout },
                ].map(({ icon, children, onClick, ...rest }, index) => (
                  <ListItemButton
                    key={index}
                    className=""
                    onClick={() => {
                      infoPopover.togglePopover()
                      onClick?.()
                    }}
                    {...rest}
                  >
                    <Icon>{icon}</Icon>
                    <Typography className="ml-4">{children}</Typography>
                  </ListItemButton>
                ))}
              </div>
            </Popover>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default ProtectedPageHeader

/**
 * @typedef {{
 * } & import("@mui/material").AppBarProps} ProtectedPageHeaderProps
 */
