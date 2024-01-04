import Button from "libs/mui/Button";
import Icon from "libs/mui/Icon";
import { Link, useNavigate } from "react-router-dom";

/**
 * @param {import("@mui/material").ButtonProps} props
 */
function BackButton(props) {
  const navigate = useNavigate();
  return (
    <Button
      color="inherit"
      component={Link}
      to={props.to ? props.to : -1}
      {...props}
    >
      <Icon>arrow_back_ios</Icon>
    </Button>
  );
}

BackButton.defaultProps = {};

export default BackButton;
