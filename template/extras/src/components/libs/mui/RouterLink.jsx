import { Link as MuiLink } from "@mui/material";
import { forwardRef } from "react";
import { Link as RouterDomLink } from "react-router-dom";

const RouterLink = forwardRef(
  /**
   *
   * @param {RouterLinkProps} props
   * @returns
   */
  function RouterLink(props, ref) {
    return <MuiLink ref={ref} {...props} />;
  }
);

RouterLink.defaultProps = {
  component: RouterDomLink,
};

export default RouterLink;

/**
 * @typedef {{} & import("react-router-dom").LinkProps & import("@mui/material").LinkProps} RouterLinkProps
 */
