import { Button } from "@mui/material";
import { Link } from "react-router-dom";

/**
 *
 * @param {RouterLinkButtonProps} props
 * @returns
 */
function RouterLinkButton(props) {
  return <Button {...props} />;
}

RouterLinkButton.defaultProps = {
  component: Link,
};

export default RouterLinkButton;

/**
 * @typedef {{} & import("react-router-dom").LinkProps & import("@mui/material").ButtonProps} RouterLinkButtonProps
 */
