import { MediaQueryBreakpointEnum } from "constants/Global";
import useToggle from "hooks/useToggle";
import { Link, matchPath, useLocation, useMatch } from "react-router-dom";
import { RouteEnum } from "constants/RouterConstants";
import Logo from "common/Logo";
import "./PublicPageHeader.css";
import clsx from "clsx";
import { useMemo } from "react";
import usePopover from "hooks/usePopover";
import useMediaQuery from "hooks/useMediaQuery";
import Typography from "libs/mui/Typography";
import AppBar from "libs/mui/AppBar";
import Container from "libs/mui/Container";
import Toolbar from "libs/mui/Toolbar";
import List from "libs/mui/List";
import IconButton from "libs/mui/IconButton";
import Icon from "libs/mui/Icon";
import Drawer from "libs/mui/Drawer";
import ListItem from "libs/mui/ListItem";
import ListItemText from "libs/mui/ListItemText";
import Popover from "libs/mui/Popover";
import ListItemSecondaryAction from "libs/mui/ListItemSecondaryAction";
import Collapse from "libs/mui/Collapse";
import RouterLinkButton from "libs/mui/RouterLinkButton";

/**
 *
 * @param {PublicPageHeaderProps} props
 */
function PublicPageHeader(props) {
  const { className, position, ...rest } = props;
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const [isDrawer, toggleDrawer] = useToggle();

  const logo = (
    <div>
      <Link to={RouteEnum.HOME}>
        <Logo />
        <Typography className="mt-1" variant="caption">
          Get paid when you need it
        </Typography>
      </Link>
    </div>
  );

  return (
    <>
      <AppBar
        className={clsx("PublicPageHeader", className)}
        position={position}
        {...rest}
      >
        <Container>
          <Toolbar disableGutters className="items-center gap-2">
            {!ismd && (
              <IconButton color="inherit" onClick={toggleDrawer}>
                <Icon>menu</Icon>
              </IconButton>
            )}
            {logo}
            <div className="flex-1" />
            {ismd && (
              <>
                <List dense className="flex">
                  {LINKS.map((link, index) => (
                    <PublicPageHeaderDesktopLink
                      key={index}
                      {...{ key: index, link, index }}
                    />
                  ))}
                </List>
              </>
            )}
            <RouterLinkButton
              to={RouteEnum.SIGNIN}
              borderRadius="circular"
              size="large"
              color="secondary"
            >
              Login
            </RouterLinkButton>
            {/* <RouterLinkButton to={RouteEnum.SIGNUP}>Sign up</RouterLinkButton> */}
          </Toolbar>
        </Container>
      </AppBar>
      {!ismd && (
        <Drawer
          variant="temporary"
          open={isDrawer}
          onClose={toggleDrawer}
          anchor="top"
          // PaperProps={{ style: { width: DRAWER_WIDTH } }}
        >
          <div className="p-4">{logo}</div>
          <List>
            {LINKS.map((link, index) => (
              <PublicPageHeaderMobileLink
                key={index}
                {...{ key: index, link, index, toggleDrawer }}
              />
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
}

PublicPageHeader.defaultProps = {};

export default PublicPageHeader;

function PublicPageHeaderDesktopLink({ link, index }) {
  const { label, to, children } = link;

  const isGroup = !!children;

  const match = useMatch(to || "/");

  const childrenPopover = usePopover();

  return (
    <>
      <ListItem
        key={index}
        className={clsx(
          "rounded hover:text-secondary-main",
          !!match && "text-secondary-main"
        )}
        {...(isGroup
          ? {
              onClick: childrenPopover.togglePopover,
              // onMouseEnter: childrenPopover.togglePopover,
              // onMouseLeave: () => childrenPopover.togglePopover(),
            }
          : { component: Link, to })}
      >
        <ListItemText primary={label} classes={{ primary: "" }} />
        {isGroup && (
          <>
            <Icon>
              {childrenPopover.isOpen ? "expand_less" : "expand_more"}
            </Icon>
          </>
        )}
      </ListItem>
      {isGroup && (
        <Popover
          open={childrenPopover.isOpen}
          anchorEl={childrenPopover.anchorEl}
          onClose={childrenPopover.togglePopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          // PaperProps={{ className: "w-36" }}
        >
          {children?.map(
            (
              { icon, children, label, description, onClick, to, ...rest },
              index
            ) => (
              <ListItem
                key={index}
                className=""
                onClick={() => {
                  childrenPopover.togglePopover();
                  onClick?.();
                }}
                component={Link}
                to={to}
                {...rest}
              >
                <ListItemText
                  primary={label}
                  secondary={description}
                  classes={{ primary: "font-semibold" }}
                />
              </ListItem>
            )
          )}
        </Popover>
      )}
    </>
  );
}

function PublicPageHeaderMobileLink({ link, index, toggleDrawer }) {
  const { label, to, children } = link;

  const isGroup = !!children;

  const location = useLocation();

  const match = useMemo(() => {
    let result = null;
    if (children) {
      for (const child of children) {
        result = matchPath({ path: child.to + "/*" }, location.pathname);
        if (result) {
          return result;
        }
      }
      return result;
    }
  }, [children, location.pathname]);

  // const match = useMatch(to || "/");

  const [isSubMenu, toggleSubMenu] = useToggle();

  return (
    <>
      <ListItem
        key={index}
        className={clsx(
          "rounded hover:text-secondary-main",
          !!match && "text-secondary-main"
        )}
        {...(isGroup
          ? { onClick: toggleSubMenu }
          : { component: Link, to, onClick: toggleDrawer })}
      >
        <ListItemText primary={label} classes={{ primary: "" }} />
        {isGroup && (
          <ListItemSecondaryAction>
            <Icon>{isSubMenu ? "expand_less" : "expand_more"}</Icon>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      {isGroup && (
        <Collapse in={isSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children?.map(
              (
                { icon, children, label, description, onClick, to, ...rest },
                index
              ) => (
                <ListItem
                  key={index}
                  className="px-6"
                  onClick={() => {
                    toggleSubMenu();
                    onClick?.();
                    toggleDrawer();
                  }}
                  component={Link}
                  to={to}
                  {...rest}
                >
                  <ListItemText
                    primary={label}
                    secondary={description}
                    classes={{ primary: "font-semibold" }}
                  />
                </ListItem>
              )
            )}
          </List>
        </Collapse>
      )}
    </>
  );
}

const LINKS = [
  { label: "Home", to: RouteEnum.HOME },
  { label: "Solutions", to: RouteEnum.SOLUTIONS },
  { label: "About", to: RouteEnum.ABOUT },
  { label: "Contact", to: RouteEnum.CONTACT },
];

/**
 * @typedef {{
 * } & import("@mui/material").AppBarProps} PublicPageHeaderProps
 */
